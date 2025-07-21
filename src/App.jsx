import { useState, useEffect } from "react";

import filmList from "./data/filmList";

function App() {
  const [newFilm, setNewFilm] = useState("");
  const [films, setFilms] = useState(filmList);

  //*crea un inserimento per il genere del film

  function handleSubmit(e) {
    e.preventDefault();
    // è un oggetto, non una stringa.
    setFilms([{ genre: newFilm }, ...films]); // inserisco il nuovo genere del film ed evito di sovrascrivere l'intero array precedente
  }
  return (
    <div className="container flex">
      <h2>This is your Film List</h2>
      <ul className="list flex">
        {films.map((film, index) => {
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
