import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screen/MainScreen';
import SimpleMap from '../screen/SimpleMap';
import AddMarker from '../screen/AddMarker';
import DisplayPopup from '../screen/DisplayPopup';
import AddLine from '../screen/AddLine';
import AddShape from '../screen/AddShape';
import ChangeStyle from '../screen/ChangeStyle';
const Stack = createStackNavigator();
const Navigation = ({props}: any) => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={MainScreen} />
        <Stack.Screen name="Simple Map" component={SimpleMap} />
        <Stack.Screen name="Add Marker" component={AddMarker} />
        <Stack.Screen name="Add Popup" component={DisplayPopup} />
        <Stack.Screen name="Add Line" component={AddLine} />
        <Stack.Screen name="Add Shape" component={AddShape} />
        <Stack.Screen name="Change Style" component={ChangeStyle} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
