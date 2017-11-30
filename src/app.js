//css files
import normalize from './normalize.scss';
import styles from './app.scss';
import media from './media.scss'
//images
import spinner from './spinner.gif'
//main modules
import React from 'react';
import ReactDOM from 'react-dom';
import request from 'superagent';
//components
import {Forecast} from './components/Forecast';

class WeatherApp extends React.Component{
  constructor(props){
    super(props);
    this.setMessage = this.setMessage.bind(this);
    this.searchFor = this.searchFor.bind(this);
    this.setValidation = this.setValidation.bind(this);
    this.getCoords = this.getCoords.bind(this);
    this.state = {
      weatherInfo:null,
      validationMessage:null,
      isWaiting:false
    } 
  }
  setValidation(message){
    this.setState({
      validationMessage: message
    })
  }
  searchFor(e){
    e.preventDefault();

    let localization = this.textInput.value;
    if(localization === ''){
      this.setValidation('You need to enter localization');
    }else{
      this.setMessage("http://api.openweathermap.org/data/2.5/forecast?q="+localization+"&APPID=5dad892c8856fc14494adee97228a48f");
      this.textInput.value = '';
    }
    
  }
  getCoords(e){
    e.preventDefault();
    if(navigator.geolocation){
      this.setState({
        isWaiting:true
      })
      navigator.geolocation.getCurrentPosition((position) =>{
        const long = position.coords.longitude,
              lat = position.coords.latitude;
        this.setMessage('http://api.openweathermap.org/data/2.5/forecast?lat='+lat+'&lon='+long+"&APPID=5dad892c8856fc14494adee97228a48f");
      })
    }
  }
  setMessage(url){
    request
    .get(url)
    .set('accept', 'json')
    .end((err, res) => {
      const weatherData = JSON.parse(res.text); 
      if(weatherData.cod == 200){
        this.setState({
            weatherInfo:weatherData,
            validationMessage: null,
            isWaiting:false
          })
      }else if(weatherData.cod == 404){
        this.setState({
          validationMessage:"Given localization was not recognized."
        })
      }
    });
  }
  render(){
    const {weatherInfo,validationMessage,isWaiting} = this.state;
    return(
      <div className="wrapper">
        <div className="header">
            <h1>weatherCheck</h1>
        </div>
        <div className="content"> 
          {validationMessage && <div className="valMess">{validationMessage}</div>}
          <form onSubmit={this.searchFor} className="weatherForm">
            <div className="inputBox">
              <i className="locationIcon"/>
              <input type="text" placeholder="Location" ref={(input) => { this.textInput = input; }}/>
            </div>
            <button onClick={this.searchFor}>Check!</button>
            <button onClick={this.getCoords}>Find me!</button> 
          </form>
          {!weatherInfo && isWaiting && <div className="loading"><img src={spinner} /></div>}
          {weatherInfo && <Forecast forecastData={weatherInfo}/> }
        </div>

      </div>
    )
  }
}

ReactDOM.render(
  <WeatherApp/>,
  document.getElementById('root')
);
 
            // <ul>
            //     <li><p>{weatherInfo.weather['0'].description}</p></li>
            //     <li<img src={'http://openweathermap.org/img/w/'+weatherInfo.weather['0'].icon+'.png'} alt="weather icon" /></li>
            //     <li>temp: <span>{weatherInfo.main.temp}</span></li>
            //     <li>humidity:<span>{weatherInfo.main.humidity}</span></li>
            //     <li>pressure:<span>{weatherInfo.main.pressure}</span></li>
            //     <li>wind:<span>{weatherInfo.wind.speed}</span></li>
                
            //     {//dodac wind direction w postaci strzalki 
            //     }
            // </ul>
           // ,item.weather['0'].icon