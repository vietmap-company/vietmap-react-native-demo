/* eslint-disable comma-dangle */
// import React from 'react';
import { StyleSheet, View, Pressable, Text, Dimensions } from 'react-native';
import VietMapNavigation, { NavigationProgressData } from '@vietmap/vietmap-react-native-navigation';
import { VietMapNavigationController } from '@vietmap/vietmap-react-native-navigation';
import React, { useEffect, useState } from 'react';
import { vietmapAPIKey } from '../../vietmap_config';
import { RouteData } from '@vietmap/vietmap-react-native-navigation/dist/models/route_data';



const VietMapNavigationScreen: React.FC<void> = () => {

  const translationGuide: Map<string, string> = new Map([
    ["arrive_left", "Đích đến bên trái"],
    ["arrive_right", "Đích đến bên phải"],
    ["arrive_straight", "Đích đến phía trước"],
    ["arrive", "Đến"],
    ["close", "Đóng"],
    ["continue_left", "Tiếp tục đi và rẽ trái"],
    ["continue_right", "Tiếp tục đi và rẽ phải"],
    ["continue_slight_left", "Tiếp tục đi và rẽ nhẹ về bên trái"],
    ["continue_slight_right", "Tiếp tục đi và rẽ nhẹ về bên phải"],
    ["continue_straight", "Tiếp tục đi thẳng"],
    ["continue_uturn", "Tiếp tục đi và quay đầu"],
    ["continue", "Tiếp tục đi"],
    ["depart_left", "Rẽ trái khi xuất phát"],
    ["depart_right", "Rẽ phải khi xuất phát"],
    ["depart_straight", "Tiếp tục đi thẳng khi xuất phát"],
    ["depart", "Xuất phát"],
    ["end_of_road_left", "Rẽ trái ở cuối đường"],
    ["end_of_road_right", "Rẽ phải ở cuối đường"],
    ["flag", "Cờ"],
    ["fork_left", "Rẽ trái ở ngã ba"],
    ["fork_right", "Rẽ phải ở ngã ba"],
    ["fork_slight_left", "Rẽ nhẹ về bên trái ở ngã ba"],
    ["fork_slight_right", "Rẽ nhẹ về bên phải ở ngã ba"],
    ["fork_straight", "Tiếp tục đi thẳng ở nơi giao nhánh"],
    ["fork", "Giao nhánh"],
    ["invalid_left", "Hướng trái không hợp lệ"],
    ["invalid_right", "Hướng phải không hợp lệ"],
    ["invalid_slight_left", "Hướng nhẹ về phía trái không hợp lệ"],
    ["invalid_slight_right", "Hướng nhẹ về phía phải không hợp lệ"],
    ["invalid_straight", "Hướng đi thẳng không hợp lệ"],
    ["invalid_uturn", "Hướng quay đầu không hợp lệ"],
    ["invalid", "Hướng không hợp lệ"],
    ["merge_left", "Hợp nhất vào phía trái"],
    ["merge_right", "Hợp nhất vào phía phải"],
    ["merge_slight_left", "Hợp nhất và rẽ nhẹ về phía trái"],
    ["merge_slight_right", "Hợp nhất và rẽ nhẹ về phía phải"],
    ["merge_straight", "Hợp nhất và đi thẳng"],
    ["new_name_left", "Rẽ trái"],
    ["new_name_right", "Rẽ phải"],
    ["new_name_sharp_left", "Rẽ ngoặt về trái"],
    ["new_name_sharp_right", "Rẽ ngoặt về phải"],
    ["new_name_slight_left", "Rẽ nhẹ về trái"],
    ["new_name_slight_right", "Rẽ nhẹ về phải"],
    ["new_name_straight", "Tiếp tục đi thẳng"],
    ["notification_sharp_right", "Rẽ ngoặt về phải"],
    ["notification_left", "Rẽ trái"],
    ["notification_right", "Rẽ phải"],
    ["notification_sharp_left", "Rẽ ngoặt về trái"],
    ["notification_slight_left", "Rẽ nhẹ về trái"],
    ["notification_slight_right", "Rẽ nhẹ về phải"],
    ["notification_straight", "Tiếp tục đi thẳng"],
    ["off_ramp_left", "Rẽ trái ở lối ra"],
    ["off_ramp_right", "Rẽ phải ở lối ra"],
    ["off_ramp_slight_left", "Rẽ nhẹ về trái ở lối ra"],
    ["off_ramp_slight_right", "Rẽ nhẹ về phải ở lối ra"],
    ["on_ramp_left", "Rẽ trái ở lối vào"],
    ["on_ramp_right", "Rẽ phải ở lối vào"],
    ["on_ramp_sharp_left", "Rẽ ngoặt trái ở lối vào"],
    ["on_ramp_sharp_right", "Rẽ ngoặt phải ở lối vào"],
    ["on_ramp_slight_left", "Rẽ nhẹ về trái ở lối vào"],
    ["on_ramp_slight_right", "Rẽ nhẹ về phải ở lối vào"],
    ["on_ramp_straight", "Tiếp tục đi thẳng ở lối vào"],
    ["rotary_left", "Rẽ trái ở vòng xuyến"],
    ["rotary_right", "Rẽ phải ở vòng xuyến"],
    ["rotary_sharp_left", "Rẽ trái ở vòng xuyến"],
    ["rotary_sharp_right", "Rẽ phải ở vòng xuyến"],
    ["rotary_slight_left", "Rẽ nhẹ về trái ở vòng xuyến"],
    ["rotary_slight_right", "Rẽ nhẹ về phải ở vòng xuyến"],
    ["rotary_straight", "Tiếp tục đi thẳng ở vòng xuyến"],
    ["rotary", "Vòng xuyến"],
    ["roundabout_left", "Rẽ trái ở vòng xoay"],
    ["roundabout_right", "Rẽ phải ở vòng xoay"],
    ["roundabout_sharp_left", "Rẽ ngoặt về trái ở vòng xoay"],
    ["roundabout_sharp_right", "Rẽ ngoặt về phải ở vòng xoay"],
    ["roundabout_slight_left", "Rẽ nhẹ về trái ở vòng xoay"],
    ["roundabout_slight_right", "Rẽ nhẹ về phải ở vòng xoay"],
    ["roundabout_straight", "Tiếp tục đi thẳng ở vòng xoay"],
    ["roundabout", "Vòng xoay"],
    ["turn_left", "Rẽ trái"],
    ["turn_right", "Rẽ phải"],
    ["turn_sharp_left", "Rẽ ngoặt về trái"],
    ["turn_sharp_right", "Rẽ ngoặt về phải"],
    ["turn_slight_left", "Rẽ nhẹ về trái"],
    ["turn_slight_right", "Rẽ nhẹ về phải"],
    ["turn_straight", "Tiếp tục đi thẳng"],
    ["updown", ""],
    ["uturn", "Quay đầu"]
  ]);

  const getGuideText = (modifier: string, type: string) => {
    console.log(modifier, type)
    if (modifier != null && type != null) {
      console.log(modifier, type);
      let data = [
        type.split(" ").join("_"),
        modifier.split(" ").join("_")
      ];
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
    return setTotalDistance(`${(data / 1000).toFixed(2)} Km`);
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

  const [isNavigationInprogress, setIsNavigationInprogress] = useState<boolean>(false);
  const startNavigation = routeData != null && !isNavigationInprogress ? (
    <Pressable
      onPress={() => {
        setIsNavigationInprogress(true)
        VietMapNavigationController.startNavigation()
      }}
    >
      <View style={{
        borderRadius: 50,
        alignContent: 'center',
        alignItems: 'center',

        width: 120, height: 50, backgroundColor: 'white', position: 'absolute', left: Dimensions.get('window').width / 2 - 60, bottom: 30, opacity: 1
      }}>
        <Text

          style={{

            textAlignVertical: 'center',
            verticalAlign: 'middle',
            textAlign: 'center',
            color: 'black',
            fontSize: 20,
            fontWeight: '700',
          }}>
          Start navigation
        </Text>
      </View>
    </Pressable>
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

        width: 120, height: 50, backgroundColor: 'white', position: 'absolute', left: 10, bottom: 110, opacity: 1
      }}>
        <Text

          style={{

            textAlignVertical: 'center',
            verticalAlign: 'middle',
            textAlign: 'center',
            color: 'black',
            fontSize: 20,
            fontWeight: '700',
          }}>
          Recenter
        </Text>
      </View>
    </Pressable>
  ) : null

  const bottomActionBar = routeProgressData != null ? (
    <View style={{
      borderRadius: 0,
      width: Dimensions.get('window').width, height: 100, backgroundColor: 'white', position: 'absolute', left: 0, bottom: 0, opacity: 1
    }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Pressable
          onPress={() => {
            setIsOverview(true)
            VietMapNavigationController.overView()
          }}
        >
          <Text
            style={{
              color: 'red',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Overview
          </Text>
        </Pressable>
        <View
          style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
          <Text
            style={{
              color: 'red',
              fontSize: 20,
              fontWeight: '700',
            }}>
            {timeArriveRemaining ?? ""}
          </Text>
          <Text style={{
            color: 'red',
            fontSize: 20,
            fontWeight: '700',
          }}>
            {totalDistance} {estimatedArrivalTime}
          </Text>
        </View>
        <Pressable
          onPress={() => {
            setRouteProgressData(null)
            setIsNavigationInprogress(false)
            VietMapNavigationController.finishNavigation()
          }}
        >
          <Text
            style={{
              color: 'red',
              fontSize: 20,
              fontWeight: '700',
            }}>
            Finish
          </Text>
        </Pressable>
      </View>
    </View>
  ) : null

  const bannerInstruction = routeProgressData != null ? (
    <View style={{
      borderRadius: 10,
      width: Dimensions.get('window').width - 20, height: 100, backgroundColor: 'blue', position: 'absolute', left: 10, top: 10, opacity: 0.5
    }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
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
          navigationZoomLevel={16}
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
              var path = `./svg/png_navigation_symbol/${data.join('_')}.png`;
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
