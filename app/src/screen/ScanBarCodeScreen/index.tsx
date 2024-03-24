import React, { useEffect, useState } from 'react';
import {
  Alert,
  Platform,
  useWindowDimensions,
  Text,
  SafeAreaView
} from 'react-native';

import { request, PERMISSIONS, openSettings, RESULTS } from 'react-native-permissions';
import { ReactNativeScannerView } from "@pushpendersingh/react-native-scanner";
import { useDispatch } from 'react-redux';
import scanBarSlice from './scanBarSlice';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../navigation/stack/rootStackParamlist';
import { useNavigation } from '@react-navigation/native';

type PropsNavigation = StackNavigationProp<RootStackParamList,'addScreen'>;

export default function ScanBanerCodeScreen() {

    const navigation = useNavigation<PropsNavigation>();
   
    const dispatch = useDispatch();

    const reset = scanBarSlice.actions.reset;

    const { height, width } = useWindowDimensions();
    const [isCameraPermissionGranted, setIsCameraPermissionGranted] = useState(false);

    useEffect(() => {
        checkCameraPermission();
        return () => {
            dispatch(reset())
        }
    }, []);

    const checkCameraPermission = async () => {
        request(Platform.OS === 'ios' ? PERMISSIONS.IOS.CAMERA : PERMISSIONS.ANDROID.CAMERA)
        .then(async (result: any) => {
            switch (result) {
                case RESULTS.UNAVAILABLE:
                    // console.log('This feature is not available (on this device / in this context)');
                    break;
                case RESULTS.DENIED:
                    Alert.alert("Permission Denied", "You need to grant camera permission first");
                    openSettings();
                    break;
                case RESULTS.GRANTED:
                    setIsCameraPermissionGranted(true);
                    break;
                case RESULTS.BLOCKED:
                    Alert.alert("Permission Blocked", "You need to grant camera permission first");
                    openSettings();
                    break;
            }
        })
    };

    if (isCameraPermissionGranted) {
        return (
        <SafeAreaView style={{ flex: 1 }}>
            <ReactNativeScannerView
              
              style={{ height, width }}
              onQrScanned={(target: any) => {
                  if(target.nativeEvent.value) { 
                      navigation.navigate('addScreen',{code: target.nativeEvent.value});         
                  }
              }}
            />
        </SafeAreaView>
        );
    } else {
        return (
        <Text style={{ fontSize: 30, color: 'red' }}>
            You need to grant camera permission first
        </Text>
        );
    }
}