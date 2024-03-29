

import React from 'react';
import radar0 from '../../images/radar.png';
import radar1 from '../../images/radar1.png';
import radar2 from '../../images/radar2.png';
import { DynamicColorIOS, Text, View } from 'react-native';
import Vietmap from '@vietmap/vietmap-gl-react-native';
import Bubble from '../../common/Bubble';
import { vietmapStyle } from '../../vietmap_config';
const styles = {
    rasterLayer: { rasterOpacity: 0.6 },
    bubble: { bottom: 100 },
};


const frames = [radar0, radar1, radar2];


const coordQuads = [
    [
        [106.492888, 10.957413], // top left
        [106.927100, 10.951878], // top right
        [106.958675, 10.653745], // bottom right
        [106.444080, 10.654078], // bottom left
    ],
    [
        [106.512888, 10.977413], // top left
        [106.947100, 10.971878], // top right
        [106.978675, 10.673745], // bottom right
        [106.464080, 10.674078], // bottom left
    ],
];

class ImageOverlay extends React.Component {
    state = {
        radarFrameIndex: 0,
        coords: coordQuads[0],
        dynamic: false
    }

    _timeOut: ReturnType<typeof setTimeout> | null = null
    componentDidMount(): void {
        this.heartbeat()
    }

    heartbeat() {
        this._timeOut = setTimeout(() => {
            requestAnimationFrame(() => {
                let nextFrame = this.state.radarFrameIndex + 1;
                if (nextFrame > 1) {
                    nextFrame = 0
                }
                if (this.state.dynamic) {
                    this.setState({
                        radarFrameIndex: nextFrame,
                        coords: coordQuads[nextFrame]
                    })
                } else {
                    this.setState({ radarFrameIndex: nextFrame })
                }
                this.heartbeat()
            })
        }, 1000)
    }
    componentWillUnmount(): void {
        if (this._timeOut) {
            clearTimeout(this._timeOut)
        }
    }

    render(): React.ReactNode {

        const bubbleText = this.state.dynamic
            ? 'Static coordinates'
            : 'Dynamic coordinates';


        return (
            <View style={{ flex: 1 }}>
                <Vietmap.MapView
                    style={{ flex: 1 }}
                    styleURL={vietmapStyle}>
                    <Vietmap.Camera zoomLevel={9} centerCoordinate={[106.657948, 10.798708]} />

                    <Vietmap.Animated.ImageSource
                        key="d"
                        id="radarSource"
                        coordinates={this.state.coords}
                        url={frames[this.state.radarFrameIndex]}>
                        <Vietmap.RasterLayer id="radarLayer" style={styles.rasterLayer} />
                    </Vietmap.Animated.ImageSource>
                </Vietmap.MapView>
                <Bubble
                    onPress={() => {
                        this.setState({ dynamic: !this.state.dynamic });
                    }}
                    style={styles.bubble}>
                    <Text>{bubbleText}</Text>
                </Bubble>
            </View>
        );
    }
}


export default ImageOverlay;