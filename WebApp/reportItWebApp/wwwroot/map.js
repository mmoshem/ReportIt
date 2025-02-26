window.initializeMap = (lat, lng) => {
    if (window.myMap) {
        return; // Prevent reinitialization
    }

    window.myMap = L.map('map').setView([lat, lng], 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(window.myMap);

    window.markers = []; // Initialize marker array
};

window.addMarker = (lat, lng, popupText) => {
    if (!window.myMap) {
        console.error("Map not initialized");
        return;
    }

    // Clear previous markers before adding a new one
    window.clearMarkers();

    let marker = L.marker([lat, lng]).addTo(window.myMap)
        .bindPopup(popupText)
        .openPopup();

    window.markers.push(marker); // Store marker

    window.myMap.setView([lat, lng], 18);
};

window.clearMarkers = () => {
    if (window.markers) {
        window.markers.forEach(marker => marker.remove()); // Remove all markers
        window.markers = []; // Reset marker array
    }
};
