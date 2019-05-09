let long;
let lat;


window.addEventListener('load', () => {

    // check();
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {


            long = position.coords.longitude;
            lat = position.coords.latitude;


            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/f9189885109c5742435fe6d815ade327/${lat},${long}`
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    //set DOM elements from Api

                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //set Icon
                    setIcons(icon, document.querySelector('.icon'));
                });
        });


    } else {
        document.querySelector('.temperature-description').textContent = "geolocation not allowed"
    }
});

let setIcons = (icon, iconID) => {
    const skycons = new Skycons({ color: "white" });
    const currentIcon = icon.replace(/-/g, "_").toUpperCase();
    skycons.play();
    return skycons.set(iconID, Skycons[currentIcon]);
}