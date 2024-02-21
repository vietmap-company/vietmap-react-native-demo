import Vietmap from '@vietmap/vietmap-gl-react-native';
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
const AddShape = () => {
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Vietmap.MapView styleURL={vietmapStyle} style={{flex: 1}}>
          <Vietmap.Camera
            zoomLevel={3}
            followUserLocation={false}
            centerCoordinate={[107.708654, 1.760325]}
          />
          <Vietmap.ShapeSource id="route-source" shape={geoJsonFeature}>
            <Vietmap.FillLayer id="fill-layer" />
          </Vietmap.ShapeSource>
        </Vietmap.MapView>
      </View>
    </View>
  );
};
const geoJsonFeature = {
  type: 'Feature',
  properties: {},
  geometry: {
    type: 'LineString',
    coordinates: [
      [106.708654, 10.760325],
      [107.708654, 1.760325],
      [112.508654, 7.760325],
    ],
  },
};
export default AddShape;
