// In App.js in a new project

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './components/Home';
import Details from './components/Details';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator();
export const PhotoContext = React.createContext();
const photo = {data: null};

const photoReducer = (state, action) => {
  switch (action.type) {
    case 'photoSelected':
      return action.payload;
    case 'goBack':
      return {data: null};
    default:
      return photo;
  }
};

function App() {
  const [photo, photoDispatch] = React.useReducer(photoReducer, photo);
  return (
    <PhotoContext.Provider
      value={{photoState: photo, photoDispatch: photoDispatch}}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: 'Unsplash Photo Search!',
              headerTitleStyle: styles.header,
              headerStyle: styles.headerStyle,
            }}
          />
          <Stack.Screen
            name="Details"
            component={Details}
            options={{
              title: 'Photo Details',
              headerTitleStyle: styles.header,
              headerStyle: styles.headerStyle,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PhotoContext.Provider>
  );
}

export default App;

const styles = StyleSheet.create({
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    fontFamily: 'sans-serif-condensed',
    fontStyle: 'italic',
  },
  headerStyle: {
    backgroundColor: '#2960df',
    width: 363.4,
  },
});
