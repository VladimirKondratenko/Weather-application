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

// function prompt(window, pref, message, callback) {
//     let branch = Components.classes["@mozilla.org/preferences-service;1"]
//                            .getService(Components.interfaces.nsIPrefBranch);

//     if (branch.getPrefType(pref) === branch.PREF_STRING) {
//         switch (branch.getCharPref(pref)) {
//         case "always":
//             return callback(true);
//         case "never":
//             return callback(false);
//         }
//     }

//     let done = false;

//     function remember(value, result) {
//         return function() {
//             done = true;
//             branch.setCharPref(pref, value);
//             callback(result);
//         }
//     }

//     let self = window.PopupNotifications.show(
//         window.gBrowser.selectedBrowser,
//         "geolocation",
//         message,
//         "geo-notification-icon",
//         {
//             label: "Share Location",
//             accessKey: "S",
//             callback: function(notification) {
//                 done = true;
//                 callback(true);
//             }
//         }, [
//             {
//                 label: "Always Share",
//                 accessKey: "A",
//                 callback: remember("always", true)
//             },
//             {
//                 label: "Never Share",
//                 accessKey: "N",
//                 callback: remember("never", false)
//             }
//         ], {
//             eventCallback: function(event) {
//                 if (event === "dismissed") {
//                     if (!done) callback(false);
//                     done = true;
//                     window.PopupNotifications.remove(self);
//                 }
//             },
//             persistWhileVisible: true
//         });
// }

// prompt(window,
//        "extensions.foo-addon.allowGeolocation",
//        "Foo Add-on wants to know your location.",
//        function callback(allowed) { alert(allowed); });




export default App;
