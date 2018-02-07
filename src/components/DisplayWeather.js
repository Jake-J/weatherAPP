import React from 'react';
import request from 'superagent';

import {CurrentWeather}  from './CurrentWeather';
import {ForecastWeather} from './ForecastWeather';


export class DisplayWeather extends React.Component{
    constructor(props){
        super(props);
        this.changeDisplay = this.changeDisplay.bind(this);
        this.getForecast = this.getForecast.bind(this);
        this.state = {
            display:'current',
            weatherForecast:''
        }
    }
    changeDisplay(e){
        const changeTo = e.target.dataset.display;
        const {display} = this.state;
        if(display !== changeTo){
            this.setState({
                display:changeTo
            })
            document.getElementsByClassName('active')[0].classList.remove('active')
            e.target.classList.add('active')
        }
    }
    hhmmss(unix_timestamp){
        const date = new Date(unix_timestamp*1000),
              hours = date.getHours(),
              minutes = "0" + date.getMinutes(),
              seconds = "0" + date.getSeconds();
                                    
        return hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    }
    getForecast(url){
        request
        .get(url)
        .set('accept', 'json')
        .end((err, res) => {
          const weatherData = JSON.parse(res.text); 
          if(weatherData.cod == 200){
            this.setState({
                weatherForecast:weatherData
              })
          }else if(weatherData.cod == 404){
            this.setState({
                weatherForecast:"Given localization was not recognized."
            })
          }
        });
      }

    componentDidMount(){
        this.getForecast("https://api.openweathermap.org/data/2.5/forecast?q="+this.props.currentWeatherData.name+"&APPID=f48d3cfe3b7c249a8641cf7a9ee34ada")
    }
    componentWillReceiveProps(nextProps){
        if(this.props.currentWeatherData.name !== nextProps.currentWeatherData.name){
            this.getForecast("https://api.openweathermap.org/data/2.5/forecast?q="+nextProps.currentWeatherData.name+"&APPID=f48d3cfe3b7c249a8641cf7a9ee34ada")
        }
    }
    render(){
        const {display,weatherForecast} = this.state;
        return(
            <div className="weather-display">
                <div className="section-control">
                  <ul className="weather-nav">
                    <li className="active weather-section" onClick={this.changeDisplay} data-display="current">Current weather</li>
                    <li className="weather-section" onClick={this.changeDisplay} data-display="forecast">Weather forecast</li>
                  </ul>
                </div>
                {display === 'current' && <CurrentWeather weatherData={this.props.currentWeatherData}/>}
                {display === 'forecast' && weatherForecast && <ForecastWeather weatherData={weatherForecast} />}
            </div>
        )
    }
}