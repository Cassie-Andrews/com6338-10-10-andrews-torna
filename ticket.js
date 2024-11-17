const apiKey = "syjfyr5jThtpf2GSWuevDsMAakEwbLLm";
const lineupGrid = document.getElementById("lineup-grid");
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("artist-name");

async function fetchEvents() {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=Music&countryCode=US&size=100`);
        const data = await response.json();
        if (data._embedded && data._embedded.events) {
            const events = getUniqueArtists(data._embedded.events, 6);
            displayEvents(events);
        } else {
            lineupGrid.innerHTML = "<p>No music events found.</p>";
        }
    } catch (error) {
        lineupGrid.innerHTML = "<p>Failed to load events. Please try again later.</p>";
    }
}

function getUniqueArtists(events, count) {
    const uniqueArtistEvents = [];
    const artistNames = new Set();
    for (const event of events) {
        const artistName = event.name;
        if (!artistNames.has(artistName)) {
            uniqueArtistEvents.push(event);
            artistNames.add(artistName);
        }
        if (uniqueArtistEvents.length >= count) break;
    }
    
    return uniqueArtistEvents;
}

function displayEvents(events) {
    lineupGrid.innerHTML = events.map(event => `
        <div class="artist-card">
            <img src="${event.images[0].url}" alt="${event.name}" style="width:100%; height:220px; border-radius: 5px;">
            <h3>${event.name}</h3>
            <p>${new Date(event.dates.start.localDate).toDateString()}</p>
            <p>${event._embedded.venues[0].name}, ${event._embedded.venues[0].city.name}</p>
            <a href="${event.url}" target="_blank" class="ticket-link">Buy Tickets</a>
        </div>
    `).join("");
}

searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const artistName = searchInput.value.trim();
    if (artistName) {
        searchArtist(artistName);
        localStorage.setItem('storedName', artistName); // save user input to localStorage
    }
});

async function searchArtist(artistName) {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=Music&keyword=${artistName}&countryCode=US&size=10`);
        const data = await response.json();
        if (data._embedded && data._embedded.events) {
            console.log(data);
            displayEvents(data._embedded.events);
        } else {
            lineupGrid.innerHTML = `<p>No events found for "${artistName}".</p>`;
        }
    } catch (error) {
        lineupGrid.innerHTML = `<p>Failed to load events for "${artistName}". Please try again later.</p>`;
    }
}



//// CODE FOR RETRIEVING LOCALSTORAGE DATA ////

// on page load, check for storedName in local storage
window.addEventListener('load', async (e) => {
    const storedName = localStorage.getItem('storedName');
        console.log("Stored name:" + " " + storedName);
    if(storedName) { // if storedName is found
        searchStoredName(storedName); // run function to search by stored name
    } else {
        fetchEvents(); // otherwise, fetchEvents
    }
});


// search by stored name
async function searchStoredName(storedName) {
    try {
        const response = await fetch(`https://app.ticketmaster.com/discovery/v2/events.json?apikey=${apiKey}&classificationName=Music&keyword=${storedName}&countryCode=US&size=10`);
        const data = await response.json();
        if (data._embedded && data._embedded.events) {
            console.log(data);
            displayEvents(data._embedded.events);
        } else {
            lineupGrid.innerHTML = `<p>No events found for "${storedName}".</p>`;
        }
    } catch (error) {
        lineupGrid.innerHTML = `<p>Failed to load events for "${storedName}". Please try again later.</p>`;
    }
};