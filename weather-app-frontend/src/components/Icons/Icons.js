import cloudy from '../../icons/cloudy-day.png'
import cold from '../../icons/cold.png'
import rain from '../../icons/rain.png'
import storm from '../../icons/storm.png'
import sun from '../../icons/sun.png'

import './Icons.css'
import 'animate.css';


const Icons = ({name, ...other}) => {

   const animateClass = 'icon animate__animated animate__pulse animate__infinite animate__slower' 

   switch(name){
      case 'cloudy':
         return <img className={animateClass} src={cloudy} alt='cloudy' {...other}/>
       case 'cold':
         return <img className={animateClass} src={cold} alt='cold' {...other}/>
       case 'rain':
          return <img className={animateClass} src={rain} alt='rain' {...other}/>    
       case 'storm':
          return <img className={animateClass} src={storm} alt='storm' {...other}/>
       case 'sun': 
         return <img className={animateClass} src={sun} alt='sun' {...other}/>
       default:
          return <img className={animateClass} src={cloudy} alt='cloudy' {...other}/> 
   }
}

export default Icons