let flights = [];
let totalHoursToday = 0;

document.getElementById('flightForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const startTime = new Date(document.getElementById('start').value);
    const endTime = new Date(document.getElementById('end').value);

    const flightDuration = (endTime - startTime) / (1000 * 60 * 60); // Duration in hours

    if (flightDuration <= 0) {
        alert("End time must be after start time.");
        return;
    }

    const flight = {
        startTime,
        endTime,
        duration: flightDuration
    };

    flights.push(flight);
    updateFlightsList();
    updateSummary();
});

function updateFlightsList() {
    const flightsList = document.getElementById('flightsList');
    flightsList.innerHTML = '';

    flights.forEach((flight, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Flight ${index + 1}: ${flight.startTime.toLocaleString()} - ${flight.endTime.toLocaleString()} (${flight.duration.toFixed(2)} hours)`;
        flightsList.appendChild(listItem);
    });
}

function updateSummary() {
    totalHoursToday = flights.reduce((sum, flight) => sum + flight.duration, 0);

    const currentTime = new Date();
    let remainingHours = 8;

    flights.forEach(flight => {
        const timeSinceFlightEnd = (currentTime - flight.endTime) / (1000 * 60 * 60); // Time since flight ended in hours
        if (timeSinceFlightEnd < 24) {
            remainingHours -= flight.duration;
        }
    });

    const nextResetTime = new Date(Math.min(...flights.map(flight => flight.endTime.getTime())) + 24 * 60 * 60 * 1000);

    document.getElementById('totalHours').textContent = `Total Hours Today: ${totalHoursToday.toFixed(2)}`;
    document.getElementById('remainingHours').textContent = `Hours Available in Current 24-hour Period: ${remainingHours.toFixed(2)}`;
    document.getElementById('resetTime').textContent = `Next Reset Time: ${nextResetTime.toLocaleString()}`;
}

