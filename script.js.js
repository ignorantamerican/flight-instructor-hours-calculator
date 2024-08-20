document.getElementById('hoursForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const startTime = new Date(document.getElementById('start').value);
    const endTime = new Date(document.getElementById('end').value);
    const duration = (endTime - startTime) / (1000 * 60 * 60); // Duration in hours

    if (duration < 0) {
        document.getElementById('result').textContent = "End time must be after start time.";
        return;
    }

    const nextDayStart = new Date(endTime);
    nextDayStart.setDate(nextDayStart.getDate() + 1);
    nextDayStart.setHours(0, 0, 0, 0);

    const nextDayEnd = new Date(endTime);
    nextDayEnd.setDate(nextDayEnd.getDate() + 1);
    nextDayEnd.setHours(endTime.getHours(), endTime.getMinutes(), 0, 0);

    const maxHoursNextDay = 8 - duration;

    document.getElementById('result').textContent = `You can instruct for up to ${maxHoursNextDay.toFixed(1)} hours before ${nextDayEnd.toLocaleTimeString()} on the next day.`;
});
