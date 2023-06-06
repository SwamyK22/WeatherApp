import { StyleSheet, Text, View, Image, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Input from '../Components/Input'
import { useDispatch, useSelector } from 'react-redux';
import {SafeAreaView} from 'react-native-safe-area-context';
import {debounce} from 'lodash'
import styles from './styles';


const WeatherApp = ({navigation}) => {


    const {data, hourData, infoList, date} = useSelector(state => ({
      data: state.dataReducer.weatherData,
      hourData: state.dataReducer.weatherData.forecast.forecastday[0].hour.map((x) => {
        const index = x.time.length-5;
        const time = x.time.slice(index, index+2)
        const ap = Number(time) >= 12 ? 'PM' : 'AM'
        return {
            time:Number(time) == 0 ? `12 ${ap}`: Number(time) > 12 ?`${Number(time)-12} ${ap}` :time+' '+ap,
            temp:x.temp_c
        }
      }),
      infoList: [
        {title:'Sunrise', val:state.dataReducer.weatherData.forecast.forecastday[0].astro.sunrise},
        {title:'Wind', val:`${state.dataReducer.weatherData.current.wind_kph} km/h`},
        {title:'Precipitation', val:`${state.dataReducer.weatherData.current.precip_mm} mm`},
        {title:'Sunset', val:state.dataReducer.weatherData.forecast.forecastday[0].astro.sunset},
        {title:'Pressure', val:`${state.dataReducer.weatherData.current.pressure_mb} mb`},
        {title:'Humidity', val:`${state.dataReducer.weatherData.current.humidity} %`},
      ],
        date:new Date(state.dataReducer.weatherData.forecast.forecastday[0].date).toLocaleDateString('en-Us', {weekday:'long', month:'long', day:'numeric'}) 
    }));
    
    const dispatch = useDispatch();

    const setUserData = debounce( val => {
       dispatch({type:'USER_INPUT', payload:val})
    },2000);
    
  return (
    <SafeAreaView
    style={styles.mainContainer}
    >
      <Input placeholder='Search City' onChangeText={(val) => setUserData(val)}/>
      <Text style={styles.dateText}>{date}</Text>
      <Text style={styles.cityText}>{data.location.name}</Text>
      <Text style={styles.countryTxt}>{data.location.country}</Text>


       <View style={styles.subContainer}>
        <View style={styles.tempContainer}>
            <Text style={styles.temp}>{data.current.temp_c}&deg;</Text>
            <Text style={styles.feelsTxt}>Feels like {data.current.feelslike_c}&deg;</Text>
            <View style={styles.arrowBox}>
                    <Image source={require('../../assets/down-arrow.png')} style={styles.downArrow}/>
                <Text style={styles.degTxt}>
                    {data.forecast.forecastday[0].hour[0].windchill_c}&deg;
                </Text>
                    <Image source={require('../../assets/down-arrow.png')} style={styles.upArrow}/>
                <Text style={styles.degTxt}>
                {data.forecast.forecastday[0].hour[0].heatindex_c}&deg;
                </Text>
            </View>
        </View>
        <Image source={{uri: `http:${data.current.condition.icon}`}} style={{width:130, height:130}} />
      </View>
      <Text style={styles.messageTxt}>{data.current.condition.text}</Text>
      <View style={styles.bottomContainer}>
      <View 
      style={styles.timeList}
      >
      <FlatList 
      showsHorizontalScrollIndicator={false}
      horizontal
      data={hourData}
      keyExtractor={(item, index) => index + ''}
      renderItem={({item}) => (
        <View style={styles.listItem}>
            <Text style={styles.timeTxt}>{item.time}</Text>
            <Text style={styles.tempTxt}>{item.temp}&deg;</Text>
        </View>
      )}
      />
      </View>

      <View style={styles.timeContainer}>
        {infoList.map((x) => (
            <View style={styles.infoItem} key={x.title}>
            <Text style={styles.infoTitle}>{x.title}</Text>
            <Text style={styles.infoVal}>{x.val}</Text>
            </View>
        ))}
      </View>


      <TouchableOpacity onPress={() => navigation.navigate('Forcast')}>
      <Image source={require('../../assets/down-arrow.png')} style={{...styles.upArrow, height:30, width:30,marginTop:30}}/>
      </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default WeatherApp
