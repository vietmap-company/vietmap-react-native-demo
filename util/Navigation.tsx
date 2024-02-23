import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MainScreen from '../screen/MainScreen';
import SimpleMap from '../screen/Map/SimpleMap';
import AddMarker from '../screen/Annotation/AddMarker';
import DisplayPopup from '../screen/Map/DisplayPopup';
import AddLine from '../screen/AddLine';
import AddShape from '../screen/AddShape';
import ChangeStyle from '../screen/Map/ChangeStyle';
import MoveCamera from '../screen/Camera/MoveCamera';
import ShowPointAnnotation from '../screen/Annotation/ShowPointAnnotations';
import CustomCallout from '../screen/Annotation/CustomCallout';
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
        <Stack.Screen name="Move Camera" component={MoveCamera} />
        <Stack.Screen name="Show PointAnnotation" component={ShowPointAnnotation} />
        <Stack.Screen name="Custom Callout" component={CustomCallout} />
        
        
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
