/* eslint-disable comma-dangle */
// import React from 'react';
import { StyleSheet, View, Pressable, Text } from 'react-native';
import VietMapNavigation from '@vietmap/vietmap-react-native-navigation';
import { VietMapNavigationController } from '@vietmap/vietmap-react-native-navigation';
import React, { useEffect } from 'react';
import { vietmapAPIKey } from '../../vietmap_config';



const VietMapNavigationScreen: React.FC<void> = () => {
  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <VietMapNavigation 
          // initialLatLngZoom={{
          //   lat: 12.895131,
          //   long: 108.490272,
          //   zoom: 10,
          // }}
          navigationPadding={{
            left: 50,
            top: 50,
            right: 50,
            bottom: 50
          }}
          navigationZoomLevel={17}
          shouldSimulateRoute={true}
          apiKey={vietmapAPIKey}
          onRouteProgressChange={(event) => {
            console.log('=====================================================================');
            console.log('onRouteProgressChange', event.nativeEvent?.data);
            console.log('=====================================================================');
          }}
          onMapMove={() => {
            console.log('onMapMove');
          }}
          onMilestoneEvent={(event) => {

            console.log('=====================================================================');
            console.log('onMilestoneEvent', event.nativeEvent);
            console.log('=====================================================================');
          }}
          onArrival={() => {
            console.log('You have reached your destination');
          }}
          onRouteBuilt={(event) => {
            console.log('onRouteBuilt', event.nativeEvent.data.duration);
          }}
          onMapClick={(event) => {
            console.log('onMapClick', event.nativeEvent.data.latitude);
          }}
          onMapLongClick={(event) => {
            console.log('onMapLongClick', event.nativeEvent.data.latitude);
            VietMapNavigationController.buildRoute(
              [
                {
                  lat: 10.759156,
                  long: 106.675913,
                },
                {
                  lat: event.nativeEvent.data.latitude,
                  long: event.nativeEvent.data.longitude,
                },
              ],
              'motorcycle'
            )
          }}
          onCancelNavigation={() => {
            console.log('Cancelled navigation event');
          }}
        />
        <View style={{ flex: 1, flexDirection: 'row' }}>
          <View key={'navigation'} style={{ flex: 1 }}>
            <Pressable
              style={buttonStyle}
              onPress={() =>
                VietMapNavigationController.buildRoute(
                  [
                    {
                      lat: 10.762429,
                      long: 106.678900,
                    },
                    {
                      lat: 10.771784,
                      long: 106.693017,
                    },
                  ],
                  'motorcycle'
                )
              }
            >
              <Text >Build route</Text>
            </Pressable>

            <Pressable
              style={buttonStyle}

              onPress={() => VietMapNavigationController.startNavigation()}
            >
              <Text >Start navigation</Text>
            </Pressable>

            <Pressable
              style={buttonStyle}

              onPress={() => VietMapNavigationController.cancelNavigation()}
            >
              <Text >STOP_NAVIGATION</Text>
            </Pressable>

            <Pressable
              style={buttonStyle}

              onPress={() => VietMapNavigationController.recenter()}
            >
              <Text >RECENTER</Text>
            </Pressable>

            <Pressable
              style={buttonStyle}

              onPress={() => VietMapNavigationController.finishNavigation()}
            >
              <Text >FINISH_NAVIGATION</Text>
            </Pressable>

            <Pressable
              style={buttonStyle}

              onPress={() => VietMapNavigationController.overView()}
            >
              <Text >OVERVIEW</Text>
            </Pressable>

            <Pressable
              onPress={() => VietMapNavigationController.clearRoute()}
            >
              <Text >CLEAR ROUTE</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </View>
  );
};

const buttonStyle = {
  height: 50,
  backgroundColor: 'white',
};

const buttonTextStyle = {
  borderColor: 'white',
  color: 'black',
  fontWeight: '700',
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
  },
  mapContainer: {
    flex: 3,
    flexDirection: 'column',
  },
});

export default VietMapNavigationScreen;
