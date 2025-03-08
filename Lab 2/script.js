function getCityData() {
    let inputCity = document.getElementById("input").value.trim();
    fetch("sample.json")
    .then(response => response.json())
    .then(data => {
        let cityData = data.find(city => city.cityName.toLowerCase() === inputCity.toLowerCase());
        if (cityData) {
            let cityName = cityData.cityName;
            let temperatureCelsius = cityData.temperatureCelsius;
            let humidity = cityData.humidity * 100;
            let uvIndex = cityData.uvIndex;
            let windSpeed = cityData.windSpeed;
            
            localStorage.setItem("humidity", humidity);
            localStorage.setItem("cityName", cityName);
            localStorage.setItem("temperatureCelsius", temperatureCelsius);
            localStorage.setItem("uvIndex", uvIndex);
            localStorage.setItem("windSpeed", windSpeed);

            document.getElementById("output").innerHTML = "Found city!";
        } else {
            document.getElementById("output").innerHTML = "City not found!";
        }
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        document.getElementById("output").innerHTML = "Error fetching data!";
    });
}
let inF=false;
function TemperatureChange(){
    let tempElement = document.getElementById("TempOutput");
    let temperatureCelsius = localStorage.getItem("temperatureCelsius"); 
    if (!temperatureCelsius) {
        tempElement.innerHTML = "No temperature data available.";
        return;
    }
    if (!inF) {
        let temperatureFahrenheit = (Number(temperatureCelsius) * 1.8) + 32;
        tempElement.innerHTML = `Temperature: ${temperatureFahrenheit.toFixed(1)}°F`;
    } else {
        tempElement.innerHTML = `Temperature: ${temperatureCelsius}°C`;
    }
    inF = !inF;
}