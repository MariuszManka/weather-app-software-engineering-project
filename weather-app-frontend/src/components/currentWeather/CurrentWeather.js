import { Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react';
import { Utils } from '../../Utlis'
import AutoGrowInput from '../AutoGrowInput/AutoGrowInput';
import Icons from '../Icons/Icons'
import { DeviceThermostatOutlined, Air, Egg, SpeedOutlined  } from '@mui/icons-material';
import './CurrentWeather.css'
import ContentWrapper from '../ContentWrapper/ContentWrapper'

/**
 * Funkcja odpowiedzialna za pobieranie danych o pogodzie z podanego adresu url
 * @param {*} url - Adres URL z którego pobieramy dane
 * @param {*} setData - Funkcja która ustawia dane w stanie
 */
const fetchWeatherData = async (url, setData) => {

  const dummyData = {
    error: true,
		weather: [
			{
				id: 800,
				main: 'Czyste niebo',
			},
		],
		name: 'Błędne miasto!',
		main: {
			feels_like: 0,
			humidity: 50,
			pressure: 1000,
			temp: 0,
			temp_max: 10,
			temp_min: -10,
		},
  }

	await fetch(url)
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
			setData(dummyData)
			console.error(
				'There has been a problem with your fetch operation:',
				error
			)
		})
}

const CurrentWeather = () => {
   
   const [data, setData] = useState({}) 
   const [currentCity, setCurrentCity] = useState('')

   useEffect(() => {
 
		const CURRENT_WEATHER_URL = `${Utils.API_PREFIX}/${Utils.CURRENT_WEATHER_API_PATH}`

		fetchWeatherData(CURRENT_WEATHER_URL, setData)

    setCurrentCity(data.name ?? 'Warszawa') //Inicjalizowanie domyślnej lokalizacji
	}, [])


  const getIconName = (weatherId) => {
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

  const handleKeyDown = (e) => {

    if (e.key === 'Enter') {
      const CURRENT_WEATHER_WITH_QUERY_PARAM = `${Utils.API_PREFIX}/${Utils.CURRENT_WEATHER_API_PATH}?q=${currentCity}`

      fetchWeatherData(CURRENT_WEATHER_WITH_QUERY_PARAM, setData)
    }
  }

  if(data.error){
    return null
  }

   return(
    <ContentWrapper>
       <div className='current-weather-header'>
          <p>Obecnie w </p> 
          <AutoGrowInput value={currentCity} onChange={setCurrentCity} handleKeyDown={e => handleKeyDown(e)}/>
         <p> jest: </p>
       </div>
       <div className='current-weather-icon'>
         <Icons name={getIconName(data?.weather?.[0]?.id)} />
       </div>
       <div className='current-weather-temp'>
         <Typography variant='h1'>{Math.round( data.main?.temp, 0)}°C</Typography>
         <Typography variant='h6'>
           {Math.round(data?.main?.temp_max, 0)} ° / {Math.round(data?.main?.temp_min,0)} °
          </Typography>
       </div>
       <div className='current-weather-info'>
         <ul className='current-weather-info-list'>
            <li className='current-weather-list-item'>
              <Tooltip title='Temperatura odczuwalna' >
                    <DeviceThermostatOutlined style={{fontSize: 60,  color: '#576574'}}/>
              </Tooltip>
              <Typography style={{fontSize: 30, textAlign: 'right'}}>
                {Math.round(data?.main?.feels_like,0)}°C 
              </Typography>
            </li>
           <li className='current-weather-list-item'>
            <Tooltip title='Prędkość wiatru' >
                <Air style={{fontSize: 55,color: '#576574'}}/>
            </Tooltip>
             <Typography style={{fontSize: 30, textAlign: 'right'}}>
                {Math.round(data?.wind?.speed, 0)}m/s
             </Typography>
           </li>
           
           <li className='current-weather-list-item'>
            <Tooltip title='Wilgotność' >
                <Egg style={{fontSize: 55,color: '#576574'}}/>
            </Tooltip>
             <Typography style={{fontSize: 30, textAlign: 'right'}}>
                {Math.round(data?.main?.humidity, 0)}%
             </Typography>
           </li>

           <li className='current-weather-list-item'>
            <Tooltip title='Ciśnienie atmosferyczne' >
                <SpeedOutlined style={{fontSize: 55,color: '#576574'}}/>
            </Tooltip>
             <Typography style={{fontSize: 30, textAlign: 'right'}}>
                {Math.round(data?.main?.pressure, 0)}hPa
             </Typography>
           </li>
         </ul>
       </div>
       {/* <div className='current-weather-additional-info'>additional</div> */}
    </ContentWrapper>
   )
}

export default CurrentWeather
