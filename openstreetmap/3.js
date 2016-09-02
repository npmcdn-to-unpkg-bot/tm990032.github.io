var getQueryParams = function() {
    var queryParams = {};
    var values = location.search.substring(1).split('&');
    _.each(values, function(value) {
        var keyValue = value.split('=');
        queryParams[keyValue[0]] = keyValue[1];
    });
    return queryParams;
};

var initMap = function() {
    var queryParams = getQueryParams();
    var latLng = {lat: queryParams["lat"], lng: queryParams["lng"]}
    var title = queryParams["title"];

    var map = L.map('map');
    map.setView(latLng, 16);

    var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    tileLayer.addTo(map);

    var marker = L.marker(latLng);
    marker.addTo(map);
    if (title) {
        title = '<center>' + decodeURI(title) + '</center>';
        marker.bindPopup(title, {
            closeButton: false
        });
        marker.openPopup();
    }
};
