import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import { RootStackParamList } from "../../services/stackNavigate";
import { useNavigation } from "@react-navigation/native";

type PropsNavigation = StackNavigationProp<RootStackParamList,
    'addScreen'
>;

const ScanBarCodeScreen = () : React.JSX.Element => {
      // State variables
  const [torchOn, setTorchOn] = useState(false);
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);
  const navigation = useNavigation<PropsNavigation>();
  // Camera permission hooks
  const {
    hasPermission: cameraHasPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();

  // Get the camera device (back camera)
  const device = useCameraDevice('back');

  // Handle camera permission on component mount
  useEffect(() => {
    handleCameraPermission();
  }, []);

  // Use the code scanner hook to configure barcode scanning
  const codeScanner = useCodeScanner({
    codeTypes: ['qr', 'ean-13'],
    onCodeScanned: (codes) => {
      // Check if code scanning is enabled
      if (enableOnCodeScanned) {
        const value = codes[0]?.value;
        const type = codes[0]?.type;
        if(value) {
          navigation.navigate('addScreen',{MST: value})
          setEnableOnCodeScanned(false);
        }
          
      }
    },
  });

  // Handle camera permission
  const handleCameraPermission = async () => {
    const granted = await requestCameraPermission();

    if (!granted) {
      Alert.alert(
        'Camera permission is required to use the camera. Please grant permission in your device settings.'
      );

      // Optionally, open device settings using Linking API
      Linking.openSettings();
    }
  };

  // Show alert with customizable content
  const showAlert = (
    value = '',
    countryOfOrigin = '',
    showMoreBtn = true
  ) => {
    Alert.alert(
      value,
      countryOfOrigin,
      showMoreBtn
        ? [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: 'More',
              onPress: () => {
                setTorchOn(false);
                setEnableOnCodeScanned(true);
              },
            },
          ]
        : [
            {
              text: 'Cancel',
              onPress: () => setEnableOnCodeScanned(true),
              style: 'cancel',
            },
          ],
      { cancelable: false }
    );
  };

  // Round button component with image


  // Render content based on camera device availability
  if (device == null)
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ margin: 10 }}>Camera Not Found</Text>
      </View>
    );
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
        torch={torchOn ? 'on' : 'off'}
        onTouchEnd={() => setEnableOnCodeScanned(true)}
      />
    </SafeAreaView>
  );
}

export default ScanBarCodeScreen;