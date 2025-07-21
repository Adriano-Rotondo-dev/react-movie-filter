import { useState, useEffect } from "react";
import Select from "react-select";

import filmList from "./data/filmList";

function App() {
  //dichiaro le variabili di stato
  const [films, setFilms] = useState(filmList);
  const [filteredFilms, setFilteredFilms] = useState(filmList);
  //dichiaro le variabili di selezione con useState di default
  const [selectedGenre, setSelectedGenre] = useState({
    value: "",
    label: "All genres",
  });
  // definisco l'aarray di selezione per genere
  const optionsGenres = [
    { value: "", label: "All genres" },
    { value: "Fantascienza", label: "Fantascienza" },
    { value: "Thriller", label: "Thriller" },
    { value: "Romantico", label: "Romantico" },
    { value: "Azione", label: "Azione" },
  ];
  const [selectedTitle, setSelectedTitle] = useState({
    value: "",
    label: "All movie titles",
  });
  // definisco l'aarray di selezione per titolo
  const optionsTitles = [
    { value: "", label: "All movie titles" },
    { value: "Inception", label: "Inception" },
    { value: "Il Padrino", label: "Il Padrino" },
    { value: "Titanic", label: "Titanic" },
    { value: "Batman", label: "Batman" },
    { value: "Interstellar", label: "Intersellar" },
    { value: "Pulp Fiction", label: "Pulp Fiction" },
  ];

  //invoco la funzione useEffect per renderizzare i film selezionati o visualizzarli tutti
  useEffect(() => {
    if (selectedGenre.value === "") {
      setFilteredFilms(films);
    } else {
      setFilteredFilms(
        films.filter((film) => film.genre === selectedGenre.value)
      );
    }
  }, [films, selectedGenre]);
  useEffect(() => {
    if (selectedTitle.value === "") {
      setFilteredFilms(films);
    } else {
      setFilteredFilms(
        films.filter((film) => film.title === selectedTitle.value)
      );
    }
  }, [films, selectedTitle]);
  // definisco le variabili per l'inserimento di nuovi titoli e genere collegato
  const [newFilm, setNewFilm] = useState("");
  const [newGenre, setNewGenre] = useState("");
  //invoco la funzione per renderizzare nuovi contenuti
  function handleSubmit(e) {
    e.preventDefault();
    //  è un oggetto, non una stringa.
    setFilms([{ title: newFilm, genre: newGenre }, ...films]); // inserisco i dati del nuovo film
  }
  return (
    <div className="container flex">
      <h2>This is your Film List</h2>

      <Select
        options={optionsGenres}
        value={selectedGenre}
        onChange={setSelectedGenre}
        placeholder="Select genre"
        className="select"
      />
      <Select
        options={optionsTitles}
        value={selectedTitle}
        onChange={setSelectedTitle}
        placeholder="Select title"
        className="select"
      />
      <ul className="list flex">
        {filteredFilms.map((film, index) => {
          return (
            <li key={index} className="flex">
              <span className="liObj">{film.title}</span>
              <span className="liObj">{film.genre}</span>
            </li>
          );
        })}
      </ul>
      {/* al momento inserisco unicamente il genere per verificare il filtraggio */}
      {/* inserire un secondo imput per il titolo o farlo in solo imput? */}
      <form onSubmit={handleSubmit} className="form flex">
        <div className="inputContainer flex">
          <input
            className="input"
            placeholder="Insert New Film Title"
            type="text"
            value={newFilm}
            onChange={(e) => setNewFilm(e.target.value)}
          />
          <input
            className="input"
            placeholder="Insert New Film Genre"
            type="text"
            value={newGenre}
            onChange={(e) => setNewGenre(e.target.value)}
          />
        </div>
        <button type="submit" className="save btn flex">
          <i class="fa-regular fa-floppy-disk"></i>
        </button>
      </form>
    </div>
  );
}

export default App;
