import Vietmap from "@vietmap/vietmap-gl-react-native";
import React from "react";
import { Animated, Image, StyleSheet, View } from "react-native";
import PropTypes from 'prop-types';
import { vietmapStyle } from "../../vietmap_config";

const ANNOTATION_SIZE = 45;

const styles = StyleSheet.create({
    annotationContainer: {
        alignItems: 'center',
        backgroundColor: 'white',
        borderColor: 'rgba(0, 0, 0, 0.45)',
        borderRadius: ANNOTATION_SIZE / 2,
        borderWidth: StyleSheet.hairlineWidth,
        height: ANNOTATION_SIZE,
        justifyContent: 'center',
        overflow: 'hidden',
        width: ANNOTATION_SIZE,
    },
});

class AnnotationWithRemoteImage extends React.Component<any, any> {
    annotationRef: Vietmap.PointAnnotation | null = null
    static propTypes: {
        id: PropTypes.Requireable<string>;
        title: PropTypes.Requireable<string>;
        coordinate: PropTypes.Requireable<(number | null | undefined)[]>;
    };
    render(): React.ReactNode {
        const { id, coordinate, title } = this.props
        return (<Vietmap.PointAnnotation
            id={id}
            coordinate={coordinate}
            title={title}
            draggable

            onDrag={e =>
                console.log('onDrag:', e.properties.id, e.geometry.coordinates)
            }
            onDragStart={e =>
                console.log('onDragStart:', e.properties.id, e.geometry.coordinates)
            }
            onDragEnd={e =>
                console.log('onDragEnd:', e.properties.id, e.geometry.coordinates)
            }
            ref={ref => (this.annotationRef = ref)}
        >
            <View style={styles.annotationContainer}>
                <Image
                    source={{ uri: 'https://reactnative.dev/img/tiny_logo.png' }}
                    style={{ width: ANNOTATION_SIZE, height: ANNOTATION_SIZE }}
                    onLoad={() => this.annotationRef?.refresh()}
                />
            </View>
            <Vietmap.Callout title="This is a sample" />
        </Vietmap.PointAnnotation>)
    }
}

AnnotationWithRemoteImage.propTypes = {
    id: PropTypes.string,
    title: PropTypes.string,
    coordinate: PropTypes.arrayOf(PropTypes.number),
}
interface ShowPointAnnotationComponentState {
    coordinates: number[][]
    activeAnnotationIndex: number
    previousActiveAnnotationIndex: number
    backgroundColor: string

}
class ShowPointAnnotation extends React.Component<{}, ShowPointAnnotationComponentState, any> {
    _scaleIn: Animated.Value | undefined;
    _scaleOut: Animated.Value | undefined;
    _map: Vietmap.MapView | null | undefined;
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            coordinates: [[106.982344, 10.98484]],
            activeAnnotationIndex: -1,
            previousActiveAnnotationIndex: -1,
            backgroundColor: 'blue',
        }

        this.onPress = this.onPress.bind(this);
    }

    onPress(feature: { geometry: { coordinates: any; }; }) {
        const coords = Object.assign([], this.state.coordinates);
        coords.push(feature.geometry.coordinates);
        this.setState({ coordinates: coords });
    }

    onAnnotationSelected(activeIndex: number, feature: any) {
        if (this.state.activeAnnotationIndex === activeIndex) {
            return;
        }
        this._scaleIn = new Animated.Value(0.6);
        Animated.timing(this._scaleIn, {
            toValue: 1.0, duration: 200,
            useNativeDriver: false
        }).start();
        this.setState({ activeAnnotationIndex: activeIndex });
    }

    onAnnotationDeselected(deselectedIndex: number) {
        const nextState: ShowPointAnnotationComponentState = {
            coordinates: [],
            activeAnnotationIndex: 0,
            previousActiveAnnotationIndex: 0,
            backgroundColor: ""
        };

        if (this.state.activeAnnotationIndex === deselectedIndex) {
            nextState.activeAnnotationIndex = -1;
        }

        this._scaleOut = new Animated.Value(1);
        Animated.timing(this._scaleOut, {
            toValue: 0.6, duration: 200,
            useNativeDriver: false
        }).start();
        nextState.previousActiveAnnotationIndex = deselectedIndex;
        this.setState(nextState);
    }
    renderAnnotations() {
        const items = [];

        for (let i = 0; i < this.state.coordinates.length; i++) {
            const coordinate = this.state.coordinates[i];

            const title = `Lon: ${coordinate[0]} Lat: ${coordinate[1]}`;
            const id = `pointAnnotation${i}`;

            const animationStyle: any = {};
            if (i === this.state.activeAnnotationIndex) {
                animationStyle.transform = [{ scale: this._scaleIn }];
            } else if (i === this.state.previousActiveAnnotationIndex) {
                animationStyle.transform = [{ scale: this._scaleOut }];
            }

            if (i % 2 === 1) {
                items.push(
                    <AnnotationWithRemoteImage
                        key={id}
                        id={id}
                        coordinate={coordinate}
                        title={title}
                    />,
                );
            } else {
                items.push(
                    <Vietmap.PointAnnotation
                        key={id}
                        id={id}
                        coordinate={coordinate}
                        title={title}>
                        <View style={styles.annotationContainer} />
                        <Vietmap.Callout title="This is a sample with image" />
                    </Vietmap.PointAnnotation>
                );
            }
        }
        return items;
    }
    render() {
        return (
            <View style={{ flex: 1 }}>
                <Vietmap.MapView
                    tintColor={"#37FAD4"}
                    ref={c => (this._map = c)}
                    onPress={this.onPress}
                    styleURL={vietmapStyle}
                    style={{ flex: 1 }}>
                    <Vietmap.Camera
                        zoomLevel={8}
                        centerCoordinate={this.state.coordinates[0]} 
                    /> 
                    <Vietmap.UserLocation
                        renderMode="native"
                        androidRenderMode="compass"
                    />
                    {this.renderAnnotations()}
                </Vietmap.MapView>

            </View>
        );
    }
}
export default ShowPointAnnotation