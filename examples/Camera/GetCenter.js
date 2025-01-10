import { Camera, MapView } from "@vietmap/vietmap-gl-react-native";
import React, { Component } from "react";
import { Text } from "react-native";

import { Bubble } from "../../components/Bubble";

const styles = {
  mapView: { flex: 1 },
};

export class GetCenter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      center: [],
    };

    this.onRegionDidChange = this.onRegionDidChange.bind(this);
    this.getLat = this.getLat.bind(this);
    this.getLng = this.getLng.bind(this);
  }

  async onRegionDidChange() {
    const center = await this._map.getCenter();
    this.setState({ center });
  }

  getLng() {
    const { center } = this.state;
    return center.length === 2 ? `Lng: ${center[0]}` : "Not available";
  }

  getLat() {
    const { center } = this.state;
    return center.length === 2 ? `Lat: ${center[1]}` : "Not available";
  }

  render() {
    return (
      <>
        <MapView
          onRegionDidChange={this.onRegionDidChange}
          ref={(c) => (this._map = c)}
          onPress={this.onPress}
          style={styles.mapView}
        >
          <Camera zoomLevel={9} centerCoordinate={[-73.970895, 40.723279]} />
        </MapView>

        <Bubble>
          <Text>Center</Text>
          <Text>{this.getLng()}</Text>
          <Text>{this.getLat()}</Text>
        </Bubble>
      </>
    );
  }
}
