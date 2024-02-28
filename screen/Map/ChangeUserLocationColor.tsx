import Vietmap from "@vietmap/vietmap-gl-react-native"
import React from "react"
import { Pressable, Text, View } from "react-native"
import { vietmapStyle } from "../../vietmap_config"
import { Button } from "react-native-elements"

const COLOR = ['red', 'yellow', 'green']

class ChangeUserLocationColor extends React.Component {
    state = { currentColor: COLOR.at(0) }
    onUserLocationColorChange = (index: number) => {
        this.setState({ currentColor: COLOR.at(index) })
    }

    renderChangeColorButtonList() {
        return COLOR.map((color, index, listColor) => <View
            key={color}
            style={{ flex: 1 }}
        >
            <Pressable

                onPress={() => this.setState({ currentColor: color })}


                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    backgroundColor:color==this.state.currentColor?color: 'white'
                }}
            >
                <Text style={{ 
                    borderColor:'white',
                    
                    color: 
                     color==this.state.currentColor?'blue':'black', fontWeight: '700' }}>{color}</Text>
            </Pressable>
        </View>)
    }

    render(): React.ReactNode {
        return (<View style={{ flex: 1, flexDirection: 'column' }}>
            <Vietmap.MapView
                tintColor={this.state.currentColor}
                style={{ flex: 14 }}
                styleURL={vietmapStyle}
            >
                <Vietmap.Camera
                    followUserMode={Vietmap.UserTrackingMode.Follow}
                    followUserLocation
                    followZoomLevel={16}
                />
                <Vietmap.UserLocation
                    renderMode="native"
                    androidRenderMode="compass"
                />
            </Vietmap.MapView>
            <View
                style={{ flex: 1, flexDirection: 'row' }}
            >
                {this.renderChangeColorButtonList()}
            </View>
        </View>)
    }
}


export default ChangeUserLocationColor