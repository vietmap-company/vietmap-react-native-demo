import Vietmap, { Camera } from "@vietmap/vietmap-gl-react-native";
import { StyleSheet, Text, View } from "react-native";
import { vietmapStyle } from "../vietmap_config";
import { TouchableOpacity } from "react-native-gesture-handler";

import PropTypes from 'prop-types';
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

  touchableContainer: {borderColor: 'black', borderWidth: 1.0, width: 60},
  touchable: {
    backgroundColor: 'blue',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  touchableText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
const DisplayPopup = () => {
    return <View style={styles.page}>
        <View style={styles.container}>
            <Vietmap.MapView
                styleURL={vietmapStyle}
                style={{ flex: 1 }} >

                <Vietmap.Camera
                    zoomLevel={10}
                    followUserLocation={false}
                    centerCoordinate={[106.800106, 10.704619]} />

                <Vietmap.MarkerView 
                    coordinate={[106.800106, 10.704619]}>           
                     <Vietmap.Callout title={'this is a marker view'}  />
                </Vietmap.MarkerView>

                <Vietmap.PointAnnotation
                    id="annotation-hidden"
                    coordinate={[106.880106, 10.604619]}
                    style={{ backgroundColor: 'white' }}>
                    <AnnotationContent
                        title={"Your custom marker" }
                    />
                </Vietmap.PointAnnotation>
            </Vietmap.MapView>
        </View>
    </View>
}
interface AnnotationContentProps {
    title: string | null | undefined;  
  }
const AnnotationContent: React.FC<AnnotationContentProps> = ({title}) => (
    <View style={styles.touchableContainer}>
      <Text>{title}</Text>
      <TouchableOpacity style={styles.touchable}>
        <Text style={styles.touchableText}>Btn</Text>
      </TouchableOpacity>
    </View>
  );
  AnnotationContent.propTypes = {
    title: PropTypes.string,
  };

export default DisplayPopup