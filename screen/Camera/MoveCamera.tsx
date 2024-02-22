import Vietmap from "@vietmap/vietmap-gl-react-native";
import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from "react-native-gesture-handler";
import { vietmapStyle } from "../../vietmap_config";
interface MoveCameraComponentState {
    location: number[];
    isMovingToHN: boolean
}

class MoveCamera extends React.Component<{}, MoveCameraComponentState, any> {

    static HCM_LOCATION = [106.785226, 10.667552];

    static HANOI_LOCATION = [105.838071, 21.022425];

    static value: {
        label: string;
        data: number[];
    }[]
    constructor(props: {} | Readonly<{}>) {
        super(props);
        this.state = {
            location: MoveCamera.HCM_LOCATION,
            isMovingToHN: false
        }
        MoveCamera.value = [
            { label: 'HN', data: MoveCamera.HANOI_LOCATION },
            { label: 'HCM', data: MoveCamera.HCM_LOCATION },
        ]
        this.onFlyToPress = this.onFlyToPress.bind(this);
        this.onFlyToComplete = this.onFlyToComplete.bind(this);
    }

    onFlyToPress() {
        const index = this.state.isMovingToHN ? 1 : 0
        this.setState({ location: MoveCamera.value[index].data, isMovingToHN: !this.state.isMovingToHN });
    }

    onFlyToComplete() {
        Alert.alert('Camera move Animation Completed', 'We did it!!!');
    }
    render() {
        return (
            <View style={styles.container} >
                <Vietmap.MapView 
                tintColor={'#000'}
                styleURL={vietmapStyle}
                style={styles.map}>
                    <Vietmap.Camera
                        zoomLevel={6}
                        animationMode={"easeTo"} 
                        animationDuration={6000}
                        centerCoordinate={this.state.location}
                    />
                    <Vietmap.UserLocation />
                </Vietmap.MapView>

                <View style={styles.column}>
                    <TouchableOpacity onPress={this.onFlyToPress}><View style={styles.button} >
                        <Text style={styles.buttonText}>Move camera</Text>
                    </View></TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default MoveCamera

const styles = StyleSheet.create({
    container: {
        flex: 1, // This makes the container take the full height of the parent
        flexDirection: 'column', // Default flexDirection is column, but setting it explicitly for clarity
    },
    map:{
        flex:8
    },
    column: {
        flex: 1, // Each column takes an equal portion of the available space
        justifyContent: 'center', // Center the content vertically
        alignItems: 'center', // Center the content horizontally
        borderWidth: 1, // Optional: Add border for visualization
        borderColor: 'black', // Optional: Border color
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});