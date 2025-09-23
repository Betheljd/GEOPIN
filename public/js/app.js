/**
 * Main JavaScript file for GeoPin application
 */

document.addEventListener('DOMContentLoaded', function() {
    console.log('GeoPin application initialized');
    
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Initialize Feather Icons
    feather.replace();
    
    // Initialize Vanta.js background if available
    initializeVanta();
    
    // Load Google Maps
    loadGoogleMaps();
});

/**
 * Initialize Vanta.js background effect
 */
function initializeVanta() {
    try {
        if (typeof VANTA !== 'undefined') {
            VANTA.GLOBE({
                el: "#vanta-bg",
                mouseControls: true,
                touchControls: true,
                gyroControls: false,
                minHeight: 200.00,
                minWidth: 200.00,
                scale: 1.00,
                scaleMobile: 1.00,
                color: 0x3b82f6,
                backgroundColor: 0xf1f5f9,
                size: 1.10
            });
        }
    } catch (e) {
        console.error('Error initializing Vanta.js:', e);
    }
}

/**
 * Load Google Maps API and initialize the map
 */
function loadGoogleMaps() {
    // Check if Google Maps API is already loaded
    if (typeof google === 'object' && typeof google.maps === 'object') {
        initMap();
        return;
    }
    
    // Add Google Maps API script
    const script = document.createElement('script');
    script.src = `https://maps.googleapis.com/maps/api/js?key=${window.GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY'}&libraries=places,geocoding&callback=initMap`;
    script.async = true;
    script.defer = true;
    script.onerror = function() {
        console.error('Error loading Google Maps API');
        document.getElementById('map').innerHTML = '<div class="p-4 text-red-600">Error loading Google Maps. Please check your API key and internet connection.</div>';
    };
    document.head.appendChild(script);
}

// Global function to be called by Google Maps API
window.initMap = function() {
    console.log('Google Maps API loaded');
    
    // Default coordinates (can be changed based on user's location or default location)
    const defaultLocation = { lat: 0, lng: 0 };
    
    // Create a new map instance
    const map = new google.maps.Map(document.getElementById('map'), {
        center: defaultLocation,
        zoom: 2,
        mapTypeId: 'terrain',
        styles: [
            {
                featureType: 'poi',
                elementType: 'labels',
                stylers: [{ visibility: 'off' }]
            }
        ]
    });
    
    // Try to get user's current location
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                
                // Center map on user's location
                map.setCenter(userLocation);
                map.setZoom(12);
                
                // Add a marker at user's location
                new google.maps.Marker({
                    position: userLocation,
                    map: map,
                    title: 'Your Location',
                    icon: {
                        url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    }
                });
                
                console.log('User location found:', userLocation);
            },
            (error) => {
                console.warn('Error getting user location:', error);
                // Use default location if geolocation fails
                map.setCenter(defaultLocation);
            }
        );
    } else {
        console.warn('Geolocation is not supported by this browser');
        map.setCenter(defaultLocation);
    }
    
    // Add map click event listener
    map.addListener('click', function(e) {
        // You can add functionality for when the user clicks on the map
        console.log('Map clicked at:', e.latLng.toString());
    });
    
    // Store the map instance globally for other functions to use
    window.geopinMap = map;
};
