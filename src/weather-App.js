import {WatherApi} from './apiCallweather'
import { useEffect, useState } from 'react';


//ALL APP COMPONENT
const WeatherApp = ()=>{
    const [coordinates, setCoordinates] = useState('');
    const [location, setLocation] = useState([]);
    const [current, setCurrent] = useState([]);
    const [src, setSrc] = useState(''); const [textImg, setTextImg] = useState('');
    const [viewAditionalInfo, setViewAditionalInf] = useState({display: 'none'});
    const [showfirsBtn, setShowFirstBtn] = useState({display: 'flex'});
    const [showSecondBtn, setShowSecondtBtn] = useState({display: 'none'});
  
    navigator.geolocation.getCurrentPosition((position) => {
      setCoordinates(`${position.coords.latitude},${position.coords.longitude}`)});
  
    useEffect (
      ()=>{
        const accesInfo = async ()=>{
          if(coordinates){
            const a = await WatherApi(coordinates);
            setLocation(a.location);
            setCurrent(a.current);
            setSrc(a.current.condition.icon);
            setTextImg(a.current.condition.text)
          }
        }
        accesInfo();
      }, [coordinates]
    )

    return (
        <div className='allApp'>
          <span style={{width: '100%', display:'flex', justifyContent:'center', alignItems:'center'}}>
          <div className='logo-weather-fix'>
          <img className='App-logo' src='https://cdn.pixabay.com/photo/2016/03/31/18/14/icon-1294224_960_720.png' alt='logo'></img>
          </div>
          </span>
        <div className='Weather-App'>
            <div className='title-app'>
                <h1>Weather App</h1>
                <h3>Know your weather</h3>
            </div>
            <div className='current-location-style'>
                <div>{location.tz_id+' - '+location.name + ' - Time:  ' + location.localtime}</div>
                <div>{location.country + ' - ' + location.region }</div>
                <img src={src?src:'not'} alt={textImg?textImg:'not'}></img>
                <div>{`Cloud: ${current.cloud}%`}{` - Humidity: ${current.humidity}%`}</div>
                <div>{`Uv: ${current.uv} - `}{`Last Update:` + current.last_updated}</div>
                <div className='aditional-information' style={viewAditionalInfo}>
                    <div>
                    {`Pressure MB: ${current.pressure_mb}`}
                    </div> 
                    <div>
                    {`Feelslike C: ${current.feelslike_c}`}
                    </div>
                    <div>
                    {`Precip In:  ${current.precip_in}`}
                    </div>
            </div>
            <div className='btns-changes'>
                <button className='button-Show-more-info' style={showfirsBtn} onClick={()=>{setViewAditionalInf({display: 'flex'}); setShowFirstBtn({display: 'none'}); setShowSecondtBtn({display: 'flex'})}} >Show Aditional Information</button>
                <button className='button-Show-more' style={showSecondBtn} onClick={()=>{setViewAditionalInf({display: 'none'}); setShowFirstBtn({display: 'flex'}); setShowSecondtBtn({display: 'none'})}} >Hide Aditional Information</button>
            </div>
            </div>  
        </div>
    </div>
    )
}

export default WeatherApp