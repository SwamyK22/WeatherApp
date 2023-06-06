import React from 'react';
import WeatherMainApp from './WeatherApp/App';
import {Provider} from 'react-redux';
import store from './WeatherApp/src/Redux/Store';
import Demo from './WeatherApp/src/Components/Demo';


export default function App() {
  return (
    <Provider store={store}>
      <WeatherMainApp />
    </Provider>
  )
  }