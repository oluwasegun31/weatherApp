const appBody = document.querySelector("body");
const temp = document.querySelector(".temperature");
const stateOutput = document.querySelector(".state");
const countryOutput = document.querySelector(".country");
const dateOutput = document.querySelector(".date");
const timeOutput = document.querySelector(".time");
const conditionTxt = document.querySelector(".weather-txt");
const icon = document.querySelector(".weather-icon");
const cloudOutput = document.querySelector(".cloud");
const humidityOutput = document.querySelector(".humidity");
const windSpeedOutput = document.querySelector(".wind-speed");
const windDirOutput = document.querySelector(".wind-dir");
const searchInput = document.querySelector(".search-field");
const btn = document.querySelector(".submit-btn");
const form = document.querySelector(".formInput");
const alertBox = document.querySelector(".alert");
const alertTxt = document.querySelector(".alert-txt");
const alertClose = document.querySelector(".close");

const dayTwo = document.querySelector(".d2");
const dateTwo = document.querySelector(".date2");
const iconTwo = document.querySelector(".icon2");
const txtTwo = document.querySelector(".ftxt2");
const minTempTwo = document.querySelector(".min-temp2");
const maxTempTwo = document.querySelector(".max-temp2");

const dayThree = document.querySelector(".d3");
const dateThree = document.querySelector(".date3");
const iconThree = document.querySelector(".icon3");
const txtThree = document.querySelector(".ftxt3");
const minTempThree = document.querySelector(".min-temp3");
const maxTempThree = document.querySelector(".max-temp3");

const dayFour = document.querySelector(".d4");
const dateFour = document.querySelector(".date4");
const iconFour = document.querySelector(".icon4");
const txtFour = document.querySelector(".ftxt4");
const minTempFour = document.querySelector(".min-temp4");
const maxTempFour = document.querySelector(".max-temp4");

const dayFive = document.querySelector(".d5");
const dateFive = document.querySelector(".date5");
const iconFive = document.querySelector(".icon5");
const txtFive = document.querySelector(".ftxt5");
const minTempFive = document.querySelector(".min-temp5");
const maxTempFive = document.querySelector(".max-temp5");

const daySix = document.querySelector(".d6");
const dateSix = document.querySelector(".date6");
const iconSix = document.querySelector(".icon6");
const txtSix = document.querySelector(".ftxt6");
const minTempSix = document.querySelector(".min-temp6");
const maxTempSix = document.querySelector(".max-temp6");

const daySeven = document.querySelector(".d7");
const dateSeven = document.querySelector(".date7");
const iconSeven = document.querySelector(".icon7");
const txtSeven = document.querySelector(".ftxt7");
const minTempSeven = document.querySelector(".min-temp7");
const maxTempSeven = document.querySelector(".max-temp7");

///setting the default search input 
let cityInput = "Abuja";
///Add a submit event to the form
form.addEventListener('submit', function(e){
    e.preventDefault();

    if(searchInput.value.length == 0){ //// to return error if the form field is empty
        alertBox.classList.add("show")
        alertBox.classList.add("showalert")
        alertBox.classList.remove("hide")
        alertTxt.innerHTML = "Input a valid country or state"
        setTimeout(() => {
            alertBox.classList.remove("show")
            alertBox.classList.add("hide")
        }, 4000);
    } else{
        ///let the city input be what is written on the form(search value)
        cityInput = searchInput.value;
        
        ///fetching the weather data
        fetchweatherData();

        //emptying the field after submiting
        searchInput.value = "";

        //adding a small animation to fade the background when searching
        appBody.style.opacity = "0.3";
    }
})

////a function to call the day of the week
function dayoftheWeek(day, month, year){
    const weekDay = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
    ];
    return weekDay[new Date(`${day}/${month}/${year}`).getDay()];
}

//////Function that fetches and displays the data from the weather API
function fetchweatherData(){
    /// fetching the data and adding the city dynamically
    fetch(`http://api.weatherapi.com/v1/forecast.json?key=256e7351171047dd90a100909220610&q=${cityInput}&days=7&aqi=no&alerts=no`)

    //converting the data from a json object to a regular js object
    .then(response=> response.json())
    .then(data =>{
        console.log(data)

        ///adding the temperature and weather text
        temp.innerHTML = `${data.current.temp_c}&#176;`;
        conditionTxt.innerHTML = `${data.current.condition.text}`;

        ///getting date and time from the data
        let date = data.location.localtime;
        
        const d = parseInt(date.substr(8, 2));
        function getZero(num){
            return num < 10 ? `0${num}` : num
        }
        const m = parseInt(date.substr(5, 2));
        const y = parseInt(date.substr(0, 4));
        const time = date.substr(11);

        ///adding the time and date tothe page
        timeOutput.innerHTML = time;
        dateOutput.innerHTML = `${dayoftheWeek(m, d, y)} - ${getZero(d)} ${m}, ${y}`
        //getting and adding country and state
        stateOutput.innerHTML = data.location.name;
        countryOutput.innerHTML = data.location.country

        ///getting the weather details for today
        cloudOutput.innerHTML = `${data.current.cloud}%`
        humidityOutput.innerHTML = `${data.current.humidity}%`
        windSpeedOutput.innerHTML = `${data.current.wind_kph}km/h`
        windDirOutput.innerHTML = `${data.current.wind_dir}`

        ///getting the corresponding icon
        const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length)
        icon.src = `./icons/${iconId}`

        ///setting for day and night
        let timeDay = "day"
        if(!data.current.is_day){
            timeDay = "night"
        }

        ///to get the unique code for each type of weather
        let code = data.current.condition.code
        ///setting conditions for each type of weather

        if(code === 100){ //// conditions for clear weather
            appBody.style.backgroundImage = `url(./img/${timeDay}/clear.jpg)`
            btn.style.background = "#cc8502"
            if(timeDay == "night"){
                btn.style.background = "#f8b68a"
            }
        }
        else if ( ////// conditions for cloudy weather
            code == 1003 ||
            code == 1006 ||
            code == 1009 ||
            code == 1030 ||
            code == 1069 ||
            code == 1087 ||
            code == 1135 ||
            code == 1273 ||
            code == 1276 ||
            code == 1279 ||
            code == 1282 
        ){
            appBody.style.backgroundImage = `url(./img/${timeDay}/cloudy.jpg)`
            btn.style.background = "#9e592b"
            if(timeDay == "night"){
                btn.style.background = "#6d4702"
            }
        }
        else if( ////// conditions for rainy weather
            code == 1063 ||
            code == 1069 ||
            code == 1072 ||
            code == 1150 ||
            code == 1153 ||
            code == 1180 ||
            code == 1183 ||
            code == 1186 ||
            code == 1189 ||
            code == 1192 ||
            code == 1195 || 
            code == 1204 || 
            code == 1207 || 
            code == 1240 || 
            code == 1243 || 
            code == 1246 || 
            code == 1249 || 
            code == 1252 
        ) {
            appBody.style.backgroundImage = `url(./img/${timeDay}/rainy.jpg)`
            btn.style.background = "#f8b68a"
            if(timeDay == "night"){
                btn.style.background = "#cc8502"
            }
        }
        else{ ///// for snow weather
            appBody.style.backgroundImage = `url(./img/${timeDay}/snowy.jpg)`
            btn.style.background = "#f8b68a"
            if(timeDay == "night"){
                btn.style.background = "#cc8502"
            }
        }

        //// forecast for day 2
        const forecastDateTwo = data.forecast.forecastday[1].date
        const d2 = parseInt(forecastDateTwo.substr(8, 2));
        const m2 = parseInt(forecastDateTwo.substr(5, 2));
        const y2 = parseInt(forecastDateTwo.substr(0, 4));
        dayTwo.innerHTML = dayoftheWeek(m2, d2, y2);
        dateTwo.innerHTML = `${getZero(d2)}/${m2}`;
        const iconId2 = data.forecast.forecastday[1].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        iconTwo.src = `./icons/${iconId2}`;
        txtTwo.innerHTML = data.forecast.forecastday[1].day.condition.text;
        minTempTwo.innerHTML = `${data.forecast.forecastday[1].day.mintemp_c}&#176;`;
        maxTempTwo.innerHTML = `${data.forecast.forecastday[1].day.maxtemp_c}&#176;`;

        //// forecast for day 3
        const forecastDateThree = data.forecast.forecastday[2].date
        const d3 = parseInt(forecastDateThree.substr(8, 2));
        const m3 = parseInt(forecastDateThree.substr(5, 2));
        const y3 = parseInt(forecastDateThree.substr(0, 4));
        dayThree.innerHTML = dayoftheWeek(m3, d3, y3);
        dateThree.innerHTML = `${getZero(d3)}/${m3}`;
        const iconId3 = data.forecast.forecastday[2].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        iconThree.src = `./icons/${iconId3}`;
        txtThree.innerHTML = data.forecast.forecastday[2].day.condition.text;
        minTempThree.innerHTML = `${data.forecast.forecastday[2].day.mintemp_c}&#176;`;
        maxTempThree.innerHTML = `${data.forecast.forecastday[2].day.maxtemp_c}&#176;`;

        //// forecast for day 4
        const forecastDateFour = data.forecast.forecastday[3].date
        const d4 = parseInt(forecastDateFour.substr(8, 2));
        const m4 = parseInt(forecastDateFour.substr(5, 2));
        const y4 = parseInt(forecastDateFour.substr(0, 4));
        dayFour.innerHTML = dayoftheWeek(m4, d4, y4);
        dateFour.innerHTML = `${getZero(d4)}/${m4}`;
        const iconId4 = data.forecast.forecastday[3].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        iconFour.src = `./icons/${iconId4}`;
        txtFour.innerHTML = data.forecast.forecastday[3].day.condition.text;
        minTempFour.innerHTML = `${data.forecast.forecastday[3].day.mintemp_c}&#176;`;
        maxTempFour.innerHTML = `${data.forecast.forecastday[3].day.maxtemp_c}&#176;`;

        //// forecast for day 5
        const forecastDateFive = data.forecast.forecastday[4].date
        const d5 = parseInt(forecastDateFive.substr(8, 2));
        const m5 = parseInt(forecastDateFive.substr(5, 2));
        const y5 = parseInt(forecastDateFive.substr(0, 4));
        dayFive.innerHTML = dayoftheWeek(m5, d5, y5);
        dateFive.innerHTML = `${getZero(d5)}/${m5}`;
        const iconId5 = data.forecast.forecastday[4].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        iconFive.src = `./icons/${iconId5}`;
        txtFive.innerHTML = data.forecast.forecastday[4].day.condition.text;
        minTempFive.innerHTML = `${data.forecast.forecastday[4].day.mintemp_c}&#176;`
        maxTempFive.innerHTML = `${data.forecast.forecastday[4].day.maxtemp_c}&#176;`

        //// forecast for day 6
        const forecastDateSix = data.forecast.forecastday[5].date
        const d6 = parseInt(forecastDateSix.substr(8, 2));
        const m6 = parseInt(forecastDateSix.substr(5, 2));
        const y6 = parseInt(forecastDateSix.substr(0, 4));
        daySix.innerHTML = dayoftheWeek(m6, d6, y6);
        dateSix.innerHTML = `${getZero(d6)}/${m6}`;
        const iconId6 = data.forecast.forecastday[5].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        iconSix.src = `./icons/${iconId6}`;
        txtSix.innerHTML = data.forecast.forecastday[5].day.condition.text;
        minTempSix.innerHTML = `${data.forecast.forecastday[5].day.mintemp_c}&#176;`;
        maxTempSix.innerHTML = `${data.forecast.forecastday[5].day.maxtemp_c}&#176;`;

        //// forecast for day 7
        const forecastDateSeven = data.forecast.forecastday[6].date
        const d7 = parseInt(forecastDateSeven.substr(8, 2));
        const m7 = parseInt(forecastDateSeven.substr(5, 2));
        const y7 = parseInt(forecastDateSeven.substr(0, 4));
        daySeven.innerHTML = dayoftheWeek(m7, d7, y7);
        dateSeven.innerHTML = `${getZero(d6)}/${m6}`;
        const iconId7 = data.forecast.forecastday[6].day.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
        iconSeven.src = `./icons/${iconId7}`;
        txtSeven.innerHTML = data.forecast.forecastday[6].day.condition.text;
        minTempSeven.innerHTML = `${data.forecast.forecastday[6].day.mintemp_c}&#176;`;
        maxTempSeven.innerHTML = `${data.forecast.forecastday[6].day.maxtemp_c}&#176;`;

        /// to make the body visible after search
        appBody.style.opacity = "1"
    })
    /// to throw error if city dont exist
    .catch(()=>{
        alertBox.classList.add("show")
        alertBox.classList.add("showalert")
        alertBox.classList.remove("hide")
        alertTxt.innerHTML = "City cannot be found"
        setTimeout(() => {
            alertBox.classList.remove("show")
            alertBox.classList.add("hide")
        }, 4000);
        /// to make the body visible after error
        appBody.style.opacity = "1"
    })
}
fetchweatherData()
///calling the function when page loads and making the bg visible
/// to make the body visible after search
appBody.style.opacity = "1"

//// to close the alert message
alertClose.addEventListener('click', function(){
    alertBox.classList.remove("show")
    alertBox.classList.add("hide")
})
