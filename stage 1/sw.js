
var CACHE_NAME = 'restaurant-reviews-app-cache';
var CACHE_FILES = [
'/',
        './index.html',
        './restaurant.html',
        './css/styles.css',
        './js/dbhelper.js',
        './js/main.js',
        './js/restaurant_info.js',
        './data/restaurants.json',
        './img/1.jpg',
        './img/2.jpg',
        './img/3.jpg',
        './img/4.jpg',
        './img/5.jpg',
        './img/6.jpg',
        './img/7.jpg',
        './img/8.jpg',
        './img/9.jpg',
        './img/10.jpg',
        'https://fonts.googleapis.com/css?family=Montserrat:400,600,800'
];

self.addEventListener('install', function (event) {
  //console.log(event);
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Cache opened');
        return cache.addAll(CACHE_FILES);
    })
  );
});


self.addEventListener('fetch', function (event) {
  event.respondWith(
    caches.match(event.request).then(function (res) {
      if(res){
        return res;
      }
      requestData(event);
    })
  )
});

function requestData(event){
  var url = event.request.clone();
  return fetch(url).then(function(res) {

    if(!res || res.status !== 200 || res.type !== 'basic'){
      return res;
    }

    var response = res.clone();

    caches.open(CACHE_NAME).then(function (cache){
      cache.put(event.request, response);
    });

    return res;
  })
}

self.addEventListener('activate', function (event) {
  //console.log(event);
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(keys.map(function (key,i){
        if (key !== CACHE_NAME){
          return caches.delete(keys[i]);
        }
      }))
    })
  )
});
