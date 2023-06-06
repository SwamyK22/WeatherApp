
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import Flash from './src/screens/Flash';
import WeatherApp from './src/screens/WeatherApp';
import WeatherForcast from './src/screens/WeatherForcast';


const Stack = createNativeStackNavigator()

export default function WeatherMainApp() {
  return (
    <NavigationContainer>
      <Stack.Navigator
      screenOptions={{
      
      }}
      >
        <Stack.Screen name='flash' component={Flash} options={{header: () => null}} />
        <Stack.Screen name='Home' component={WeatherApp} options={{header: () => null}} />
        <Stack.Screen name='Forcast' component={WeatherForcast} options={{header: () => null}} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}