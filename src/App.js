import React from "react";
import Info from "./components/info";
import Form from "./components/form";
import Weather from "./components/weather";

const API_KEY = "4a320315d3e7555e8bf0008844c33333";
const API_KEY2 ="984cb08a877e4030a49210225192606";

class App extends React.Component {

    state = {
      temp: '',
      cloudCover:'',
      city: '',
      country: '',
      pressure: '',
      sunrise: '',
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
            this.setState(
                await this.getWeatherFromOpenWratherMap(city)
            );
    };

    get gettingWeather() {
        return this._gettingWeather;
    }
    
    set gettingWeather(value) {
        this._gettingWeather = value;
    }

    async getWeatherFromOpenWratherMap(city) {
        const api_url = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`);
        const data = await api_url.json();

        var sunset = data.sys.sunset;
        var date = new Date();
        date.setTime(sunset);
        var sunset_date = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
        
        var temperature_data = data.main.temp;

       
        return{
            temp: Math.round(temperature_data),
            cloudCover: data.weather[0].description,
            speed: data.wind.speed,
            city: data.name,
            country: data.sys.country,
            pressure: data.main.pressure,
            sunrise: sunset_date,
            error: undefined 
        };
        
    }
     
    async getWeatherFromWorldWeatherOnline(city) {
        const api_url2 = await fetch(`https://api.worldweatheronline.com/premium/v1/weather.ashx?q=${city}&key=${API_KEY2}&date=today&format=json`);
        const data = await api_url2.json();
        console.log(data);
        console.log(data.data.current_condition);
        return {
            temp: data.data.current_condition[0].temp_C,
            cloudCover: data.data.current_condition[0].weatherDesc[0].value,
            speed: data.data.current_condition[0].windspeedKmph,
            city: data.data.request[0].query,
            // country: data.sys.country,
            pressure: data.data.current_condition[0].pressure,
            sunrise: data.data.weather[0].astronomy[0].sunrise,
            error: undefined 
        };
        
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
                    sunset ={this.state.sunrise} //sunset
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



// console.log(response);

export default App;
