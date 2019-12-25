window.addEventListener('load',()=>{
    let long;
    let lat;
    let temperatureDescription=document.querySelector(".temperature-description");
    let temperatureDegree=document.querySelector(".temperature-degree");
    let locationTimezone=document.querySelector(".location-timezone");
    let humidityy=document.querySelector(".humidity-d");
    let windSpeedd=document.querySelector(".windspeed");


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
           long = position.coords.longitude;
           lat = position.coords.latitude;
           
           const proxy = "https://cors-anywhere.herokuapp.com/";
           const api=`${proxy}https://api.darksky.net/forecast/01acb55b5a0c8f2401c1602c25d7a9ad/${lat},${long}?units=ca`;

           fetch(api)
            .then(Response => {
               return Response.json();
           })
           .then(data => {
               const {temperature, summary, icon, humidity, windSpeed}  =data.currently; 


               temperatureDegree.textContent = temperature;
               temperatureDescription.textContent = summary;
               locationTimezone.textContent = data.timezone;
               humidityy.textContent = humidity;
               windSpeedd.textContent = windSpeed;
               setIcons(icon, document.querySelector(".icon"));
           });
        });
    }

    function setIcons(icon,iconID) {
        var skycons = new Skycons({ "color": "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
});