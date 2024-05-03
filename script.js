mapboxgl.accessToken = 'pk.eyJ1IjoibncyMjU3IiwiYSI6ImNsdXU4emozMzA3ZHoyam11Zmx6NWxqajcifQ._r9IkgwnilyVDH2Mh6MEzg';
const astoriaplant = [-73.89980360665398, 40.78419995146565];
const map = new mapboxgl.Map({
    container: 'map',
    // Using custom style that highlights only country and state borders//
    style: 'mapbox://styles/nw2257/clvojdept04la01pe9y0sciq7',
    center: [-73.81555790391995, 42.74982891965341],
    zoom: 6.5,
    pitch: 45
});
console.log('map', map)

// creating popup//
const popup = new mapboxgl.Popup({ offset: 25 }).setText(
'Construction on the Astoria Converter began in 2023.'
);

// create DOM element for the marker
const el = document.createElement('div');
el.id = 'marker';

// create the marker
new mapboxgl.Marker(el)
.setLngLat(astoriaplant)
.setPopup(popup) // sets a popup on this marker
.addTo(map);

//adding the route of the cable, sourced from https://docs.mapbox.com/mapbox-gl-js/example/geojson-line///
map.on('load', () => {
    map.addSource('route', {
        'type': 'geojson',
        'data': {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': [
                    [-73.338663, 45.000253],
                    [-73.36180992661546, 44.51949827727437],
                    [-73.308185, 44.249749],
                    [-73.3992703013945, 44.18218968456888],
                    [-73.429555, 44.026890],
                    [-73.35447761648506, 43.76949270395614],
                    [-73.37422904028365, 43.73461664280734],//putnam//
                    [-73.398232, 43.734701],
                    [-74.035911, 42.820588],
                    [-73.849511, 42.434100],
                    [-73.92027180459297, 42.14651267135619],
                    [-73.907564703141, 42.14388854089606], //Alsen: keeping track of the turns//
                    [-73.9261173975882, 42.071165627524614],
                    [-73.96023326605878, 41.90738882423592],
                    [-73.93758938066254, 41.869087746437984],
                    [-73.95141014710413, 41.84737928933477],
                    [-73.95213320828424, 41.77102599012861],
                    [-73.94132290587586, 41.75602193016511],
                    [-73.95405807257873, 41.58143531843827], //NewHamburg//
                    [-73.99613002292499, 41.523831090004954],
                    [-73.99434191581183, 41.45127644910114],
                    [-73.94748741909913, 41.39429312748052], //westpoint//
                    [-73.96738936801232, 41.34039723165803],
                    [-73.98518238013386, 41.31827505994755],
                    [-73.95300978525712, 41.288880746009966],
                    [-73.99458823108104, 41.239081869418015],
                    [-73.980632, 41.183822],
                    [-73.886337, 41.100181],
                    [-73.89853678891045, 40.99314640030494], //stateline//
                    [-73.933049, 40.877310],
                    [-73.908314, 40.865887],
                    [-73.932362, 40.832645],
                    [-73.927651, 40.801043],
                    [-73.905612, 40.793425],
                    [-73.899256, 40.784002],
                    [-73.907940, 40.780810],
                    [-73.915627, 40.786009],
                    [-73.924724, 40.778632],
                    [-73.933399, 40.766250],
                    [-73.936276, 40.767582],
                    [-73.939655, 40.766412],
                    [-73.941759, 40.763357],
                    [-73.9430711, 40.763141],
                ]
            }
        }
    });
    map.addLayer({
        'id': 'route',
        'type': 'line',
        'source': 'route',
        'layout': {
            'line-join': 'round',
            'line-cap': 'round'
        },
        'paint': {
            'line-color': 'steelblue',
            'line-opacity': 0.8,
            'line-width': 8.5
        }
    });
});
//adding "camera angles" and zoom speed for each chapter//
const chapters = {
    'overview': {
        bearing: 0,
        center: [-73.81555790391995, 42.74982891965341],
        zoom: 6.5,
        pitch: 20
    },
    'canada-border': {
        duration: 3000,
        bearing: 0,
        center: [-73.34026313015306, 45.01734476478177],
        zoom: 10,
        pitch: 20
    },
    'mill-bay': {
        duration: 6000,
        center: [-73.37422904028365, 43.73461664280734],
        bearing: -25,
        zoom: 15,
        pitch: 0
    },
    'enter-hudson': {
        bearing: 0,
        center: [-73.90730328683885, 42.14392102072783,],
        zoom: 15,
        speed: 0.7,
        pitch: 40
    },
    'astoria-converter': {
        bearing: 0,
        center: [-73.90039723787821, 40.78463367212406],
        zoom: 15,
        speed: 0.7,
        pitch: 40
    },
    'rainey-substation': {
        duration: 5000,
        bearing: -15,
        center: [-73.94299233751983, 40.76330816273322],
        zoom: 15
    },

};
//setting up the flyto fucntion based on which chapter text hits the top of the screen view//
let activeChapterName = 'canada-border';
function setActiveChapter(chapterName) {
    if (chapterName === activeChapterName) return;

    map.flyTo(chapters[chapterName]);

    document.getElementById(chapterName).classList.add('active');
    document.getElementById(activeChapterName).classList.remove('active');

    activeChapterName = chapterName;
}

function isElementOnScreen(id) {
    const element = document.getElementById(id);
    const bounds = element.getBoundingClientRect();
    return bounds.top < window.innerHeight && bounds.bottom > 0;
}

// On every scroll event, check which element is on screen
window.onscroll = () => {
    for (const chapterName in chapters) {
        if (isElementOnScreen(chapterName)) {
            setActiveChapter(chapterName);
            break;
        }
    }
};