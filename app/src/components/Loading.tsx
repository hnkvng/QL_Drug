import React, { memo } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingNotifiProp {
  show: boolean
}

const LoadingNotifi : React.FC<LoadingNotifiProp> = ({show}) : React.JSX.Element | boolean => {
  return (
      show && 
      <View style={styles.container}>
          <View style={styles.overlay}>
              <ActivityIndicator size={50} color = {'#1294AB'} />
          </View>
      </View>     
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
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

export default  memo(LoadingNotifi);
