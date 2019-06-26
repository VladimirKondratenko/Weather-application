import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "4a320315d3e7555e8bf0008844c33333";

class App extends React.Component {

    state = {
      temp: '',
      cloudCover:'',
      city: '',
      country: '',
      pressure: '',
      sunset: '',
      error: ''
    }

    
    _gettingWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        
        if (!city) {
            this.setState({
                error: "Enter the name of the city!"
            })
            return;
        }

            const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
            const data = await api_url.json();
            var sunset = data.sys.sunset;
            var date = new Date();
            date.setTime(sunset);
            var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
            
            var temperature_data = data.main.temp;

           
            this.setState({
                temp: Math.round(temperature_data),
                cloudCover: data.weather[0].description,
                speed: data.wind.speed,
                city: data.name,
                country: data.sys.country,
                pressure: data.main.pressure,
                sunset: sunset_date,
                error: undefined 
            });
    };

    get gettingWeather() {
        return this._gettingWeather;
    }
    
    set gettingWeather(value) {
        this._gettingWeather = value;
    }

    render() {
        return ( 
        <div className="wrapper">
          <div className="main"> 
            <div className="container">
                <div className="row">
                    <div className="col-sm-5 info">
                      <Info />
                    </div>
                    <div className="col-sm-7 form">
                    <Form weatherMethod={this.gettingWeather} />
                    <Weather
                    temp ={this.state.temp}
                    cloudCover = {this.state.cloudCover}
                    speed = {this.state.speed}
                    city ={this.state.city}
                    country ={this.state.country}
                    pressure ={this.state.pressure}
                    sunset ={this.state.sunset}
                    error ={this.state.error}
                    />
                    </div>
               </div>      
            </div> 
            </div>
        </div>
        );
    }
}

export default App;
