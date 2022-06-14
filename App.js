import React, {Component} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {Provider} from 'mobx-react';
import store from './src/store/MainStore';
import {NavigationContainer} from '@react-navigation/native';
import Home from './src/screens/Home';
import Detail from './src/components/Detail';
import CharacterDetail from './src/components/CharacterDetail';

const Stack = createNativeStackNavigator();
export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Screen name="HomeScreen" component={Home} />
            <Stack.Screen name="DetailScreen" component={Detail} />
            <Stack.Screen name="CharacterScreen" component={CharacterDetail} />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
