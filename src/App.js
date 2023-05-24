import React, {useState} from 'react';

const api = {
  key: "fa324f3168d8f7727441bb10803c8d00",
  base: "https://api.openweathermap.org/data/2.5/"
}
let date = String(new window.Date())
date = date.slice(0,15)



function App() {
  const [query, setQuery] = useState('');
  const [weather, setWeather] = useState({});

  const search = evt =>{
    if(evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=imperial&appid=${api.key}`)
      .then(res=> res.json())
      .then(result => {
        setWeather(result);
        setQuery('');
        console.log(result)
      })
    }
  }

  

  return (
    <div className={(typeof weather.main != "undefined") ?((weather.main.temp > 16) ? 'app-warm' : 'app'):'app'}>
      <main>
        <div className="search-box">
          <input type="text"
           className="search-bar"
            placeholder="Search..."
            onChange={e => setQuery(e.target.value)}
            value={query}
            onKeyDown={search}
            />
        </div>
        {(typeof weather.main != "undefined") ? (
        <div>
          <div className="location-box">
            <div className="location">{weather.name}, {weather.sys.country}</div>
            <div className="date">{date}</div>
          </div>

          <div className="weather-box">
            <div className="temp">
              {Math.round(weather.main.temp)}&#0176;
            </div>
            <div className="weather">{weather.weather[0].main}</div>

          </div>
        </div>
        ) : ('')}
      </main>
      
    </div>
  );
}

export default App;
