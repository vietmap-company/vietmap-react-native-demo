import {Text, View, Button, StyleSheet, Linking, Image} from 'react-native';
import React, {ReactElement} from 'react';

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
  navigation: {navigate: (arg0: string) => void};
}) => {
  return (
    <View>
      <Image
        source={require('../images/vietmap_logo_icon.png')}
        style={styles.image}
      />
      <Greeting />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button
            title="Simple Map"
            onPress={() => props.navigation.navigate('Simple Map')}
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
      </View>
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
