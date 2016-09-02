var initMap = function() {
    var map = L.map('map');

    L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    var states = [
        {latLng: {lat: 35.70279930603541, lng: 139.7668550014496}, iconUrl: 'star_yellow.png'},
        {latLng: {lat: 35.70293870439578, lng: 139.76857161521914}, iconUrl: 'star_yellow.png'},
        {latLng: {lat: 35.70277316881592, lng: 139.7739145755768}, iconUrl: 'star_yellow.png'},
        {latLng: {lat: 35.70158827252454, lng: 139.7756955623627}, iconUrl: 'star_red.png'},
        {latLng: {lat: 35.699654065745676, lng: 139.7713932991028}, iconUrl: 'star_green.png'},
        {latLng: {lat: 35.699802182338225, lng: 139.76917243003848}, iconUrl: 'star_green.png'},
        {latLng: {lat: 35.70218943534453, lng: 139.76488089561465}, iconUrl: 'star_blue.png'},
        {latLng: {lat: 35.703051965385285, lng: 139.76357197761538}, iconUrl: 'star_blue.png'},

        {latLng: {lat: 35.70385350008514, lng: 139.781333565712}, iconUrl: 'star_red.png'},
        {latLng: {lat: 35.70410615609286, lng: 139.7777501344681}, iconUrl: 'star_red.png'},
        {latLng: {lat: 35.704245552168196, lng: 139.77579748630527}, iconUrl: 'star_red.png'},
        {latLng: {lat: 35.70663267213164, lng: 139.77604424953464}, iconUrl: 'star_red.png'},
        {latLng: {lat: 35.70724250883458, lng: 139.77997100353244}, iconUrl: 'star_red.png'},
        {latLng: {lat: 35.70615351145029, lng: 139.7817841768265}, iconUrl: 'star_red.png'}
    ];
    _.each(states, function(x) {
        var icon = L.icon({
            iconUrl: x.iconUrl,
            iconSize: [36, 36],
            iconAnchor: [18, 18],
            className: 'drop-shadow'
        });
        var marker = L.marker(x.latLng, {icon: icon});
        marker.addTo(map);
    });

    var latLngs = [
        {lat: 35.70531715135797, lng: 139.78164470195773},
        {lat: 35.70385350008514, lng: 139.781333565712},
        {lat: 35.70397547205089, lng: 139.77961695194247},
        {lat: 35.70410615609286, lng: 139.7777501344681},
        {lat: 35.704245552168196, lng: 139.77579748630527},
        {lat: 35.70558722693049, lng: 139.77592623233798},
        {lat: 35.70663267213164, lng: 139.77604424953464},
        {lat: 35.70764325612718, lng: 139.77614080905917},
        {lat: 35.70747773031577, lng: 139.77808272838595},
        {lat: 35.70724250883458, lng: 139.77997100353244},
        {lat: 35.707050846373726, lng: 139.78193438053134},
        {lat: 35.70615351145029, lng: 139.7817841768265},
        {lat: 35.70531715135797, lng: 139.78164470195773}
    ];
    var polyline = L.polyline(latLngs, {
        color: 'purple',
        opacity: 0.8,
        weight: 8
    });
    polyline.addTo(map);

    map.setView({lat: 35.70385350008514, lng: 139.7717151641846}, 16);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var marker = L.marker({lat: position.coords.latitude, lng: position.coords.longitude});
                marker.addTo(map);
            }
        );
    }
};
