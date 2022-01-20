import React, { useState } from 'react';
import { Utils } from '../../Utlis'
import ContentWrapper from '../ContentWrapper/ContentWrapper'
import {ComposedChart, XAxis,YAxis, Tooltip, Legend, CartesianGrid, Bar, Line } from 'recharts';
import isEmpty from 'lodash/isEmpty'
import moment from 'moment'
import './WeatherFromSensor.css'
import { Typography } from '@mui/material'


const ws = new WebSocket(Utils.WEBSOCKET_BASED_URL);

const WeatherFromSensor = () => {
   const [data, setData] = useState([])
   const [currentSensorState, setCurrentSensorState] = useState({})

   ws.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      const newData = {
         time: moment(dataFromServer.dt_txt).format("HH:mm"),
         temp: dataFromServer.temp,
         humi: dataFromServer.humidity
      }
      setData([...data, newData])
      setCurrentSensorState({
         temp: dataFromServer.temp,
         humi: dataFromServer.humidity
      })
    };

   if(isEmpty(data)){
      return <Typography variant='h4'>Oczekiwanie na połącznie z serwerem...</Typography>
   }

   return (
		<>
			<div className='weather-from-sensor-heading'>
				<Typography style={{ whiteSpace: 'nowrap' }} variant='h3'>
					Odczyt temperatury z sensora:{' '}
				</Typography>
			</div>
			<div className='weather-from-sensor-wrapper'>
				<div className='weather-from-sensor-line-plot'>
					<ComposedChart width={1400} height={350} data={data}>
						<XAxis dataKey='time' />
						<YAxis
							yAxisId={1}
							orientation='right'
							label={{ value: 'Temperatura', angle: -90 }}
							domain={[0, 100]}
						/>
						<YAxis
							yAxisId={2}
							label={{ value: 'Wilgotność', angle: -90 }}
							domain={[0, 100]}
						/>
						<Tooltip />
						<Legend />
						<CartesianGrid stroke='#f5f5f5' />
						<Line
							yAxisId={1}
							type='monotone'
							dataKey='humi'
							stroke='#2e86de'
						/>
						<Line
							yAxisId={2}
							type='monotone'
							dataKey='temp'
							stroke='#ee5253'
						/>
					</ComposedChart>
				</div>
				<Typography className='weather-from-sensor-temp' variant='h4'>
					Aktualna temperatura: {`${currentSensorState.temp || ''}°C`}
				</Typography>
				<Typography className='weather-from-sensor-humi' variant='h4'>
					Aktualna wilgotność: {`${currentSensorState.humi || ''}%`}
				</Typography>
			</div>
		</>
	)
}

export default WeatherFromSensor