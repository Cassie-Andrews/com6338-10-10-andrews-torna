const form = document.getElementById('spotify-search');

const clientId = 'b5d3e101d037470f94037829ff09e819';
const clientSecret = '5982fca9946d40f5b3e83a36fe684b3e';
const baseURL = 'https://api.spotify.com'


// GET ACCESS TOKEN
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
}


// ARTIST SEARCH BY NAME TO GET SPOTIFY ID
async function searchArtists(query, token) {
    const response = await fetch(`https://api.spotify.com/v1/search?q=${query}&type=artist&limit=1`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await response.json();
    const artist = data.artists.items[0];
    const artistID = artist.id;
    console.log('Search Response:', artist); // Log the search results JSON response
    return artist.id; // return artist ID
}

// USE ARTIST ID TO RETURN ARTIST'S ALBUMS
async function getAlbums(artistID, token) {
    const response = await fetch(`https://api.spotify.com/v1/artists/${artistID}/albums`, { 
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },
    });

    const data = await response.json();
    console.log('Albums:', data); // Log the search results JSON response
    return data.items; // return artist's albums
}


// DISPLAY RESULTS in the #search-results container
function updateDisplay(artist, albums) {
    const resultsContainer = document.getElementById('search-results');
    resultsContainer.innerHTML = ''; // clear previous results

    // display artist info
    const artistDiv = document.createElement('div');

    artistDiv.innerHTML = `
        <img src=${artist.images.length > 0 ? artist.images[0].url : '#'} class="artist-image" alt="${artist.name}">
        <h3 class="artist-name">${artist.name}</h3>
        <p class ="artist-followers">${artist.followers.total} Followers</p>
        <a href="${artist.external_urls.spotify}" target="_blank" class="artist-link">More on Spotify</a>
    `;
    resultsContainer.appendChild(artistDiv);

  // display albums
    const albumsList = document.createElement('ul'); // make list of albums
    albums.forEach(album => { // for each album
        const albumItem = document.createElement('li'); // make a list item
        albumItem.innerHTML = `
            <img src=${album.images.length > 0 ? album.images[0].url : '#'} alt="${album.name}" class="album-image">
            <a href="${album.external_urls.spotify}" target="_blank" class="album-link">${album.name}</a>
        `;
        albumsList.appendChild(albumItem); // append item to list
    });
    resultsContainer.appendChild(albumsList);// append list to display
}


// HANDLE FORM SUBMISSION
document.getElementById('search-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const query = document.getElementById('artist-name-search').value.trim();
        console.log("User search input:" + " " + query);
    if(!query) return; // if nothig entered, return

    const token = await getToken(); // get access token and create resource
    const artistID = await searchArtists(query, token); // get ID from search results
    const albums = await getAlbums(artistID, token); // get artist's albums
    const artistResponse = await fetch(`https://api.spotify.com/v1/artists/${artistID}`, {
        method: 'GET',
        headers: { 'Authorization': `Bearer ${token}` },        
    });
    const artistData = await artistResponse.json(); 

    updateDisplay(artistData, albums);// display results
});



//NOTES
    // DOCUMENTATION: https://developer.spotify.com/documentation/web-api/concepts/api-calls

    // Please keep in mind that metadata, cover art and artist images must be accompanied by a link back to the applicable artist, album, track, or playlist on the Spotify Service. You must also attribute content from Spotify with the logo.

    // REQUESTS
        // GET Retrieves resources
        // POST Creates resources
        // PUT Changes and/or replaces resources or collections
        // DELETE Deletes resources 

    // SPOTIFY URIs & IDs: https://developer.spotify.com/documentation/web-api/concepts/spotify-uris-ids

    // Authentication & token via client credentials flow
    // https://developer.spotify.com/documentation/web-api/tutorials/client-credentials-flow
    // "The Client Credentials flow is used in server-to-server authentication. Since this flow does not include authorization, only endpoints that do not access user information can be accessed.""

    // To use the access token you must include the following header in your API calls:
    // Header Parameter: Authorization
    /* Value: Valid access token following the format: Bearer <Access Token> */
 

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