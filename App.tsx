/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet
} from 'react-native';
import Navigation from './util/Navigation';
import Vietmap from '@vietmap/vietmap-gl-react-native';
Vietmap.setApiKey(null);
function App(): React.JSX.Element {
  const styles = StyleSheet.create({
    safeAreaView: { flex: 1 },
  });

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <Navigation />
    </SafeAreaView>
  );
}

export default App;
