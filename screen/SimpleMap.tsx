import VietmapGL from '@vietmap/vietmap-gl-react-native';
import React from 'react';
import {StyleSheet, View} from 'react-native';
import {vietmapStyle} from '../vietmap_config';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
  },
  map: {
    flex: 1,
  },
});

const SimpleMap = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <VietmapGL.MapView styleURL={vietmapStyle} style={{flex: 1}}>
          <VietmapGL.Camera
            zoomLevel={10}
            followUserLocation={false}
            centerCoordinate={[106.800106, 10.704619]}
          />
        </VietmapGL.MapView>
      </View>
    </View>
  );
};

export default SimpleMap;
