const api_key = "97a75dd0b67f33988487b2faa41e6476";

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}


async function getWeatherData(){
    
    let city = document.getElementById("city").value
    let url = `api.openweathermap.org/data/2.5/forecast/daily?q=${city}&units=metric&cnt=7&appid=${api_key}`

    var res = await fetch(url)
    var data = await res.json();

    console.log(data);
    appendWeatherData(data);
}
function appendWeatherData(data){
    let weatherReport = document.getElementById('weather--report')
    var card = document.createElement('div');

    let cityName = document.createElement('h1');
    cityName.innerText = data.name;

    let minTemp = document.createElement('p');
    minTemp = "Min Temp : " +(Number(data.main.temp_min) - 273.15).toFixed(1) +'\u00B0'+"C";

    

    let maxTemp = document.createElement('p');
    maxTemp = "Max Temp : " +(Number(data.main.temp_max) - 273.15).toFixed(1)+"\u00B0"+"C";

    let windSpeed = document.createElement('p');
    windSpeed.innerText = "Wind Speed : "+data.wind.speed


    let windDeg = document.createElement('p');
    windDeg.innerText = "Wind Deg : "+data.wind.deg;


    card.append( minTemp, maxTemp, windSpeed, windDeg);



    let iframe = document.getElementById('gmap_canvas');
    iframe.src = `https://maps.google.com/maps?q=${data.name}&t=&z=11&ie=UTF8&iwloc=&output=embed`
    





    weatherReport.append(card, iframe);
}