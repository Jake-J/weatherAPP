import React from 'react';
import dirArrow from '../dirArrow.png'

export class  CurrentWeather extends React.Component{
    constructor(props){
        super(props);
    }
    hhmmss(unix_timestamp){
        const date = new Date(unix_timestamp*1000),
                hours = date.getHours(),
                minutes = "0" + date.getMinutes(),
                seconds = "0" + date.getSeconds();
                                    
        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
    render(){
        const currentWeather = this.props.weatherData,
          weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],
          weatherDate = new Date(currentWeather.dt * 1000);
        return(
            <div className="current-weather">
                <div className="weather-box-top">
                    <img src={'https://openweathermap.org/img/w/'+currentWeather.weather[0].icon+'.png'} alt="weather icon" className="weather-icon"/> 
                    <div className="top-right-section">
                        <span className="weather-date">{weatherDate.toISOString().slice(0,10).replace(/-/g,".") + ' , ' + weekDays[weatherDate.getDay()] }</span>
                        <span className="weather-day">{currentWeather.name}</span>
                    </div>
                </div>          
                <div className="weather-box-bottom">
                    <div className="weather-box-left bottom-item">
                        <span className="left-bottom-item"><strong>temperature: </strong> {Math.round(currentWeather.main.temp - 273.85) + '°C'}</span>
                        <span className="left-bottom-item"><strong>humidity: </strong> {currentWeather.main.humidity + '%'}</span>
                        <span className="left-bottom-item"><strong>pressure: </strong> {currentWeather.main.pressure + 'hpa'}</span>
                    </div>
                    <div className="weather-box-mid bottom-item">
                            <strong>wind</strong> 
                            <img src={dirArrow} alt="Direction pointer" className="direction-arrow" style={{transform:'rotate('+currentWeather.wind.deg+'deg)'}}/>
                            <span>{currentWeather.wind.speed + ' m/s'}</span>
                    </div>
                    <div className="weather-box-right bottom-item">
                        <span className="right-bottom-item"><strong>sunset:</strong> {this.hhmmss(currentWeather.sys.sunset)}</span>
                        <span className="right-bottom-item"><strong>sunrise:</strong> {this.hhmmss(currentWeather.sys.sunrise)}</span>
                    </div>
                </div>
            </div> 
        )
    }
} 
