/* DOCUMENTATION
https://developer.spotify.com/documentation/web-api/concepts/api-calls */

// "Please keep in mind that metadata, cover art and artist images must be accompanied by a link back to the applicable artist, album, track, or playlist on the Spotify Service. You must also attribute content from Spotify with the logo."

/* REQUESTS
GET Retrieves resources
POST Creates resources
PUT Changes and/or replaces resources or collections
DELETE Deletes resources */

/* SPOTIFY URIs & IDs 
https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids */

// Authentication & token via client credentials flow
// https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
// "The Client Credentials flow is used in server-to-server authentication. Since this flow does not include authorization, only endpoints that do not access user information can be accessed.""

const form = document.getElementById('spotify-search');

const clientId = 'b5d3e101d037470f94037829ff09e819';
const clientSecret = '5982fca9946d40f5b3e83a36fe684b3e';
const baseURL = 'https://api.spotify.com'


// GET ACCESS TOKEN
// To use the access token you must include the following header in your API calls:
    // Header Parameter: Authorization
    // Value: Valid access token following the format: Bearer <Access Token>
async function getToken() {
    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST', // POST Creates resources
        body: new URLSearchParams({
            'grant_type': 'client_credentials',
        }),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
    });

    const data = await response.json();
    console.log('Token Response:', data); // Log the access token JSON response
    return data.access_token;
};


// SEARCH FOR ARTIST
// endpoint https://api.spotify.com/v1/artists/{id}
    // GET Retrieves resources
async function searchArtists(query, token) {
    const response = await fetch (`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=6`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await response.json();
    console.log('Search Response:', data); // Log the search results JSON response
    return data.artists.items; // return list of artist objects
}


// DISPLAY RESULTS in the #search-results container
function displayResults(artists) {
    const resultsContainer = document.getElementById('search-results');

    artists.forEach(element => {
        
    });
};


// HANDLE FORM SUBMISSION
document.getElementById('spotify-search').addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = document.getElementById('artist-name-search').value.trim();
        console.log("User search input:" + " " + query);
    if(!query) return; // if nothig entered, return

    const token = await getToken(); // get access token and create resource
    const artists = await searchArtists(query, token);// get search results
    displayResults(artists);// display results
});