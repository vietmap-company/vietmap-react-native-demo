import {StyleSheet, View} from 'react-native';
import {
  vietmapRasterStyle,
  vietmapSatelliteStyle,
  vietmapStyle,
} from '../../vietmap_config';
import SelectDropdown from 'react-native-select-dropdown';
import {useState} from 'react';
import Vietmap from '@vietmap/vietmap-gl-react-native';
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
  menu: {
    height: 40,
    width: '100%',
  },
});

const ChangeStyle = () => {
  const vietmapStyles = [
    vietmapStyle,
    vietmapSatelliteStyle,
    vietmapRasterStyle,
  ];

  const [style, setStyle] = useState(vietmapStyles[0]);

  return (
    <View style={styles.page}>
      <View style={styles.container}>
        <SelectDropdown
          buttonStyle={styles.menu}
          data={vietmapStyles}
          defaultValueByIndex={0}
          rowStyle={{
            height: 40,
          }}
          onSelect={(selectedItem, _) => setStyle(selectedItem)}
        />
        <Vietmap.MapView
          style={styles.map}
          attributionPosition={{bottom: 8, left: 8}}
          styleURL={style}>
          <Vietmap.Camera
            defaultSettings={{
              centerCoordinate: [106.800106, 10.704619],
              zoomLevel: 5,
            }}
          />
        </Vietmap.MapView>
      </View>
    </View>
  );
};

export default ChangeStyle;
