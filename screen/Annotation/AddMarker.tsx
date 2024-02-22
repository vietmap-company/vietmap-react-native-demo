import Vietmap from '@vietmap/vietmap-gl-react-native';
import {StyleSheet, View} from 'react-native';
import {vietmapStyle} from '../../vietmap_config';
import {useEffect, useState} from 'react';
import notifyMessage from '../../util/Toast';

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
const vietmapLogo: string =
  'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFZA_JaP9I1vGrVjeCnUU_--zn0LpqVyeed6MvQMZ2rJz9s_5baAExPth7HbpS52hfi7I&usqp=CAU';
const AddMarker = () => {
  const [clickedCoordinate, setClickedCoordinate] = useState([
    106.900106, 10.74619,
  ]);
  const handleOnMapClick = (feature: any) => {
    const {geometry, properties} = feature;
    console.log(geometry.coordinates);
    setClickedCoordinate(geometry.coordinates);
  };
  useEffect(() => {
    notifyMessage('Click to the map to add new marker');
  }, []);
  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <Vietmap.MapView
          styleURL={vietmapStyle}
          style={{flex: 1}}
          onPress={handleOnMapClick}>
          <Vietmap.Camera
            zoomLevel={10}
            followUserLocation={false}
            centerCoordinate={[106.800106, 10.704619]}
          />
          <Vietmap.ShapeSource
            id="marker-source"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: [106.800106, 10.704619],
              },
            }}>
            <Vietmap.SymbolLayer
              id="marker-layer"
              style={{
                iconImage: vietmapLogo,
                iconSize: 0.2,
              }}
            />
          </Vietmap.ShapeSource>
          <Vietmap.ShapeSource
            id="custom-marker"
            shape={{
              type: 'Feature',
              geometry: {
                type: 'Point',
                coordinates: clickedCoordinate,
              },
            }}>
            <Vietmap.SymbolLayer
              id="custom-marker-layer"
              style={{
                iconImage: vietmapLogo,
                iconSize: 0.2,
              }}
            />
          </Vietmap.ShapeSource>
        </Vietmap.MapView>
      </View>
    </View>
  );
};
export default AddMarker;
