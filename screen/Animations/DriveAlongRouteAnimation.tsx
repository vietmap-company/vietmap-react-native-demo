import Vietmap from "@vietmap/vietmap-gl-react-native"
import React from "react"
import { StyleSheet, View } from "react-native"
import RouteSimulator from "../../util/RouteSimulator"
import { makeLineString } from "@vietmap/vietmap-gl-react-native/javascript/utils/geoUtils"

import {point} from '@turf/helpers'; 
import PulseCircleLayer from "../../common/PulseCircleLayer"
import { vietmapStyle } from "../../vietmap_config"
import { Button } from "react-native-elements"
import Page from "../../common/Page"
const VM_START_COORDINATE =[106.70594000000001,10.79631]
const styles = StyleSheet.create({
    button: {
    backgroundColor: 'blue',
    borderRadius: 3,
  },
  buttonCnt: {
    backgroundColor: 'transparent',
    bottom: 16,
    flexDirection: 'row',
    justifyContent: 'space-around',
    left: 0,
    position: 'absolute',
    right: 0,
  },
})
const layerStyles ={
  origin: {
    circleRadius: 5,
    circleColor: 'red',
  },
  destination: {
    circleRadius: 5,
    circleColor: 'blue',
  },
  route: {
    lineColor: 'red',
    lineCap: Vietmap.LineJoin.Round,
    lineWidth: 3,
    lineOpacity: 0.84,
  },
  progress: {
    lineColor: '#314ccd',
    lineWidth: 3,
  },
}
interface DriveAlongTheRouteAnimationState{
    route: any
    currentPosition: any
    routeSimulator: RouteSimulator | null
}
class DriveAlongTheRouteAnimation extends React.Component<{},DriveAlongTheRouteAnimationState, any>{
    constructor(props: any){
        super(props)
        this.state={
            route: null,
            currentPosition: null,
            routeSimulator: null
        }

        this.onStart = this.onStart.bind(this)
    }
    onStart(){
        const routeSimulator = new RouteSimulator(this.state.route, 0.001)
        routeSimulator.addListener((currentPosition: number[]) => this.setState({currentPosition}))
        routeSimulator.start();
        this.setState({routeSimulator})
    }
    componentDidMount(): void {

        this.setState({
            route: makeLineString([[106.70594000000001,10.79631],[106.70664000000001,10.79593],[106.70673000000001,10.795890000000002],[106.70700000000001,10.79579],[106.70727000000001,10.795720000000001],[106.70743,10.79568],[106.70758000000001,10.79565],[106.70778000000001,10.795570000000001],[106.70811,10.795430000000001],[106.70828,10.79536],[106.70841000000001,10.795300000000001],[106.70929000000001,10.794820000000001],[106.70932,10.79479],[106.70985,10.795340000000001],[106.70999,10.795530000000001],[106.71006000000001,10.79565],[106.71013,10.795850000000002],[106.71019000000001,10.79601],[106.71034,10.7964],[106.71050000000001,10.796830000000002],[106.71056000000002,10.797],[106.71071,10.79738],[106.71085000000001,10.79779],[106.71089,10.797930000000001],[106.71096000000001,10.798190000000002],[106.71099000000001,10.798300000000001],[106.71105000000001,10.798620000000001],[106.71107,10.79889],[106.7111,10.799130000000002],[106.71112000000001,10.799410000000002],[106.71113000000001,10.79954],[106.71117000000001,10.799930000000002],[106.71123000000001,10.80044],[106.71126000000001,10.800770000000002],[106.71132000000001,10.80119],[106.71141000000001,10.801210000000001],[106.71150000000002,10.80128],[106.71154000000001,10.801390000000001],[106.71154000000001,10.80146],[106.71152000000001,10.80152],[106.71148000000001,10.801570000000002],[106.71143000000001,10.80161],[106.71137,10.801630000000001],[106.71145000000001,10.802190000000001],[106.71147,10.80249],[106.71148000000001,10.802710000000001],[106.71147,10.802800000000001],[106.71133,10.80287],[106.71127000000001,10.80288],[106.71089,10.802890000000001],[106.71042000000001,10.802930000000002],[106.71012,10.802950000000001],[106.7094,10.80302],[106.709,10.80305],[106.70845000000001,10.803090000000001],[106.70816,10.80311],[106.70778000000001,10.80314],[106.70763000000001,10.80314],[106.70766,10.802990000000001],[106.70769000000001,10.80255],[106.70772000000001,10.802010000000001],[106.70774000000002,10.80169],[106.7077,10.801430000000002],[106.70765000000002,10.801430000000002],[106.70737000000001,10.802000000000001],[106.70735,10.80197],[106.70732000000001,10.80207],[106.7073,10.80212],[106.70707,10.80213],[106.70703,10.80208],[106.70700000000001,10.802090000000002],[106.70688000000001,10.802100000000001],[106.70685,10.802200000000001],[106.70679000000001,10.802190000000001],[106.70677,10.80212],[106.70656000000001,10.80211],[106.70653000000001,10.802090000000002],[106.7065,10.802100000000001],[106.70647000000001,10.80213],[106.70641,10.802140000000001],[106.70641,10.80213]]),
        })
    }

    componentWillUnmount(): void {
        if(this.state.routeSimulator){
            this.state.routeSimulator.stop()
        }
    }

    renderRoute(){
        if(!this.state.route) return null

        return (
            <Vietmap.ShapeSource id ="routeSource" shape={this.state.route}>
                <Vietmap.LineLayer id="routeFill" style={layerStyles.route} belowLayerID="vmadmin_province"/>
            </Vietmap.ShapeSource>
        )
    }

    renderCurrentPoint(){
        if(!this.state.currentPosition) return
        return <PulseCircleLayer
            shape={this.state.currentPosition}
            aboveLayerID="destinationInnerCircle"/>
    }

    renderProgressLine(){
        if(!this.state.currentPosition) return null

        const {nearestIndex} = this.state.currentPosition?.properties

    const coords = this.state.route?.geometry?.coordinates?.filter(
        (c: any, i: number) => i <= nearestIndex,
      );
      coords.push(this.state.currentPosition?.geometry?.coordinates);
  
      if (coords.length < 2) {
        return null;
      }
  
      const lineString = makeLineString(coords);
      return (
        <Vietmap.Animated.ShapeSource id="progressSource" shape={lineString}>
          <Vietmap.Animated.LineLayer
            id="progressFill"
            style={layerStyles.progress}
            aboveLayerID="routeFill"
          />
        </Vietmap.Animated.ShapeSource>
      );
    }

    renderOrigin() {
        let backgroundColor = 'red';
    
        if (this.state.currentPosition) {
          backgroundColor = '#314ccd';
        }
    
        const style = [layerStyles.origin, {circleColor: backgroundColor}];
    
        return (
          <Vietmap.ShapeSource id="origin" shape={point([106.70641,10.80213])}>
            <Vietmap.Animated.CircleLayer id="originInnerCircle" style={style} />
          </Vietmap.ShapeSource>
        );
      }
    
      renderActions() {
        if (this.state.routeSimulator) {
          return null;
        }
        return (
          <View style={styles.buttonCnt}>
            <Button
              raised
              title="Start"
              onPress={this.onStart}
              style={styles.button}
              disabled={!this.state.route}
            />
          </View>
        );
      }
    
      render() {
        return (
          <Page>
            <Vietmap.MapView 
              style={{flex:1}}
              styleURL={vietmapStyle}>
              <Vietmap.Camera
                zoomLevel={15}
                centerCoordinate={[106.708610,10.800499]}
              />
    
              {this.renderOrigin()}
    
              {this.renderRoute()}
              {this.renderCurrentPoint()}
              {this.renderProgressLine()}
    
              <Vietmap.ShapeSource
                id="destination"
                shape={point(VM_START_COORDINATE)}>
                <Vietmap.CircleLayer
                  id="destinationInnerCircle"
                  style={layerStyles.destination}
                />
              </Vietmap.ShapeSource>
            </Vietmap.MapView>
    
            {this.renderActions()??<></>}
          </Page>
        );
      }
}

export default DriveAlongTheRouteAnimation