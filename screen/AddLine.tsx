import Vietmap from "@vietmap/vietmap-gl-react-native"
import { vietmapStyle } from "../vietmap_config"
import { StyleSheet, View } from "react-native"

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
const AddLine = () => {
    return (

        <View style={styles.page}>
            <View style={styles.container}>
                <Vietmap.MapView
                    styleURL={vietmapStyle}
                    style={{ flex: 1 }}
                >
                    <Vietmap.Camera
                        zoomLevel={4}
                        followUserLocation={false}
                        centerCoordinate={
                            [112.908654, 7.760325]} />
                    <Vietmap.ShapeSource id="route-source" shape={geoJsonFeature}>
                        <Vietmap.LineLayer
                            id="route-layer"
                            style={{
                                lineColor: 'steelblue',
                                lineWidth: 4,
                                lineJoin: 'round',
                                lineCap: 'round',
                            }}
                        />
                    </Vietmap.ShapeSource>
                </Vietmap.MapView>
            </View>
        </View>
    )
}

const geoJsonFeature = {
    type: 'Feature',
    properties: {},
    geometry: {
        type: 'LineString',
        coordinates: [
            [106.708654, 1.760325],            
            [107.708654, 1.760325],
            [107.308654, 2.760325],
            [108.708654, 3.660325],
            [108.508654, 3.760325],
            [109.208654, 4.560325],
            [109.708654, 4.760325],
            [110.508654, 5.760325],
            [110.308654, 5.760325],
            [111.408654, 6.760325],
            [111.708654, 6.960325],
            [112.508654, 7.760325],
            [112.908654, 7.760325],
            [113.708654, 8.160325],
            [113.7908654, 8.760325],
            [114.2708654, 9.760325],
            [114.08654, 9.360325],
            [115.408654, 10.760325],
            [115.708654, 10.760325],
            [116.708654, 11.260325],
            [116.308654, 11.760325],
            [117.508654, 12.260325],
            [117.708654, 12.760325],
            [118.408654, 13.860325],
            [118.108654, 13.760325],

        ],
    },
};

export default AddLine