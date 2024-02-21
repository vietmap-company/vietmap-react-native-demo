/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type { PropsWithChildren } from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
 
import Navigation from './util/Navigation'; 
import Vietmap from '@vietmap/vietmap-gl-react-native';
Vietmap.setAccessToken(null)
function App(): React.JSX.Element { 

  const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
    },
  }); 

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Navigation />
    </SafeAreaView>
  );
}
 
export default App;
