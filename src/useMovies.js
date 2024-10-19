import { useState, useEffect } from "react";

export function useMovies(query, callback) {
  const [movies, setMovies] = useState([]);

  const [error, setError] = useState("");

  const [selectedId, setSelectedId] = useState(0);

  useEffect(
    function () {
      async function fetchMovies() {
        try {
          let data = await fetch(
            `https://www.omdbapi.com/?s=${query}&apikey=a5081c3c`
          );
          let result = await data.json();
          if (!data.ok) {
            throw new Error("Failed to fetch");
          }
          if (result.Response === "False") {
            setMovies([]);
            throw new Error("There are no movies");
          }
          if (result.Response !== "False" && data.ok) {
            setError("");
          }
          setMovies(result.Search);
        } catch (err) {
          setError(err.message);
        }
      }
      if (query === "") {
        setMovies([]);
        setError("");
        return;
      }
      callback();
      fetchMovies();
    },
    [query]
  );

  return { movies, error, selectedId, setSelectedId };
}
