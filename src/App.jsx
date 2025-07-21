import { useState, useEffect } from "react";
import Select from "react-select";

import filmList from "./data/filmList";

function App() {
  const [newFilm, setNewFilm] = useState("");
  const [films, setFilms] = useState(filmList);
  const [selectedGenre, setSelectedGenre] = useState({
    value: "",
    label: "All Genres",
  });
  const options = [
    { value: "", label: "All genres" },
    { value: "Fantascienza", label: "Fantascienza" },
    { value: "Thriller", label: "Thriller" },
    { value: "Romantico", label: "Romantico" },
    { value: "Azione", label: "Azione" },
  ];

  let filteredFilms = films;
  if (selectedGenre.value !== "") {
    filteredFilms = films.filter((film) => film.genre === selectedGenre.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    // è un oggetto, non una stringa.
    setFilms([{ genre: newFilm }, ...films]); // inserisco il nuovo genere del film ed evito di sovrascrivere l'intero array precedente
  }
  return (
    <div className="container flex">
      <h2>This is your Film List</h2>

      <Select
        options={options}
        value={selectedGenre}
        onChange={setSelectedGenre}
        placeholder="Select genre"
        className="select"
      />
      <ul className="list flex">
        {filteredFilms.map((film, index) => {
          return (
            <li key={index} className="flex">
              <span>{film.title}</span>
              <span>{film.genre}</span>
            </li>
          );
        })}
      </ul>
      {/* al momento inserisco unicamente il genere per verificare il filtraggio */}
      {/* inserire un secondo imput per il titolo o farlo in solo imput? */}
      <form onSubmit={handleSubmit} className="form flex">
        <input
          className="input"
          placeholder="Insert New Film"
          type="text"
          value={newFilm}
          onChange={(e) => setNewFilm(e.target.value)}
        />
        <button type="submit" className="save btn flex">
          Save the New Film
        </button>
      </form>
    </div>
  );
}

export default App;
