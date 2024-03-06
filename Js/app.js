// --- ELEMENTS ---
const CurrentWeatherBackground = document.querySelector(".weather__output-wrapper");
const HourlyWeatherCards = document.querySelector("#hourly__weather-container");
const DailyWeatherCards = document.querySelector("#daily__weather-container");
const CurrentWeatherIcon = document.querySelector(".current__weather-info");
const CurrentCountryName = document.querySelector("#current__country-name");
const CurrentDescription = document.querySelector("#current-description");
const CurrentVisibility = document.querySelector("#current-visibility");
const CurrentHumidity = document.querySelector("#current-humidity");
const WeatherInfoDay = document.querySelector("#weather__info-day");
const HumidityPoint = document.querySelector("#humidity-point");
const CurrentFeels = document.querySelector("#current-feels");
const SearchInput = document.querySelector("#search-input");
const CurrentDrop = document.querySelector("#current-drop");
const mapWrapper = document.querySelector(".map-wrapper");
const Form = document.querySelector("#search-form")
const map = document.querySelector("#map");


// IMAGES RANDOM ARRAYS
const CloudyImages = [
    'https://catherineasquithgallery.com/uploads/posts/2021-02/1612751479_207-p-goluboi-fon-s-oblakami-dlya-fotoshopa-254.jpg',
    'https://wp-s.ru/wallpapers/13/9/356138679766943/milye-oblaka-plyvut-po-nebu.jpg',
    'https://ak.picdn.net/shutterstock/videos/1056283103/thumb/1.jpg',
    'https://rare-gallery.com/uploads/posts/530407-steeple-plose.jpg',
    'https://i.pinimg.com/originals/71/17/33/7117333298dfc19b8d3fa01a4ae0938a.jpg'
    
]
const ClearImages = [
    'https://ink-project.ru/sites/1-ink-project/photoalbums/17901.jpg',
    'https://catherineasquithgallery.com/uploads/posts/2021-02/1612766467_199-p-goluboi-fon-dlya-foto-239.jpg',
    'https://pic.rutubelist.ru/user/90/46/9046a985684ad0e6c3beb00cc17b7596.jpg',
    'https://images.hdqwalls.com/download/sky-minimal-2m-3840x2160.jpg',
    'https://wpapers.ru/wallpapers/nature/14163/download/2560x1440_%D0%A1%D0%BE%D0%BB%D0%BD%D0%B5%D1%87%D0%BD%D0%B0%D1%8F-%D0%BF%D0%BE%D0%B3%D0%BE%D0%B4%D0%B0.jpg'
]
const SmokeImages = [
    'https://avatars.mds.yandex.net/i?id=c9cdc92cfabf1765a4ac62d0abc156e4_l-4966461-images-thumbs&ref=rim&n=13&w=1080&h=1131',
    'https://avatars.mds.yandex.net/i?id=da668686b370a43a29e0e5a32c1c28d3_l-4704243-images-thumbs&ref=rim&n=13&w=1080&h=720',
    'https://avatars.mds.yandex.net/i?id=993a9b7b2cb9b9a463efd4e6c1b306a2_l-4900601-images-thumbs&ref=rim&n=13&w=1080&h=1080'
]
const SnowImages = [
    'https://catherineasquithgallery.com/uploads/posts/2021-03/1614612528_4-p-fon-snega-dlya-fotoshopa-5.jpg',
    'https://catherineasquithgallery.com/uploads/posts/2021-02/1613265885_6-p-sinii-fon-so-snegom-7.jpg',
    'https://mir-s3-cdn-cf.behance.net/project_modules/1400/9b481488117677.5dcc715a9112e.jpg',
]

const MistImages = [
    'https://get.pxhere.com/photo/landscape-tree-nature-forest-grass-horizon-cloud-sky-fog-mist-field-meadow-sunlight-morning-hill-dawn-atmosphere-pasture-weather-haze-agriculture-plain-fog-bank-grassland-rural-area-atmospheric-phenomenon-atmosphere-of-earth-1051681.jpg',
    'https://wallpaper-house.com/data/out/8/wallpaper2you_253816.jpg',  
    'https://artbizu.ru/images/product_images/popup_images/7358_4.jpg'
]

const HazeImages = [
    'https://get.pxhere.com/photo/landscape-tree-nature-horizon-snow-cloud-fog-sunrise-mist-sunlight-morning-dawn-atmosphere-weather-haze-monochrome-mood-freezing-atmospheric-phenomenon-1207903.jpg',
    'https://get.pxhere.com/photo/nature-horizon-cloud-fog-sunrise-mist-sunlight-morning-wind-dawn-atmosphere-weather-haze-darkness-plain-freezing-drizzle-atmospheric-phenomenon-atmosphere-of-earth-109047.jpg',
    'https://get.pxhere.com/photo/tree-nature-horizon-cloud-fog-sunrise-mist-field-sunlight-morning-dawn-atmosphere-weather-haze-freezing-drizzle-atmospheric-phenomenon-atmosphere-of-earth-105738.jpg'
]

// RANDOM IMAGES FUNCTIONS
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
function RandomSnowImages() {
    var randomIndex = Math.floor(Math.random() * SnowImages.length)
    return SnowImages[randomIndex]
}
function RandomMistImages() {
    var randomIndex = Math.floor(Math.random() * MistImages.length)
    return MistImages[randomIndex]
}

function RandomHazeImages() {
    var randomIndex = Math.floor(Math.random() * HazeImages.length)
    return HazeImages[randomIndex]
}

// LOAD COUNTRY'S WEATHER 
document.addEventListener("DOMContentLoaded", Weatherdata)
Form.addEventListener('submit', Weatherdata)

async function Weatherdata(e) {
    e.preventDefault()
    try {
        let response = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${SearchInput.value ? SearchInput.value : "Tashkent"}&appid=9dd86907fe501cec50da3d087e4e9dc0`);
        let WeatherLocation = await response?.json()
        const Lat = WeatherLocation[0]?.lat
        const Lon = WeatherLocation[0]?.lon;
        console.log("lat", Lat, "lon", Lon);


        let res = await fetch(`https://api.openweathermap.org/data/2.8/onecall?lat=${Lat}&lon=${Lon}&exclude=minutely,alerts&appid=9dd86907fe501cec50da3d087e4e9dc0&units=metric&lang=ru`)
        let WeatherData = await res?.json()

        let iconResponse = await fetch(`https://openweathermap.org/img/wn/${WeatherData?.current?.weather[0]?.icon}@2x.png`)
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

    // --- Change background images depending on weather's climate ---
    if (WeatherData.current.weather[0].main === "Clouds") {
        document.body.style = `background-image: url(${RandomCloudyImages()})`
    }
    else if (WeatherData.current.weather[0].main === "Clear") {
        document.body.style = `background-image: url(${RandomClearImages()})`
    }
    else if (WeatherData.current.weather[0].main === "Smoke") {
        document.body.style = `background-image: url(${RandomSmokeImages()})`
    }
    else if (WeatherData.current.weather[0].main === "Snow") {
        document.body.style = `background-image: url(${RandomSnowImages()})`
    }
    else if (WeatherData.current.weather[0].main === "Mist") {
        document.body.style = `background-image: url(${RandomMistImages()})`
    }
    else if (WeatherData.current.weather[0].main === "Haze") {
        document.body.style = `background-image: url(${RandomHazeImages()})`
    }


    HourlyWeatherCards.innerHTML = ''
    DailyWeatherCards.innerHTML = ''
    CurrentWeatherIcon.innerHTML = `
    <h2>${WeatherData.current.temp + '°'}</h2>
    <img src=${weatherIcon.url}>
    `
    CurrentDrop.innerHTML = WeatherData.current.dew_point
    CurrentCountryName.innerHTML = WeatherLocation[0].name
    CurrentDescription.innerHTML = WeatherData.daily[0].summary
    CurrentFeels.innerHTML = WeatherData.current.feels_like + '°'
    CurrentHumidity.innerHTML = WeatherData.current.humidity + '%'
    WeatherInfoDay.innerHTML = WeatherData.current.weather[0].main
    CurrentVisibility.innerHTML = WeatherData.current.visibility + ' mi'
    HumidityPoint.innerHTML = `The dew point is ${WeatherData.current.dew_point} right now`
    map.src = `https://maps.google.com/maps?q=${WeatherLocation[0].name}%20Dates%10Products&amp;t=&amp;z=12&amp&output=embed`


    WeatherData.hourly.forEach(hour => {
        const hourData = new Date(hour.dt * 1000).getHours()
        const Div = document.createElement('div')
        Div.innerHTML = `
                <p> ${hourData + ':00'}</p>
                <h4>${hour.temp}°</h4>
                <img src=${weatherIcon.url}>
            `
        HourlyFragment.appendChild(Div)
        HourlyWeatherCards.appendChild(HourlyFragment)
    }
    );


    WeatherData.daily.forEach(daily => {
        console.log(daily.dt);
        const Div = document.createElement('div')
        Div.innerHTML = `
        <p>${identifyTheWeekDay(+new Date(daily.dt * 1000).getDay()).slice(0, 3)}</p>
        <h4>${daily.temp.day}°</h4>
        <img src=${weatherIcon.url}>
        `
        DailyFragment.appendChild(Div)
        DailyWeatherCards.appendChild(DailyFragment)
    })
}



function identifyTheWeekDay(week_day) {
    switch (week_day) {
        case 1: return "Monday";
        case 2: return "Tuesday";
        case 3: return "Wednesday";
        case 4: return "Thursday";
        case 5: return "Friday";
        case 6: return "Saturday"
        default: return "Sunday"
    }
}