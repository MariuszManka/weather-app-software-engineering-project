import React from 'react'
import './AutoGrowInput.css'

const AutoGrowInput = ({ value, onChange, handleKeyDown }) => {
  
   return (
     <div
       className="auto-grow-input-wrapper"
       style={{
         display: 'inline-grid',
         alignItems: 'center',
         justifyItems: 'start',
         padding: 8,
         border: '1px solid #ccc',
         borderRadius: 4,
       }}
     >
       <input
         className='auto-grow-input-input' 
         value={value}
         onChange={(event) => onChange(event.target.value)}
         style={{
           gridArea: '1 / 1 / 2 / 2',
           width: '100%',
           padding: 0,
           border: 'none',
         }}
         onKeyDown={handleKeyDown}
       />
       <span
         style={{
           gridArea: '1 / 1 / 2 / 2',
           visibility: 'hidden',
         }}
       >
         {value}
       </span>
     </div>
   )
 }

 export default AutoGrowInput