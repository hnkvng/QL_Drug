import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { getLoading } from '../../redux/selection';
import { typeOfLoading } from './loadingSlice';

const LoadingNotifi = () : React.JSX.Element | boolean => {

    const loading : typeOfLoading = useSelector(getLoading);

    return (
        loading.show && 
        <View style={styles.container}>
            <View style={styles.overlay}>
                <ActivityIndicator size={50} color="#0000ff" />
            </View>
        </View>     
    );
};

const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute',
    zIndex:1000,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default  LoadingNotifi;
