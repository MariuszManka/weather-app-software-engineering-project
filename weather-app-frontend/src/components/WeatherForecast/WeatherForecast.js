import React, { useEffect, useState } from 'react';
import { Utils } from '../../Utlis'
import AutoGrowInput from '../AutoGrowInput/AutoGrowInput'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import isEmpty from 'lodash/isEmpty'
import Icons from '../Icons/Icons'
import { Tooltip, Typography } from '@mui/material'
import { Air, DeviceThermostatOutlined, Egg, SpeedOutlined } from '@mui/icons-material'
import moment from 'moment/min/moment-with-locales'
import './WeatherForecast.css'

/**
 * Funkcja odpowiedzialna za pobieranie danych o pogodzie z podanego adresu url
 * @param {*} url - Adres URL z którego pobieramy dane
 * @param {*} setData - Funkcja która ustawia dane w stanie
 */
 const fetchForecastData = (url, setData) => {

   // const dummyData = {
   //   error: true,
   //     weather: [
   //        {
   //           id: 800,
   //           main: 'Czyste niebo',
   //        },
   //     ],
   //     name: 'Błędne miasto!',
   //     main: {
   //        feels_like: 0,
   //        humidity: 50,
   //        pressure: 1000,
   //        temp: 0,
   //        temp_max: 10,
   //        temp_min: -10,
   //     },
   // }
 
    fetch(url)
       .then((response) => {
          if (!response.ok) {
             throw new Error('Network response was not OK')
          }
          return response.json()
       })
       .then((data) => {
          setData(data)
       })
       .catch((error) => {
          setData({})
          console.error(
             'There has been a problem with your fetch operation:',
             error
          )
       })
 }

const WeatherForecast = () => {
   const [data, setData] = useState({})
   const [currentCity, setCurrentCity] = useState('')
   const [currentWeather, setCurrentWeather] = useState()

   const handleKeyDown = (e) => {
      if (e.key === 'Enter') {
        const CURRENT_WEATHER_WITH_QUERY_PARAM = `${Utils.API_PREFIX}/${Utils.FORECAST_API_PATH}?q=${currentCity}&cnt=40`
  
        fetchForecastData(CURRENT_WEATHER_WITH_QUERY_PARAM, setData)
      }
   }

   const getIconName = (weatherId) => {
      console.log(weatherId)
      switch (true) {
        case (weatherId >= 200 && weatherId <= 232):
          return 'storm'
        case ((weatherId >= 300 && weatherId <= 321) || (weatherId >= 500 && weatherId <= 531)):  
          return 'rain'
        case (weatherId >= 600 && weatherId <= 622):
          return 'cold'
        case  weatherId === 800:
          return 'sun'
        case (weatherId >= 801 && weatherId <= 804):
          return 'cloudy'
        default:
          return 'cloudy'       
      }
    }

   useEffect(() => {
		const CURRENT_WEATHER_URL = `${Utils.API_PREFIX}/${Utils.FORECAST_API_PATH}?cnt=40`

		fetchForecastData(CURRENT_WEATHER_URL, setData)
      setCurrentCity(data.name ?? 'Warszawa') //Inicjalizowanie domyślnej lokalizacji
	}, [])

   const getWeatherCards = () => { 
      if(!isEmpty(data)){
         let currendDate = data?.list[0].dt_txt
         const weatherCards = []

         for (const list of data.list) {            
            if(!moment(currendDate).isSame(list.dt_txt, 'day')){
               currendDate = list.dt_txt
               weatherCards.push(list)
            }
         }
         return weatherCards
      }
   }

   if(isEmpty(data)) {
      return null
   }

   getWeatherCards()
return(
   <ContentWrapper>
      <div className='current-weather-header'>
          <p>Obecnie w </p> 
          <AutoGrowInput value={currentCity} onChange={setCurrentCity} handleKeyDown={e => handleKeyDown(e)}/>
         <p> jest: </p>
      </div>
      <div className='current-weather-icon'>
         <Icons name={getIconName(data?.list?.[0]?.weather?.[0]?.id)} />
      </div>

      <div className='current-weather-temp'>
         <Typography variant='h1'>{Math.round( data?.list?.[0]?.main?.temp, 0)}°C</Typography>
         <Typography variant='h6'>
           {Math.round(data?.list?.[0]?.main?.temp_max, 0)} ° / {Math.round(data?.list?.[0]?.main?.temp_min,0)} °
          </Typography>
       </div>
       <div className='current-weather-info'>
         <ul className='current-weather-info-list'>
            <li className='current-weather-list-item'>
              <Tooltip title='Temperatura odczuwalna' >
                    <DeviceThermostatOutlined style={{fontSize: 60,  color: '#576574'}}/>
              </Tooltip>
              <Typography style={{fontSize: 30, textAlign: 'right'}}>
                {Math.round(data?.list?.[0]?.main?.feels_like,0)}°C 
              </Typography>
            </li>
           <li className='current-weather-list-item'>
            <Tooltip title='Prędkość wiatru' >
                <Air style={{fontSize: 55,color: '#576574'}}/>
            </Tooltip>
             <Typography style={{fontSize: 30, textAlign: 'right'}}>
                {Math.round(data?.list?.[0]?.wind?.speed, 0)}m/s
             </Typography>
           </li>
           
           <li className='current-weather-list-item'>
            <Tooltip title='Wilgotność' >
                <Egg style={{fontSize: 55,color: '#576574'}}/>
            </Tooltip>
             <Typography style={{fontSize: 30, textAlign: 'right'}}>
                {Math.round(data?.list?.[0]?.main?.humidity, 0)}%
             </Typography>
           </li>

           <li className='current-weather-list-item'>
            <Tooltip title='Ciśnienie atmosferyczne' >
                <SpeedOutlined style={{fontSize: 55,color: '#576574'}}/>
            </Tooltip>
             <Typography style={{fontSize: 30, textAlign: 'right'}}>
                {Math.round(data?.list?.[0]?.main?.pressure, 0)}hPa
             </Typography>
           </li>
         </ul>
       </div>
      {
         getWeatherCards().map((card, index) => {
            moment.locale('pl')
            
            if(index >= 3){
               return null
            }

            return (
               <div className={`weather-forecast-additional-info-card weather-forecast-additional-info-${index}`} key={index}> 
                  <Typography style={{fontWeight: '600', textTransform: 'uppercase'}}>{moment(card.dt_txt).format("ddd")}</Typography>
                  <Icons name={getIconName(card?.weather?.[0]?.id)} style={{width: 70, margin: '8px 0'}} className="" />
                  <Typography variant='h6'>{Math.round(card?.main?.temp, 0)}°C</Typography>
               </div>
            )
         })
      }
   </ContentWrapper>
)}

export default WeatherForecast
