import { useEffect, useState } from "react";
import { Linking, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
import { Camera, useCameraDevice, useCameraPermission, useCodeScanner } from "react-native-vision-camera";
import { PropsNavigation } from "../../services/stackNavigate";
import { useNavigation} from "@react-navigation/native";
import { useDispatch } from "react-redux";
import scanScreenSlice from "./slice";
import Button from "../../components/Button";
import { detectBarcodes, BarcodeFormat } from "react-native-barcodes-detector";
import { launchImageLibrary } from "react-native-image-picker";
import { theme } from "../../services/theme";
import notifiSlice from "../../componentsSpecial/Notification/slice";

const ScanBarCodeScreen = () : React.JSX.Element => {

  //config
  const dispatch = useDispatch();
  const navigation = useNavigation<PropsNavigation>();
  const [enableOnCodeScanned, setEnableOnCodeScanned] = useState(true);
  const [imagePath, setImagePath] = useState('');

  const setCode = scanScreenSlice.actions.setCode;
  const reset = scanScreenSlice.actions.reset;
  const handleWarn = notifiSlice.actions.handleWarn;

  const {
    hasPermission: cameraHasPermission,
    requestPermission: requestCameraPermission,
  } = useCameraPermission();
  const device = useCameraDevice('back');

  //handle
  const selectImage = async () => {
    try {
      const image = await launchImageLibrary({
        mediaType: 'photo',
        includeBase64: true,
      });

      if (image.assets) {
        if(image.assets[0].uri)
          setImagePath(image.assets[0].uri);
      }
    } catch (error) {
      dispatch(handleWarn('Hình ảnh không hợp lệ'));
    }
  };

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
      dispatch(handleWarn(`Cần có sự cho phép của máy ảnh để sử dụng máy ảnh. Vui lòng cấp quyền trong cài đặt thiết bị của bạn`));
    }
  };

  //effect
  useEffect(() => {
    handleCameraPermission();
    return () => {
      dispatch(reset());
    }
  }, []);

  useEffect(() => {
    if(imagePath) {
      const formats = [BarcodeFormat.EAN_13]
      detectBarcodes(imagePath,formats)
      .then((data) => {
        if(!data.length) {
          throw 'Không tìm thấy barcode'
        } else {
          if(data[0].displayValue)
          dispatch(setCode(data[0].displayValue))
          navigation.goBack();
        }
      })
      .catch((error) => dispatch(handleWarn(error)))
    }
    
  },[imagePath])

  if (!cameraHasPermission || !device) {
    return ( 
    <SafeAreaView
        style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      >
        <Text style={{ margin: 10 }}>Không tìm thấy máy ảnh</Text>
        <Button
          name = "Cho phép máy ảnh"
          mode= "contained"
          style= {{backgroundColor: theme.colors.mainColor, marginBottom: 30}}
          handleClick={Linking.openSettings}
        >
        </Button>
    </SafeAreaView>)
  }
  else {
    return (
      <SafeAreaView style={{ flex: 1 , justifyContent: 'flex-end', alignItems: 'center'}}>
        <Camera
          codeScanner={codeScanner}
          style={StyleSheet.absoluteFill}
          device={device}
          isActive={true}
          onTouchEnd={() => setEnableOnCodeScanned(true)}
        />
        <Button
          name = "Chọn ảnh từ thư viện"
          mode= "contained"
          style= {{backgroundColor: theme.colors.mainColor, marginBottom: 30}}
          handleClick={selectImage}
        >
        </Button>
      </SafeAreaView>
    );
  }
  
}

export default ScanBarCodeScreen;