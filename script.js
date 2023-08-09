const userTab = document.querySelector("[data-userWeather]");
const searchTab = document.querySelector("[data-searchWeather]");
const userContainer = document.querySelector(".weather-container");
const grantAccessContainer = document.querySelector(".grant-location-container");
// const = document.querySelctor("[data-grantAccess]");
const searchForm = document.querySelector("[data-searchForm]");
// const = document.querySelctor("[data-searchInput]");
// const = document.querySelector(".btn");
const loadingScreen = document.querySelector(".loading-container");
const userInfoContainer = document.querySelector(".user-info-container");

let oldTab = userTab;
const API_key = "bc97c65e669e2a4bc74d2a38776bc37d";
oldTab.classList.add("current-tab");
getfromSessionStorage();
function switchTab(newTab)
{
    if(newTab != oldTab)
    {
        oldTab.classList.remove("current-tab");
        oldTab = newTab;
        oldTab.classList.add("current-tab");

        if(!searchForm.classList.contains("active"))
        {
            userInfoContainer.classList.remove("active");
            grantAccessContainer.classList.remove("active");
            searchForm.classList.add("active");
        }
        else
        {
            searchForm.classList.remove("active");
            userInfoContainer.classList.remove("active");
            getfromSessionStorage();
        }
    }
}

function getfromSessionStorage()
{
    const localCoordinates = sessionStorage.getItem("user-coordinates");
    if(!localCoordinates)
    {
        grantAccessContainer.classList.add("active");

    }
    else
    {
        const coordinates = JSON.parse(localCoordinates);
        fetchUserWeatherInfo(coordinates);
    }

}

async function fetchUserWeatherInfo(coordinates)
{
    const {lat,lon} = coordinates;
    grantAccessContainer.classList.remove("active");
    loadingScreen.classList.add("active");

    try
    {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_key}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeather(data);
    }
    catch(err)
    {
        loadingScreen.classList.remove("active");
        //Home Work
    }
    
}


function renderWeather(weatherInfo)
{
    //let temp = `${data?.main?.temp.toFixed(2)} °C`;
    const cityName = document.querySelector("[data-cityName]");
    const countryIcon = document.querySelector("[data-countryIcon]");
    const desc = document.querySelector("[data-weatherDesc]");
    const weatherIcon = document.querySelector("[data-weatherIcon]");
    const temp = document.querySelector("[data-temp]");
    const windspeed = document.querySelector("[data-windspeed]");
    const humidity = document.querySelector("[data-humidity]");
    const cloudiness = document.querySelector("[data-cloudiness]");
    console.log(weatherInfo);
    //fetch values from weatherINfo object and put it UI elements
    cityName.innerText = weatherInfo?.name;
    countryIcon.src = `https://flagcdn.com/144x108/${weatherInfo?.sys?.country.toLowerCase()}.png`;
    desc.innerText = weatherInfo?.weather?.[0]?.description;
    weatherIcon.src = `https://openweathermap.org/img/w/${weatherInfo?.weather?.[0]?.icon}.png`;
    temp.innerText = weatherInfo?.main?.temp;
    windspeed.innerText = weatherInfo?.wind?.speed;
    humidity.innerText = weatherInfo?.main?.humidity;
    cloudiness.innerText = weatherInfo?.clouds?.all;
}


userTab.addEventListener("click",function() {
    switchTab(userTab);
});

searchTab.addEventListener("click",function()
{
    switchTab(searchTab);
});

function getLocation()
{
    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
        //work needed show an alert for no geolocation support available
    }
}

function showPosition(position)
{
    const userCoordinates = {
        lat: position.coords.latitude,
        lon: position.coords.longitude,
    };
    sessionStorage.setItem("user-coordinates",JSON.stringify(userCoordinates));
    fetchUserWeatherInfo(userCoordinates);
}
const grantAccessButton = document.querySelector("[data-grantAccess]");
grantAccessButton.addEventListener("click",getLocation);


let searchInput = document.querySelector("[data-searchInput]");
searchForm.addEventListener("submit",function(e) {
    e.preventDefault();
    let cityName = searchInput.value;
    if(cityName === "")
    {
        return;
    }
    else
    {
        fetchSearchWeatherInfo(cityName);
    }
});

async function fetchSearchWeatherInfo(city)
{
    loadingScreen.classList.add("active");
    userInfoContainer.classList.remove("active");
    grantAccessContainer.classList.remove("active");

    try
    {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
        const data = await response.json();
        loadingScreen.classList.remove("active");
        userInfoContainer.classList.add("active");
        renderWeather(data);
    }
    catch(err)
    {
        //work needed
    }
}













//const API_key = "bc97c65e669e2a4bc74d2a38776bc37d"
// async function weatherApi()
// {
//     try
//     {
//         let city = "kalyani";

//         const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`);
//         const data = await response.json();
    
//         console.log(data);
    
//         renderweather(data);
//     }
//     catch(err)
//     {
//         console.log("Error Occured" , err);
//     }
   
// }

// async function weatherApi_by_longitude_lat()
// {
//     let long;
//     let lat;
//     try{
//         if(navigator.geolocation)
//         {
//             navigator.geolocation.getCurrentPosition(showPosition);
//         }
//         else{

//         }
//     }
//     catch(error)
//     {
//         console.log("Error --> ",error);
//     }
// }

// async function showPosition(position)
// {
//     long = position.coords.longitude;
//     lat = position.coords.latitude;
//     const responsed = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_key}&units=metric`);
//     const dataweather = await responsed.json();
//     renderweather(dataweather);
// }
// function renderweather(data)
// {
//     let newPara = document.createElement('p');
//     newPara.textContent = `${data?.main?.temp.toFixed(2)} °C`;
//     document.body.appendChild(newPara);
// }
// //weatherApi();
// weatherApi_by_longitude_lat();