import React from 'react';
import dirArrow from '../dirArrow.png';

export class  ForecastWeather extends React.Component{ 
    constructor(props){
        super(props)
        this.state = {
            weatherForecast: this.props.weatherData
        }
    }
    componentWillReceiveProps(nextProps){
        if(this.props.weatherData.city.name !== nextProps.weatherData.city.name){
            this.setState({
                weatherForecast:nextProps.weatherData
            })
        }
    }
    render(){
        const  weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const {weatherForecast} = this.state;
        return(
            weatherForecast.list.map((item,idx)=>{
                return (
                <div className="forecast-weather-box" key={idx}>
                    <div className="weather-box-top">
                        <img src={'https://openweathermap.org/img/w/'+item.weather[0].icon+'.png'} alt="weather icon" className="weather-icon"/> 
                        <div className="top-right-section">
                            <span className="weather-date">{item.dt_txt.slice(0,10) + '  '}<strong>{ weekDays[new Date(item.dt_txt.slice(0,10)).getDay()] }</strong></span>
                            <span className="weather-day">{item.dt_txt.slice(11,19) + ' ' +weatherForecast.city.name}</span>
                        </div>
                    </div>          
                    <div className="weather-box-bottom">
                        <div className="weather-box-left bottom-item">
                            <span className="left-bottom-item"><strong>temperature: </strong> {Math.round(item.main.temp - 273.85) + '°C'}</span>
                            <span className="left-bottom-item"><strong>humidity: </strong> {item.main.humidity + '%'}</span>
                            <span className="left-bottom-item"><strong>pressure: </strong> {Math.round(item.main.pressure) + 'hpa'}</span>
                        </div>
                        <div className="weather-box-mid bottom-item">
                                <strong>wind</strong> 
                                <img src={dirArrow} alt="Direction pointer" className="direction-arrow" style={{transform:'rotate('+item.wind.deg+'deg)'}}/>
                                <span>{item.wind.speed + ' m/s'}</span>
                        </div>
                    </div>
                </div>
                );
            })
            
        )
    }
}