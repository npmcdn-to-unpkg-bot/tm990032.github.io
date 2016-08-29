var eachTimeout = function(iterable, func, interval, loop) {
    var fn = function(value) {
        func(value);
        var result = iterator.next();
        if (result.done && loop) {
            iterator = iterable[Symbol.iterator]();
            result = iterator.next();
        }
        if (!result.done) {
            setTimeout(function() {
                fn(result.value);
            }, interval);
        }
    };
    var iterator = iterable[Symbol.iterator]();
    var result = iterator.next();
    if (!result.done) {
        fn(result.value);
    }
};

var initMap = function() {
    L.Map = L.Map.extend({
        openPopup: function(popup) {
            // this.closePopup();  複数のポップアップを同時に表示したいのでコメントアウト
            this._popup = popup;
            return this.addLayer(popup).fire('popupopen', {
                popup: this._popup
            });
        }
    });
    var map = L.map('map');
    map.setView({lat: 35.70385350008514, lng: 139.7717151641846}, 16);

    var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
    });
    tileLayer.addTo(map);

    var defineMoveMarker = function(map, title) {
        var marker = null;
        return function(state) {
            var icon = L.icon({
                iconUrl: state.iconUrl,
                iconSize: [32, 32],
                iconAnchor: [16, 16]
            });
            if (marker == null) {
                marker = L.marker(state.latLng, {icon: icon});
                marker.addTo(map);
                marker.bindPopup(title, {
                    closeButton: false,
                    closeOnClick: false,
                    offset: [0, -16]
                });
                marker.openPopup();
            }
            else {
                marker.setLatLng(state.latLng);
                marker.setIcon(icon);
            }
        };
    };

    var states1 = [
        {latLng: {lat: 35.70531715135797, lng: 139.78164470195773}, iconUrl: "arrow_b.png"},
        {latLng: {lat: 35.70385350008514, lng: 139.781333565712}, iconUrl: "arrow_bl.png"},
        {latLng: {lat: 35.70397547205089, lng: 139.77961695194247}, iconUrl: "arrow_l.png"},
        {latLng: {lat: 35.70410615609286, lng: 139.7777501344681}, iconUrl: "arrow_l.png"},
        {latLng: {lat: 35.704245552168196, lng: 139.77579748630527}, iconUrl: "arrow_tl.png"},
        {latLng: {lat: 35.70558722693049, lng: 139.77592623233798}, iconUrl: "arrow_t.png"},
        {latLng: {lat: 35.70663267213164, lng: 139.77604424953464}, iconUrl: "arrow_t.png"},
        {latLng: {lat: 35.70764325612718, lng: 139.77614080905917}, iconUrl: "arrow_tr.png"},
        {latLng: {lat: 35.70747773031577, lng: 139.77808272838595}, iconUrl: "arrow_r.png"},
        {latLng: {lat: 35.70724250883458, lng: 139.77997100353244}, iconUrl: "arrow_r.png"},
        {latLng: {lat: 35.707050846373726, lng: 139.78193438053134}, iconUrl: "arrow_br.png"},
        {latLng: {lat: 35.70615351145029, lng: 139.7817841768265}, iconUrl: "arrow_b.png"}
    ];
    var moveMarker1 = defineMoveMarker(map, "<center>101号車<br />オリジン太郎</center>");
    eachTimeout(states1, moveMarker1, 2000, true);

    var states2 = [
        {latLng: {lat: 35.70279930603541, lng: 139.7668550014496}, iconUrl: "arrow_r.png"},
        {latLng: {lat: 35.70293870439578, lng: 139.76857161521914}, iconUrl: "arrow_r.png"},
        {latLng: {lat: 35.70296484156119, lng: 139.77017021179202}, iconUrl: "arrow_r.png"},
        {latLng: {lat: 35.70298226633342, lng: 139.7717151641846}, iconUrl: "arrow_r.png"},
        {latLng: {lat: 35.70277316881592, lng: 139.7739145755768}, iconUrl: "arrow_r.png"},
        {latLng: {lat: 35.702642482589056, lng: 139.77583503723147}, iconUrl: "arrow_br.png"},
        {latLng: {lat: 35.70158827252454, lng: 139.7756955623627}, iconUrl: "arrow_b.png"},
        {latLng: {lat: 35.70051662321384, lng: 139.77557754516604}, iconUrl: "arrow_b.png"},
        {latLng: {lat: 35.699418821180345, lng: 139.77549171447757}, iconUrl: "arrow_bl.png"},
        {latLng: {lat: 35.69951466164258, lng: 139.77364635467532}, iconUrl: "arrow_l.png"},
        {latLng: {lat: 35.699654065745676, lng: 139.7713932991028}, iconUrl: "arrow_l.png"},
        {latLng: {lat: 35.699802182338225, lng: 139.76917243003848}, iconUrl: "arrow_l.png"},
        {latLng: {lat: 35.700412071290856, lng: 139.76769185066226}, iconUrl: "arrow_tl.png"},
        {latLng: {lat: 35.70130947083863, lng: 139.76628637313846}, iconUrl: "arrow_tl.png"},
        {latLng: {lat: 35.70218943534453, lng: 139.76488089561465}, iconUrl: "arrow_tl.png"},
        {latLng: {lat: 35.703051965385285, lng: 139.76357197761538}, iconUrl: "arrow_tr.png"},
        {latLng: {lat: 35.70319136330381, lng: 139.7651062011719}, iconUrl: "arrow_r.png"}
    ];
    var moveMarker2 = defineMoveMarker(map, "<center>104号車<br />システム太郎</center>");
    eachTimeout(states2, moveMarker2, 2000, true);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                var latLng = {lat: position.coords.latitude, lng: position.coords.longitude};
                var icon = L.icon({
                    iconUrl: 'star_red.png',
                    iconSize: [36, 36],
                    iconAnchor: [18, 18]
                });
                var marker = L.marker(latLng, {icon: icon});
                marker.addTo(map);
            },
            function(error) {
                alert(error.message);
            }
        );
    } else {
        alert('Not available Geolocation');
    }
};
