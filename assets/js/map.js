var map;

DG.then(function () {
    map = DG.map('Mymap', {
        center: [35.04, 48.42],
        zoom: 11
    });
    
    DG.marker([35.04, 48.42]).addTo(map).bindPopup('место расположения');
});