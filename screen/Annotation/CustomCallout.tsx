import Vietmap, { SymbolLayerStyle } from "@vietmap/vietmap-gl-react-native"
import {ReactElement} from 'react';
import React, {FC, useState} from 'react';

import {FeatureCollection,Feature} from '@turf/helpers';
import { StyleProp, Text, TextStyle, View, ViewStyle } from "react-native";
import pinImage from '../../images/pin.png';
import { vietmapSatelliteStyle } from "../../vietmap_config";

const defaultCamera ={
    centerCoordinate:[106.23425, 10.454222],
    zoomLevel: 6
}

const featureCollection: FeatureCollection ={
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        id: '9d10456e-bdda-4aa9-9269-04c1667d4552',
        properties: {
          icon: 'example',
          message: 'Hello!',
        },
        geometry: {
          type: 'Point',
          coordinates: [106.23425, 10.454222],
        },
      },
    ],
}
type CustomCalloutViewProps ={
    message:string
}

const CustomCalloutView:FC<CustomCalloutViewProps>=({message})=>{
    return ( <View style={styles.calloutContainerStyle}>
        <Text style={styles.customCalloutText}>{message}</Text>
      </View> )
}

type CustomCalloutProps = {
    label: string;
  };
const CustomCallout = (props: CustomCalloutProps):ReactElement=>{
    const [selectedFeature, setSelectedFeature]=useState<Feature<{type:string; coordinates: number[]}>>();
    const onPinPress = (e: any): void => {
        if (selectedFeature) {
          setSelectedFeature(undefined);
          return;
        }
    
        const feature = e?.features[0];
        setSelectedFeature(feature);
      };

      return <Vietmap.MapView style={{flex:1}}
      styleURL={vietmapSatelliteStyle}
      >
        <Vietmap.Camera defaultSettings={defaultCamera} />
        <Vietmap.ShapeSource
          id="mapPinsSource"
          shape={featureCollection}
          onPress={onPinPress}>
          <Vietmap.SymbolLayer id="mapPinsLayer" style={styles.mapPinLayer} />
        </Vietmap.ShapeSource>
        {selectedFeature && (
          <Vietmap.MarkerView
             coordinate={selectedFeature.geometry.coordinates}>
            <CustomCalloutView message={selectedFeature?.properties?.message} />
          </Vietmap.MarkerView>
        )}
      </Vietmap.MapView>
}

interface CustomCalloutStyles {
    mapPinLayer: SymbolLayerStyle;
    customCalloutText: StyleProp<TextStyle>;
    calloutContainerStyle: StyleProp<ViewStyle>;
  }
const styles: CustomCalloutStyles = {
    mapPinLayer: {
      iconAllowOverlap: true,
      iconAnchor: 'center',
      iconSize: 1.0,
      iconImage: pinImage,
    },
    customCalloutText: {
      color: 'black',
      fontSize: 16,
    },
    calloutContainerStyle: {
      backgroundColor: 'white',
      width: 60,
      height: 40,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },
  };
  export default CustomCallout