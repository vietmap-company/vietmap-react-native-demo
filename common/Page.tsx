import React, { ReactElement } from 'react';
import { View } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
  
 

interface PageProps {
  children: ReactElement | ReactElement[];
}

const Page = ({ children }: PageProps): ReactElement => {
  const navigation = useNavigation();
  const route = useRoute();
  const label = route.name;

  return (
    <View style={{
      flex: 1
    }}> 
      {children}
    </View>
  );
};

export default Page;
