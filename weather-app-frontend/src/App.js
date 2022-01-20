// import './App.css';
// import CurrentWeather from './components/currentWeather/CurrentWeather'
// import { Tabs, Tab, TabsContext } from '@mui/material'
// import { useState } from 'react'
// import { Utils } from './Utlis'

// const TabPanel = ({  name, children,  ...others }) =>  {
//   // const { children, value, index, ...other } = props;

//   return (
//     <div
//       role="tabpanel"
//       id={`full-width-tabpanel-${name}`}
//       aria-labelledby={`full-width-tab-${name}`}
//       {...others}
//     >
//       {children}
//     </div>
//   );
// }

// const TabListContent = ({ allTabs, setCurrentTab }) => {
// 	return (
// 		<Tabs
// 			variant="scrollable"
// 			scrollButtons="auto"
// 			onChange={(e, tabName) => setCurrentTab(tabName)}
// 		>
//       {
//         allTabs.map((tab, index) => <Tab key={index} label={tab.label} value={tab.name} />)
//       }
// 		</Tabs>
// 	)
// }

// const TabPanelContent = ({ allTabs }) => {

//   return(
//     <>
//       <TabPanel name={allTabs[0].name} > 
//         <CurrentWeather />
//       </TabPanel>
//     </>
//   ) 
// }

// function App() {
//   const allTabs = Utils.TABS
//   const [currentTab, setCurrentTab] = useState(allTabs[0].name)

//   return (

//     <div className="App">
//       <TabsContext value={currentTab}>
//         <TabListContent allTabs={allTabs} setCurrentTab={setCurrentTab} />
//         <TabPanelContent allTabs={allTabs}/>
//       </TabsContext>
//       <CurrentWeather />
//     </div>
//   );
// }

// export default App;



import * as React from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import {AppBar, Tabs, Tab } from '@mui/material';

import CurrentWeather from './components/currentWeather/CurrentWeather'
import { Utils } from './Utlis'
import WeatherFromSensor from './components/WeatherFromSensor/WeatherFromSensor'
import WeatherForecast from './components/WeatherForecast/WeatherForecast'

const TabPanel = ({children, value, index, ...other }) => {

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
        {children}
    </div>
  );
}

const a11yProps = (name) => {
  return {
    id: `full-width-tab-${name}`,
    'aria-controls': `full-width-tabpanel-${name}`,
  }
}

const  App = () => {
  const allTabs = Utils.TABS
  const [value, setValue] = React.useState(allTabs[0].id)

  return (
		<>
			<AppBar position='static' style={{backgroundColor: '#1e272e'}}>
				<Tabs
					value={value}
					onChange={(e, newValue) => setValue(newValue)}
					textColor='inherit'
					variant='fullWidth'
					aria-label='AppBar'
          classes={{indicator: {height: '5px'}}}
				>
					<Tab value={allTabs[0].id} label={allTabs[0].label}	{...a11yProps(allTabs[0].name)}	/>
					<Tab value={allTabs[1].id} label={allTabs[1].label} {...a11yProps(allTabs[1].name)} />
					<Tab value={allTabs[2].id} label={allTabs[2].label} {...a11yProps(allTabs[2].name)} />
				</Tabs>
			</AppBar>
			<SwipeableViews index={value} onChangeIndex={index => setValue(index)}>
				<TabPanel value={value} index={0}>
					<CurrentWeather />
				</TabPanel>
				<TabPanel value={value} index={1}>
					<WeatherForecast />
				</TabPanel>
				<TabPanel value={value} index={2}>
					<WeatherFromSensor />
				</TabPanel>
			</SwipeableViews>
		</>
  )
}

export default App;

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
