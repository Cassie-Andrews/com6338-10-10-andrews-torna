/* DOCUMENTATION
https://developer.spotify.com/documentation/web-api/concepts/api-calls */

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
        body: newURLSearchParams({
            'grant_type': 'client_credentials',
        }),
        headers: {
            'Content-Type': '',
            'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        },
    });

    const data = await response.json();
    console.log('Token Response:', data); // Log the access token JSON response
    return data.access_token;
}
// HANDLE FORM SUBMISSION


// SEARCH FOR ARTIST
// endpoint https://api.spotify.com/v1/artists/{id}
    // GET Retrieves resources


// DISPLAY RESULTS in the #search-results container
