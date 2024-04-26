import { Text, View, Button, StyleSheet, Linking, Image } from 'react-native';
import React, { ReactElement } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { VietmapApi } from '@vietmap/vietmap-api';
import { Polyline } from '@vietmap/vietmap-api/src/helper'
import { ReverseRequest, ReverseResponse, RouteRequest, SearchRequest } from '@vietmap/vietmap-api/src/models';

const styles = StyleSheet.create({
  text: {
    paddingTop: 30,
    paddingRight: 30,
    paddingBottom: 30,
    paddingLeft: 30,
  },
  docText: {
    color: 'blue',
  },
  buttonContainer: {
    height: 900,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  button: {
    paddingBottom: 10,
    alignItems: 'stretch',
    flexBasis: '40%',
    flexShrink: 0,
    flexGrow: 1,
    margin: 10,
  },
  image: {
    resizeMode: 'center',
    width: 'auto',
    height: 40,
    marginTop: 20,
  },
});

const MainScreen = (props: {
  navigation: { navigate: (arg0: string) => void };
}) => {
  return (
    <View>
      <Image
        source={require('../images/vietmap_logo_icon.png')}
        style={styles.image}
      />
      <Greeting />
      <ScrollView contentContainerStyle={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Simple Map"
            onPress={() => props.navigation.navigate('Simple Map')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Turn by turn navigation"
            onPress={() => props.navigation.navigate('VietMapNavigation')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Add Marker"
            onPress={() => props.navigation.navigate('Add Marker')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Add Popup"
            onPress={() => props.navigation.navigate('Add Popup')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Add Line"
            onPress={() => props.navigation.navigate('Add Line')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Add Shape"
            onPress={() => props.navigation.navigate('Add Shape')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="Change Style"
            onPress={() => props.navigation.navigate('Change Style')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Move Camera"
            onPress={() => props.navigation.navigate('Move Camera')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Show PointAnnotation"
            onPress={() => props.navigation.navigate('Show PointAnnotation')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Custom Callout"
            onPress={() => props.navigation.navigate('Custom Callout')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="Heatmap"
            onPress={() => props.navigation.navigate('Heatmap')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="ImageOverlay"
            onPress={() => props.navigation.navigate('ImageOverlay')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="ClusterAnnotation"
            onPress={() => props.navigation.navigate('ClusterAnnotation')}
          />
        </View>

        <View style={styles.button}>
          <Button
            title="DriveAlongTheRouteAnimation"
            onPress={() => props.navigation.navigate('DriveAlongTheRouteAnimation')}
          />
        </View>
        <View style={styles.button}>
          <Button
            title="ChangeUserLocationColor"
            onPress={() => props.navigation.navigate('ChangeUserLocationColor')}
          />
        </View>
  
 

        <View style={styles.button}>
          <Button
            title="Build Route"
            onPress={async() => {
              const vm = new VietmapApi({})
              const res = await vm.route(
                [[10.79628438955497,106.70592293472612], [10.801891047584164,106.70660958023404]],
                new RouteRequest({ vehicle: 'car',apikey: 'YOUR_API_KEY_HERE',points_encoded: true, optimize:true}),
              )  
              console.log(res.paths[0].points) 
              const pl = new Polyline()
              const r = pl.decode(res.paths[0].points, 5)
              console.log(r)
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const Greeting = () => {
  return (
    <Text style={styles.text}>
      This App contains some examples of what you can build with Vietmap
      React-Native SDK. The possibilities are infinite but you can navigate
      below through some basic features and see how they are implemented (very
      easily !). To get more information about Vietmap, please refer to{' '}
      <Text
        style={styles.docText}
        onPress={() => Linking.openURL('https://maps.vietmap.vn')}>
        Vietmap document
      </Text>
      .
    </Text>
  );
};
export default MainScreen;
