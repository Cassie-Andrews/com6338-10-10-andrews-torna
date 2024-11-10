const apiKey = "syjfyr5jThtpf2GSWuevDsMAakEwbLLm"; // Your Ticketmaster API key
const lineupGrid = document.getElementById("lineup-grid");

// Function to fetch events from Ticketmaster API
async function fetchEvents() {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=Music&countryCode=US&size=20`); // Increase the size for more options
        const data = await response.json();

        if (data._embedded && data._embedded.events) {
            // Randomly pick 3 events from the fetched data
            const events = data._embedded.events;
            const randomEvents = getRandomEvents(events, 6);
            displayEvents(randomEvents);
        } else {
            lineupGrid.innerHTML = "<p>No music events found.</p>";
        }
    } catch (error) {
        console.error("Error fetching events:", error);
        lineupGrid.innerHTML = "<p>Failed to load events. Please try again later.</p>";
    }
}

// Function to randomly pick a specified number of events from an array
function getRandomEvents(events, count) {
    const shuffled = [...events].sort(() => 0.5 - Math.random()); // Shuffle the events
    return shuffled.slice(0, count); // Return the first 'count' events
}

// Function to display events in the lineup grid
function displayEvents(events) {
    lineupGrid.innerHTML = events.map(event => `
        <div class="artist-card">
            <img src="${event.images[0].url}" alt="${event.name}" style="width:100%; height:auto; border-radius: 5px;">
            <h3>${event.name}</h3>
            <p>${new Date(event.dates.start.localDate).toDateString()}</p>
            <p>${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}</p>
            <a href="${event.url}" target="_blank">Buy Tickets</a>
        </div>
    `).join("");
}

// Fetch events when the page loads
fetchEvents();



