import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React from 'react';
import styles  from './styles';
import { useSelector } from 'react-redux';


//getDay///
const getDay = (date) => {
    const value = new Date(date).toLocaleDateString('en-Us', {weekday:'long'});
    const index = value.split('').findIndex((x) => x == 'y');
    return value.slice(0, index+1)
};

const WeatherForcast = ({navigation}) => {
    const {data, hourData, infoList, weekForecast} = useSelector(state => ({
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
        weekForecast: state.dataReducer.weatherData.forecast.forecastday.map((item) => ({
            day: getDay(item.date),
            img:item.day.condition.icon,
            temp:item.day.avgtemp_c,
            tempDown:item.day.mintemp_c,
            tempUp:item.day.maxtemp_c,
        }))
      }));

  return (
    <View style={styles.mainContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
        <Image source={require('../../assets/down-arrow.png')} style={{...styles.downArrow, width:30, height:30, marginTop:40}}/>
        </TouchableOpacity>
        <Text style={styles.cityText}>{data.location.name}</Text>
      <Text style={styles.countryTxt}>{data.location.country}</Text>

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

      <View style={{height:220}}>
            <FlatList 
            data={weekForecast}
            keyExtractor={(item, index) => index + item.day}
            renderItem={({item}) => (
                <View style={styles.weekItem}>
                <Text style={{...styles.dateText, width:100, alignSelf:'flex-end'}}>{item.day}</Text> 
                <Image source={{uri:`http:${item.img}`}} style={{width:20, height:20}}/>
                <Text style={{fontWeight:'bold', color:'#ffff'}}>{item.temp}&deg;</Text>  
                <View style={styles.arrowBox}>
                    <Image source={require('../../assets/down-arrow.png')} style={styles.downArrow}/>
                <Text style={styles.degTxt}>
                    {item.tempDown}&deg;
                </Text>
                    <Image source={require('../../assets/down-arrow.png')} style={styles.upArrow}/>
                <Text style={styles.degTxt}>
                    {item.tempUp}&deg;
                </Text>
            </View>
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
    </View>
  )
}

export default WeatherForcast;
