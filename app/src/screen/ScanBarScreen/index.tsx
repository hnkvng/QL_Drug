import { StackNavigationProp } from "@react-navigation/stack";
import { useEffect, useState } from "react";
import { Alert, Linking, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import { RootStackParamList, scanScreenParamProp } from "../../services/stackNavigate";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import Button from "../../components/Button";
import { useDispatch } from "react-redux";
import scanScreenSlice from "./slice";

type PropsNavigation = StackNavigationProp<RootStackParamList,
    'addScreen'
>;

const ScanBarCodeScreen = () : React.JSX.Element => {

  const dispatch = useDispatch();

  const setCode = scanScreenSlice.actions.setCode;
  const reset = scanScreenSlice.actions.reset;

  const [torchOn, setTorchOn] = useState(false);
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);
  const navigation = useNavigation<PropsNavigation>();

  const {
    hasPermission: cameraHasPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();


  const device = useCameraDevice('back');


  useEffect(() => {
    handleCameraPermission();
    return () => {
      dispatch(reset())
    }
  }, []);


  const codeScanner = useCodeScanner({
    codeTypes: ['ean-13'],
    onCodeScanned: (codes) => {
      if (enableOnCodeScanned) {
        const value = codes[0]?.value;
        if(value) {
          dispatch(setCode(value))
          setTimeout(() => navigation.goBack(),500);
          setEnableOnCodeScanned(false);
        }
          
      }
    },
  });

  const handleCameraPermission = async () => {
    const granted = await requestCameraPermission();

    if (!granted) {
      Alert.alert(
        'Camera permission is required to use the camera. Please grant permission in your device settings.'
      );
      Linking.openSettings();
    }
  };

  if (device == null)
    return (
      <View
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ margin: 10 }}>Camera Not Found</Text>
      </View>
    );
  return (
    <SafeAreaView style={{ flex: 1 , justifyContent: 'center', alignItems: 'center'}}>
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