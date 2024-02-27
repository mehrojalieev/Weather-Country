const Form = document.querySelector("#search-form")
const SearchInput = document.querySelector("#search-input")
const CurrentWeatherBackground = document.querySelector(".weather__output-wrapper")
const CurrentWeatherOutput = document.querySelector("#current__weather-output")
const WeatherInfoDay = document.querySelector("#weather__info-day")
const CurrentCountryName = document.querySelector("#current__country-name")
const CurrentWeatherIcon = document.querySelector("#current__weather-icon")
const CurrentDescription = document.querySelector("#current-description")
const CurrentFeels = document.querySelector("#current-feels")
const CurrentDrop = document.querySelector("#current-drop")
const CurrentVisibility = document.querySelector("#current-visibility")
const CurrentHumidity = document.querySelector("#current-humidity")
const HumidityPoint = document.querySelector("#humidity-point")

const HourlyWeatherCards = document.querySelector("#hourly__weather-container")
const DailyWeatherCards = document.querySelector("#daily__weather-container")
const UviIndex = document.querySelector(".uvi-index")


const API_KEY = "644f6ce0ca9e401ebb891832211707";



const CloudyImages = ['https://wp-s.ru/wallpapers/13/9/356138679766943/milye-oblaka-plyvut-po-nebu.jpg', 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612751479_207-p-goluboi-fon-s-oblakami-dlya-fotoshopa-254.jpg', 'https://ak.picdn.net/shutterstock/videos/1056283103/thumb/1.jpg']
const ClearImages = ['https://w.forfun.com/fetch/ac/acf0ba2588cdf5635ee80a045cf89b90.jpeg', 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612767398_123-p-fon-goluboe-nebo-163.jpg', 'https://images.hdqwalls.com/download/sky-minimal-2m-3840x2160.jpg', 'https://klike.net/uploads/posts/2023-04/1681702375_2-2.jpg']
const SmokeImages = ['https://avatars.mds.yandex.net/i?id=c9cdc92cfabf1765a4ac62d0abc156e4_l-4966461-images-thumbs&ref=rim&n=13&w=1080&h=1131', 'https://avatars.mds.yandex.net/i?id=da668686b370a43a29e0e5a32c1c28d3_l-4704243-images-thumbs&ref=rim&n=13&w=1080&h=720', 'https://avatars.mds.yandex.net/i?id=993a9b7b2cb9b9a463efd4e6c1b306a2_l-4900601-images-thumbs&ref=rim&n=13&w=1080&h=1080']

    function RandomCloudyImages() {
        var randomIndex = Math.floor(Math.random() * CloudyImages.length)
        return CloudyImages[randomIndex]
    }

    function RandomClearImages() {
        var randomIndex = Math.floor(Math.random() * ClearImages.length)
        return ClearImages[randomIndex]
    }
    function RandomSmokeImages() {
        var randomIndex = Math.floor(Math.random() * SmokeImages.length)
        return SmokeImages[randomIndex]
    }

    
    
    Form.addEventListener('submit', Weatherdata)
    
    async function Weatherdata(e) {
        e.preventDefault( )
    try {

        let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${SearchInput.value ? SearchInput.value : "Tashkent"}&appid=9dd86907fe501cec50da3d087e4e9dc0`);
        let WeatherLocation = await response.json()
        const  Lat = WeatherLocation[0]?.lat
        const Lon = WeatherLocation[0]?.lon;
        console.log("lat", Lat, "lon", Lon);


        let res = await fetch(`https://api.openweathermap.org/data/2.8/onecall?lat=${Lat}&lon=${Lon}&exclude=minutely,alerts&appid=9dd86907fe501cec50da3d087e4e9dc0&units=metric&lang=ru`)
        let WeatherData = await res.json()

        let iconResponse = await fetch(`https://openweathermap.org/img/wn/${WeatherData.current.weather[0].icon}@2x.png`)
        renderWeatherData(WeatherLocation, WeatherData, iconResponse)
    }
    catch (error) {
        console.log(error);
    }
    SearchInput.value = ''
}



function renderWeatherData(WeatherLocation, WeatherData, weatherIcon) {
    const HourlyFragment = document.createDocumentFragment()
    const DailyFragment = document.createDocumentFragment()

    console.log(WeatherData);

    CurrentCountryName.innerHTML = WeatherLocation[0].name
    CurrentWeatherOutput.innerHTML = WeatherData.current.temp+'°'
    WeatherInfoDay.innerHTML = WeatherData.current.weather[0].main
    if(WeatherData.current.weather[0].main === "Clouds"){
        CurrentWeatherBackground.style = `background-image: url(${RandomCloudyImages()})`
    }
    else if(WeatherData.current.weather[0].main === "Clear"){
        CurrentWeatherBackground.style = `background-image: url(${RandomClearImages()})`
    }
    else if(WeatherData.current.weather[0].main === "Smoke"){
        CurrentWeatherBackground.style = `background-image: url(${RandomSmokeImages()})`
    }
    CurrentWeatherIcon.src = weatherIcon.url
    CurrentDescription.innerHTML = WeatherData.daily[0].summary
    CurrentFeels.innerHTML = WeatherData.current.feels_like+'°'
    CurrentDrop.innerHTML = WeatherData.current.dew_point
    CurrentVisibility.innerHTML = WeatherData.current.visibility+' mi'
    CurrentHumidity.innerHTML = WeatherData.current.humidity+'%'
    UviIndex.innerHTML = WeatherData.current.uvi
    HumidityPoint.innerHTML = `The dew point is ${WeatherData.current.dew_point} right now`
    HourlyWeatherCards.innerHTML = ''  
    WeatherData.hourly.forEach(hour => {
        const hourData = new Date(hour.dt * 1000).getHours()
        
        const Div = document.createElement('div')
            Div.innerHTML = `
                <p> ${hourData+':00'}</p>
                <h4>${hour.temp}°</h4>
                <img src=${weatherIcon.url}>
            `   
            HourlyFragment.appendChild(Div)
            HourlyWeatherCards.appendChild(HourlyFragment)
    }
    );


    var weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    WeatherData.daily.forEach(daily => {
        const Div = document.createElement('div')
        var today = new Date()
        var dayOfWeek = today.getDay();
        var weekdayName = weekdays[dayOfWeek];
        console.log(weekdayName);
        Div.innerHTML = `
        <p>${weekdays.slice(0,3)}</p>
        <h4>${daily.temp.day}°</h4>
        <img src=${weatherIcon.url}>
        `
        DailyFragment.appendChild(Div)
        DailyWeatherCards.appendChild(DailyFragment)
    })
}

