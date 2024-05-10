/* eslint-disable comma-dangle */
// import React from 'react';
import { StyleSheet, View, Pressable, Text, Dimensions, Image } from 'react-native';
import VietMapNavigation, { NavigationProgressData } from '@vietmap/vietmap-react-native-navigation';
import { VietMapNavigationController } from '@vietmap/vietmap-react-native-navigation';
import React, { useEffect, useState } from 'react';
import { vietmapAPIKey } from '../../vietmap_config';
import { RouteData } from '@vietmap/vietmap-react-native-navigation/dist/models/route_data';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements';
import Images from './img/index';
import translationGuide from './trans/index';


const VietMapNavigationScreen: React.FC<void> = () => { 

  const getGuideText = (modifier: string, type: string) => {
    console.log(modifier, type)
    if (modifier != null && type != null) {
      console.log(modifier, type);
      let data = [
        type.split(" ").join("_"),
        modifier.split(" ").join("_")
      ]; 
      setGuideKey(data.join('_'))
      setGuideText(translationGuide.get(data.join('_'))?.toLowerCase() ?? '');

      console.log(data.join('_'))
    }
  }
  const getDistanceToNextTurn = (distance: number) => {
    var data = distance ?? 0;
    console.log(data)
    if (data < 1000) { setDistanceToNextTurn(`Còn ${Math.round(data)} mét,`) } else {
      setDistanceToNextTurn(`Còn ${(data / 1000).toFixed(2)} Km,`);
    }
  }

  const calculateEstimatedArrivalTime = () => {

    const data = routeProgressData?.nativeEvent?.data?.durationRemaining ?? 0;
    const dateTime = new Date();
    const estimateArriveTime = new Date(dateTime.getTime() + data * 1000); // converting seconds to milliseconds
    // check the time is tomorrow and return the date

    if (estimateArriveTime.getDate() !== dateTime.getDate()) {

      setEstimatedArrivalTime(formatDate(estimateArriveTime, 'dd/MM - hh:mm a'));
    }

    setEstimatedArrivalTime(formatTime(estimateArriveTime, 'hh mm'));
  }

  const getTimeArriveRemaining = () => {
    const data = routeProgressData?.nativeEvent?.data?.durationRemaining ?? 0;
    if (data < 60) setTimeArriveRemaining(`${Math.round(data)} giây`);
    else
      if (data < 3600) setTimeArriveRemaining(`${Math.round(data / 60)} phút`); else
        if (data < 86400) {
          const hour = Math.floor(data / 3600);
          const minute = Math.round((data - hour * 3600) / 60);
          setTimeArriveRemaining(`${hour < 10 ? '0' + hour : hour} giờ, ${minute < 10 ? '0' + minute : minute} phút`);
        } else {
          const day = Math.floor(data / 86400);
          const hour = Math.floor((data - day * 86400) / 3600);
          const minute = Math.round((data - hour * 3600 - day * 86400) / 60);
          setTimeArriveRemaining(`${day} ngày, ${hour < 10 ? '0' + hour : hour} giờ, ${minute < 10 ? '0' + minute : minute} phút`);
        }
  }

  const calculateTotalDistance = (distance: number | undefined) => {
    const data = distance ?? 0;
    if (data < 1000) setTotalDistance(`${Math.round(data)} mét`);
    return setTotalDistance(`${(data / 1000).toFixed(2)} km`);
  }

  const formatDate = (date: Date, format: string) => {
    let dateFormat: Intl.DateTimeFormat;
    if (date.getDate() === 0) {
      dateFormat = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
    } else {
      dateFormat = new Intl.DateTimeFormat(undefined, { day: '2-digit', month: '2-digit', hour: 'numeric', minute: 'numeric', hour12: true });
    }
    const res = dateFormat.format(date);
    return res;
  }

  const formatTime = (time: Date, format: string) => {
    const f = new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: 'numeric', hour12: true });
    return f.format(time);
  }

  const [instructionText, setInstructionText] = useState<string>("");
  const [routeProgressData, setRouteProgressData] = useState<NavigationProgressData | null>(null);
  const [guideText, setGuideText] = useState<string>("");
  const [distanceToNextTurn, setDistanceToNextTurn] = useState<string>("");
  const [routeData, setRouteData] = useState<RouteData | null>(null);
  const [isOverview, setIsOverview] = useState<boolean>(false);
  const [totalDistance, setTotalDistance] = useState<string>("");
  const [estimatedArrivalTime, setEstimatedArrivalTime] = useState<string>("");
  const [timeArriveRemaining, setTimeArriveRemaining] = useState<string>("");
  const [guideKey, setGuideKey] = useState<string>("");

  const [isNavigationInprogress, setIsNavigationInprogress] = useState<boolean>(false);
  const startNavigation = routeData != null && !isNavigationInprogress ? (
    <View style={{
      borderRadius: 50,
      alignContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      justifyContent: 'center',
      width: 160, height: 40, backgroundColor: 'white', position: 'absolute', left: Dimensions.get('window').width / 2 - 80, bottom: 30, opacity: 1
    }}>
      <TouchableOpacity
        onPress={() => {
          setIsNavigationInprogress(true)
          VietMapNavigationController.startNavigation()
        }}
      >
        <Text
          style={{
            textAlignVertical: 'center',
            verticalAlign: 'middle',
            textAlign: 'center',
            color: 'black',
            fontSize: 16,
            fontWeight: '500',
          }}>
          Start navigation
        </Text>
      </TouchableOpacity>
    </View >
  ) : null
  const recenterButton = isOverview && routeProgressData != null ? (

    <Pressable
      onPress={() => {
        VietMapNavigationController.recenter()
        setIsOverview(false)
      }}
    >
      <View style={{
        borderRadius: 50,
        alignContent: 'center',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        justifyContent: 'center',
        width: 120, height: 50, backgroundColor: 'white', position: 'absolute', left: 10, bottom: 110, opacity: 1
      }}>
        <Text

          style={{
            textAlignVertical: 'center',
            verticalAlign: 'middle',
            textAlign: 'center',
            color: 'black',
            fontSize: 16,
            fontWeight: '500',
          }}>
          Recenter
        </Text>
      </View>
    </Pressable>
  ) : null

  const bottomActionBar = routeProgressData != null ? (
    <View style={{
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      width: Dimensions.get('window').width, height: 100, backgroundColor: 'white', position: 'absolute', left: 0, bottom: 0, opacity: 1
    }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginRight: 20, marginLeft: 20 }}>
        <Pressable
          onPress={() => {
            setRouteProgressData(null)
            setIsNavigationInprogress(false)
            VietMapNavigationController.finishNavigation()
          }}
        >
          <Image

            style={{ height: 64, width: 64 }}
            source={require('../../assets/close.png')} />
        </Pressable>
        <View
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              color: 'darkorange',
              fontSize: 22,
              fontWeight: '600',
            }}>
            {timeArriveRemaining ?? ""}
          </Text>
          <Text style={{
            color: '000000',
            fontSize: 17,
            fontWeight: '400',
            opacity: 0.8
          }}>
            {totalDistance} - {estimatedArrivalTime}
          </Text>
        </View>
        <Pressable
          onPress={() => {

            setIsOverview(true)
            VietMapNavigationController.overView()
          }}
        >
          <Image
            style={{ height: 64, width: 64 }}

            source={require('../../assets/overview.png')} />
        </Pressable>
      </View>
    </View>
  ) : null

  const bannerInstruction = routeProgressData != null ? (
    <View style={{
      borderRadius: 10,
      width: Dimensions.get('window').width - 20, height: 100, backgroundColor: '#2A5DFF', position: 'absolute', left: 10, top: 10, opacity: 0.7
    }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' ,paddingLeft: 20}}>
        
        <Image style={{ height: 64, width: 64 }} source={Images[guideKey]} />
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start',paddingLeft: 20 }}>
          <Text
            style={{
              color: 'white',
              fontSize: 20,
              fontWeight: '700',
            }}>
            {instructionText ?? ""}
          </Text>
          <Text style={{
            color: 'white',
            fontSize: 20,
            fontWeight: '700',
          }}>
            {distanceToNextTurn} {guideText}
          </Text>
        </View>
      </View>
    </View>
  ) : null;

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        <VietMapNavigation
          initialLatLngZoom={
            {
              lat: 10.704619,
              long: 106.800106,
              zoom: 13
            }}
          navigationPadding={{
            left: 50,
            top: 50,
            right: 50,
            bottom: 50
          }}
          navigationZoomLevel={18}
          shouldSimulateRoute={true}
          apiKey={vietmapAPIKey}
          onRouteProgressChange={(event) => {
            setRouteProgressData(event)
            calculateEstimatedArrivalTime()
            getTimeArriveRemaining()
            console.log('-------------------------------')
            console.log(timeArriveRemaining)
            console.log('-------------------------------')

            calculateTotalDistance(routeProgressData?.nativeEvent?.data?.distanceRemaining)
            setInstructionText(event?.nativeEvent?.data?.currentStepInstruction ?? '');
            let modifier = event?.nativeEvent?.data?.currentModifier
            let type = event?.nativeEvent?.data?.currentModifierType

            if (type != null && modifier != null) {
              var data = [
                type.replace(' ', '_'),
                modifier.replace(' ', '_')
              ]; 
              getGuideText(modifier, type);
              // setInstructionImage(path);

              if (event?.nativeEvent?.data?.distanceToNextTurn != null) {
                getDistanceToNextTurn(event?.nativeEvent?.data?.distanceToNextTurn);
              }
            }
          }}
          onMapMove={() => {
            console.log('onMapMove');
            setIsOverview(true)
          }}
          onMilestoneEvent={(event) => {
            console.log('=====================================================================');
            console.log('onMilestoneEvent', event.nativeEvent);
            console.log('=====================================================================');
          }}
          onNavigationRunning={() => {
            setIsNavigationInprogress(true)
            console.log('onNavigationRunning');
          }}
          onArrival={() => {
            setIsNavigationInprogress(false)
            setRouteProgressData(null)
            console.log('You have reached your destination');
          }}
          onRouteBuilt={(event) => {
            setRouteData(event)
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
            setIsNavigationInprogress(false)
            console.log('Cancelled navigation event');
          }}
        />
      </View>
      {bannerInstruction}
      {bottomActionBar}
      {recenterButton}
      {startNavigation}
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
