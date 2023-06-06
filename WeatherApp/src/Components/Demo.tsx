import { View, Text } from 'react-native'
import React from 'react'
import axiosInstance from '../../utils/AxiosInstance';

const Demo = () => {
    const fetchData = async () => {
        try {
          // const data = fetch('http://api.weatherapi.com/v1/forecast.json?key=9dc146c3f5304b4f907111106230506&q=Bangalore&days=3&aqi=no&alerts=no')
          // .then((val) => val.json())
          const res = await axiosInstance.get(`bangalore&days=6&aqi=no&alerts=no`);
          const data = res.data
                // dispatch({type:'FETCH_DATA', payload: data});
                console.log('====================================');
                console.log(data);
                console.log('====================================');
        } catch (error) {
          console.log('====================================');
          console.log(error);
          console.log('====================================');
        }
      };
      fetchData()
  return (
    <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
      <Text>Demo</Text>
    </View>
  )
}

export default Demo