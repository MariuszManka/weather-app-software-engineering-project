import React from 'react';
import './ContentWrapper.css'

const ContentWrapper = ({ children }) => {
   return (
      <div className='current-weather-wrapper'>
         {children}
      </div>
   )
}

export default ContentWrapper