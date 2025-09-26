console.log("All envs:", import.meta.env);
console.log("From process.env:", process.env?.VITE_OMDB_API_KEY);

const API_KEY = import.meta.env.VITE_OMDB_API_KEY || "d097f8c2";
const BASE_URL = "https://www.omdbapi.com/";

export async function searchMovies(query, page = 1, type = "") {
  const url = `${BASE_URL}?apikey=${API_KEY}&s=${encodeURIComponent(query)}&page=${page}${
    type ? `&type=${type}` : ""
  }`;
  const res = await fetch(url);
  return res.json();
}

export async function getMovieDetails(id) {
  const url = `${BASE_URL}?apikey=${API_KEY}&i=${id}&plot=full`;
  const res = await fetch(url);
  return res.json();
}
