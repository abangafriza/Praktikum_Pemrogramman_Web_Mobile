// TODO 3.1: Install service worker...
self.addEventListener('install', function(event) {
	console.log('Service worker installing...');
// TODO 3.4: Menunggu...
self.skipWaiting();
});

self.addEventListener('activate', function(event) {
	console.log('Service worker activating...');
});

// TODO 4 : 
self.addEventListener('fetch', function(event) {
	console.log('Fetching:', event.request.url);
});