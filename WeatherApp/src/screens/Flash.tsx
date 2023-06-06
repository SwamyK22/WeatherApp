import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axiosInstance from '../../utils/AxiosInstance';

const Flash = ({navigation}) => {
    setTimeout(() => {
        navigation.navigate('Home');
    },3000);

    const userInput = useSelector((state) => state.dataReducer.userInput);

    const dispatch = useDispatch();
    
    const fetchData = async () => {
      try {
        const res = await axiosInstance.get(`${userInput}&days=6&aqi=no&alerts=no`);
        const data = res.data
              dispatch({type:'FETCH_DATA', payload: data});
      } catch (error) {
        console.log('====================================');
        console.log(error);
        console.log('====================================');
      }
    };


    useEffect(() => {
        fetchData()
    },[userInput])

  return (
    <View style={styles.mainContainer}>
      <Image source={require('../../assets/weather-app.png')} style={{width:100, height:100}}/>
      <Image source={require('../../assets/weatherApi.png')} style={{width:100, height:100, position:'absolute', bottom:0}}/>
    </View>
  )
}

export default Flash

const styles = StyleSheet.create({
    mainContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:'#ffffff'
    }
})