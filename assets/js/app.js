
const URL = '/tso-data-pb.json';

let data = await fetch(URL);
data = await data.json();
data = data.devices;
console.log(data);
    
// Call to DOM elements
let AdressTerm = document.getElementById('term-location');
let MyMap = document.getElementById('map');
let BtnAll = document.getElementById('btn-all');
let BtnNear = document.getElementById('btn-near');
let Terminals = []; // Array for adresses of terminals near 
let lat;
let lng;

// BEGIN
getLocation();

BtnAll.addEventListener('click', () => {
    OutputData(NearTerminals(NewArrayData(data)));
});

BtnNear.addEventListener('click', () => {
    let result = NearTerminals(NewArrayData(data));
    let sorted = Sort(result);
    OutputData(sorted);
})

// END

// Detecting Your Location
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(CurrentPosition);
    }
    return null;
};

// Create constructor
function Location(adress, place, latitude, longitude, meters) {
            this.adress = adress;
            this.place = place;
            this.latitude = latitude;
            this.longitude = longitude;
            this.meters = meters;  
}

function NewArrayData(Arr) {
        Arr = Arr.map(item => ({
            latitude: item.latitude,
            longitude: item.longitude,
            adressRu: item.fullAddressRu,
            city: item.cityRU,
            place: item.placeRu
        }));
    return Arr;
}

function CurrentPosition(position) {
    if (position) {
        lat = position.coords.latitude;
        lng = position.coords.longitude;

        var map;
        DG.then(function () {
            map = DG.map('Mymap', {
                center: [lat, lng],
                zoom: 30
            });
            DG.marker([lat, lng]).addTo(map).bindPopup('моё местоположение'); // added marker on map
        });
        console.log(`latitude ${lat}; longitude ${lng}`);
        return lat, lng;
    }

}
// Create Array of terminals list and distance from our place to them
function NearTerminals(data) {
    for (let item of data) {
        let nearest  = new Location(item.adressRu, item.place, item.longitude, item.latitude, distance(lat, lng, item.longitude, item.latitude));
        Terminals.push(nearest);
    };
    return Terminals;
}
// Function for converting degrees to radians
function deg2rad(num) {
    return num * Math.PI / 180;
}
// calculate the distance between two coordinates
function distance(lat_1, lon_1, lat_2, lon_2) {
	var radius_earth = 6371; // Радиус Земли
	var lat_1 = deg2rad(lat_1),
		lon_1 = deg2rad(lon_1),
		lat_2 = deg2rad(lat_2),
		lon_2 = deg2rad(lon_2);
    var d = 2 * radius_earth * Math.asin(Math.sqrt(Math.sin((lat_2 - lat_1) / 2) ** 2 + Math.cos(lat_1) * Math.cos(lat_2) * Math.sin((lon_2 - lon_1) / 2) ** 2));
	return d.toFixed(2) * 1000 +' м.';
};

function OutputData(a) {
    AdressTerm.innerHTML += a.map(item => `
            <div text-center mt-5">
                    <p><b>${item.adress}</b>,</p>
                    <p>${item.place}</p>,
                    <p>${item.meters}</p>
            </div>
            
        `).join('');
}




// Sort our lacations
function Sort(Arr) {
    let NotFarFrom = Arr.sort((a, b) => a.meters - b.meters);
        NotFarFrom.slice(0, 5);
    }
        




