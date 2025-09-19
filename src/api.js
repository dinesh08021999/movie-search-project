// src/api.js
const API_KEY = "d097f8c2"; // put your OMDB API key
const BASE_URL = "https://www.omdbapi.com/";

// Search movies
export async function searchMovies(query) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&s=${query}`);
  const data = await res.json();
  return data.Search || [];
}

// Get full details by imdbID
export async function getMovieDetails(id) {
  const res = await fetch(`${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`);
  const data = await res.json();
  return data;
}
