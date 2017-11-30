import React from 'react';

export class Forecast extends React.Component{
    constructor(props){
        super(props);
        this.displayInfo = this.displayInfo.bind(this);
        this.changeDisplayedItems = this.changeDisplayedItems.bind(this);
        this.state = {
            dispalayItemsFromTo:[],
            displayItems:[]
        }
    }
    displayInfo(weatherInfo,displayFromTo) {
        let {displayItems} = this.state;
        this.setState({
            displayItems:[]
        })
            displayItems = weatherInfo.list.filter((item, idx) => {
                return idx < displayFromTo[1] && idx >= displayFromTo[0];
                    }).map((item,idx) =>{
                        const weekDays = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                        return [
                                <td key={idx}>{weekDays[new Date(item.dt_txt.slice(0,10)).getDay()]}</td>,
                                <td key={idx}>{item.dt_txt.slice(0,10)}</td>,
                                <td key={idx}>{item.dt_txt.slice(11,19)}</td>,
                                <td key={idx}>{Math.round(item.main.temp - 273.85) + '°C'}</td>,
                                <td key={idx}>{item.main.humidity + '%'}</td>,
                                <td key={idx}>{Math.round(item.main.pressure) + ' hpa'}</td>,
                                <td key={idx}>{item.weather[0].description}</td>,
                                <td key={idx}><img src={'http://openweathermap.org/img/w/'+item.weather[0].icon+'.png'} /></td>,
                                <td key={idx}>{Math.round(item.wind.speed) + ' m/s'}</td>,
                                <td key={idx}><div className="dirArr" style={{transform:'rotate('+item.wind.deg+'deg)'}}></div></td>
                            ];
                });
            this.setState({
                    displayItems:displayItems[0].map((col, i) => displayItems.map(row => row[i]))   // rotating 2D array
            });
    }
    changeDisplayedItems(moveBack){
        let {displayItemsFromTo} = this.state;
            if(moveBack && displayItemsFromTo[0] > 0){
                displayItemsFromTo[0] -=5;
                displayItemsFromTo[1] -=5;
            }else if(!moveBack && displayItemsFromTo[1] < 40){
                displayItemsFromTo[0] +=5;
                displayItemsFromTo[1] +=5;
        }
        this.displayInfo(this.props.forecastData,displayItemsFromTo);
        this.setState({
            displayItemsFromTo:displayItemsFromTo
        })
    }

    componentWillMount(){
        this.setState({
            displayItemsFromTo:[0,5]
        })
    }
    componentDidMount(){
        this.displayInfo(this.props.forecastData,this.state.displayItemsFromTo);
    }
    // componentWillReceiveProps(nextProps){
    //     if(this.props.forecastData !== nextProps.forecastData){
    //         this.displayInfo(nextProps.forecastData);
    //     }
    // }
    componentWillUpdate(nextProps,nextState){
        if(this.props.forecastData !== nextProps.forecastData){
            this.displayInfo(nextProps.forecastData,this.state.displayItemsFromTo);
        }
    }
    

    render(){
        const weatherInfo = this.props.forecastData,
                rowNames = ['day','data','hour','temp','humidity','pressure','conditions','','wind',''],
                {displayItems} = this.state;
            
        //console.log(displayItems);
        return(
            <div>
                <h2 className="city">{weatherInfo.city.name + " , "  + weatherInfo.city.country}</h2>
                <div className="arrowContainer"><div className="arrow back getRight" onClick={() => this.changeDisplayedItems(true) }></div></div>
                <div className="arrowContainer"><div className="arrow forward" onClick={() => this.changeDisplayedItems(false) }></div></div>
                <div className="weatherData">
                    <div className="tableBox">
                        <table>
                            <tbody>
                                {displayItems.map((item,idx) =>{
                                    return <tr key={idx}><td key={'rowName'+idx} className="slidingCell">{rowNames[idx]}</td>{[...item]}</tr> 
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        )
    }
}

// if(rowNames[idx] === ''){
//     return <tr key={idx}><td>{rowNames[idx]}</td>{item.forEach((elem)=>{return <td><img src={'http://openweathermap.org/img/w/'+elem+'.png'} /></td>})}</tr>
// }else{