import { useEffect, useRef, useState } from "react";
import "./index.css";
import StarRating from "./StarRating";
import { useMovies } from "./useMovies";
import { useLocalStorageState } from "./useLocalStorageState";
import { useKey } from "./useKey";

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => +(acc + cur / arr.length).toFixed(1), 0);

// const fixedImage = "https://picsum.photos/200/300";

export default function App() {
  // const [watched, setWatched] = useState(() =>
  //   !localStorage.getItem("watchedItems")
  //     ? []
  //     : JSON.parse(localStorage.getItem("watchedItems"))
  // );

  let [watched, setWatched] = useLocalStorageState([], "watchedItems");

  const [query, setQuery] = useState("");

  const { movies, error, selectedId, setSelectedId } = useMovies(
    query,
    onCloseMovie
  );

  function handleSetSelectedId(id) {
    let movie = movies.filter((movie) => movie.imdbID === id)[0];
    if (id !== selectedId) {
      setSelectedId(id);
      document.title = `Movie | ${movie.Title}`;
    } else {
      onCloseMovie();
    }
  }
  useKey(onCloseMovie, "Escape");

  function onCloseMovie() {
    setSelectedId();
    document.title = "usePopcorn";
  }

  function onAddWatched(movie) {
    setWatched([...watched, movie]);
    setSelectedId(0);
  }

  function handleDeleteWatched(id) {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id));
  }

  return (
    <>
      <Navbar>
        <Logo />
        <InputField query={query} setQuery={setQuery} />
        <NumResults movies={movies} />
      </Navbar>
      <Main>
        <Box>
          {movies.length > 1 ? (
            <MovieList
              movies={movies}
              handleSetSelectedId={handleSetSelectedId}
            />
          ) : error !== "" ? (
            <ErrorMessage message={error} />
          ) : query.length != 0 ? (
            <Loader />
          ) : null}
        </Box>
        <Box watched={watched}>
          {selectedId ? (
            <MovieDetails
              selectedId={selectedId}
              onCloseMovie={onCloseMovie}
              onAddWatched={onAddWatched}
              watched={watched}
              key={selectedId}
            />
          ) : (
            <>
              <WatchedSummary watched={watched} />
              <WatchedList
                watched={watched}
                handleDeleteWatched={handleDeleteWatched}
              />
            </>
          )}
        </Box>
      </Main>
    </>
  );
}

function Main({ children }) {
  return <main className="main">{children}</main>;
}

function ErrorMessage({ message }) {
  return (
    <p className="error">
      <span>🚨</span> {message}
    </p>
  );
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function NumResults({ movies }) {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  );
}

function Navbar({ children }) {
  return <nav className="nav-bar">{children}</nav>;
}

function Button({ isOpen, setIsOpen }) {
  return (
    <button className="btn-toggle" onClick={() => setIsOpen((open) => !open)}>
      {isOpen ? "–" : "+"}
    </button>
  );
}

function InputField({ query, setQuery }) {
  const inputEl = useRef(null);
  function inputFocus() {
    inputEl.current.focus();
  }
  function setQueryNull() {
    setQuery("");
  }
  useKey(inputFocus, "Enter", query, setQuery);
  useKey(setQueryNull, "Escape", query, setQuery);
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      ref={inputEl}
    />
  );
}

function Logo() {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  );
}

function MovieList({ movies, handleSetSelectedId }) {
  return (
    <ul className="list list-movies">
      {movies?.map((movie) => (
        <Movie
          movie={movie}
          key={movie.imdbID}
          handleSetSelectedId={handleSetSelectedId}
        />
      ))}
    </ul>
  );
}

function Movie({ movie, handleSetSelectedId }) {
  // image at => movie.Poster
  return (
    <li key={movie.imdbID} onClick={() => handleSetSelectedId(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  );
}

function WatchedSummary({ watched }) {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  );
}

function WatchedList({ watched, handleDeleteWatched }) {
  return (
    <ul className="list">
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.Title}
          handleDeleteWatched={handleDeleteWatched}
        />
      ))}
    </ul>
  );
}

function WatchedMovie({ movie, handleDeleteWatched }) {
  // real image at => movie.Poster
  return (
    <li key={movie.imdbID}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>⭐️</span>
          <span>{movie.imdbRating}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{movie.userRating}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{movie.runtime} min</span>
        </p>
        <button
          className="btn-delete"
          onClick={() => handleDeleteWatched(movie.imdbID)}
        >
          X
        </button>
      </div>
    </li>
  );
}

function Box({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <Button isOpen={isOpen} setIsOpen={setIsOpen} />
      {isOpen && children}
    </div>
  );
}

function MovieDetails({ selectedId, onCloseMovie, onAddWatched, watched }) {
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const isRatedBefore =
    watched.map((movie) => movie.imdbID).indexOf(selectedId) > -1;

  let {
    Title: title,
    Poster: poster,
    Year: year,
    Runtime: runtime,
    imdbRating,
    Plot: plot,
    Released: released,
    Director: director,
    Genre: genre,
    Actors: actors,
  } = movie;

  useEffect(
    function () {
      async function getMovie() {
        setIsLoading(true);
        let req = await fetch(
          `https://www.omdbapi.com/?i=${selectedId}&apikey=a5081c3c`
        );
        let result = await req.json();
        setMovie(result);
        setIsLoading(false);
      }
      getMovie();
    },
    [selectedId]
  );

  function handleAdd() {
    let check = watched.map((movie) => movie.imdbID).indexOf(movie.imdbID) > -1;
    if (!check) {
      let newWatchedMovie = {
        Poster: movie.Poster,
        Title: movie.Title,
        Year: movie.Year,
        imdbID: movie.imdbID,
        imdbRating: +movie.imdbRating,
        userRating: userRating,
        countDesicions: countRef.current,
        runtime: Number(movie.Runtime.split(" ")[0]),
      };
      onAddWatched(newWatchedMovie);
    } else {
      onCloseMovie();
    }
  }

  function printRating(prop) {
    return prop > 0 ? (
      <button className="btn-add" onClick={handleAdd}>
        + Add to list
      </button>
    ) : null;
  }
  const countRef = useRef(null);
  useEffect(
    function () {
      countRef.current++;
    },
    [userRating]
  );

  // real image at poster
  return (
    <>
      {!isLoading ? (
        <div className="details">
          <header>
            <img src={poster} alt={`Poster of ${title}`}></img>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>
                {released} &bull; {runtime}
              </p>
              <p>{genre}</p>
              <p>
                <span>⭐</span> {imdbRating} IMDb rating
              </p>
            </div>
          </header>
          <section>
            <div className="rating">
              {!isRatedBefore ? (
                <StarRating
                  size="24px"
                  number={10}
                  getRating={printRating}
                  onSetRating={setUserRating}
                />
              ) : (
                <p>
                  You rated with movie{" "}
                  {
                    watched.filter((movie) => movie.imdbID === selectedId)[0]
                      .userRating
                  }
                  ⭐️
                </p>
              )}
              {userRating > 0 && (
                <button className="btn-add" onClick={handleAdd}>
                  + Add to list
                </button>
              )}
            </div>
            <p>
              <em>{plot}</em>
            </p>
            <p>Starring {actors}</p>
            <p>Directed by {director}</p>
          </section>
          <button className="btn-back" onClick={onCloseMovie}>
            &larr;
          </button>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}
