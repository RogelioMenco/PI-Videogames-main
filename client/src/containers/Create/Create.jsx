import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createVideogame, getGenres } from "../../actions/index";
import "./Create.css";

export default function Create() {
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.genres);
  const genres1 = genres.slice(0, 10);
  const genres2 = genres.slice(10, 20);

  const [game, setGame] = useState({
    name: "",
    description: "",
    image: "",
    released: "",
    rating: null,
    genres: [],
    platforms: [],
  });

  useEffect(() => {
    dispatch(getGenres());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const randomPlatforms = ["PC", "iOS", "Android", "macOS", "PlayStation 4", "PlayStation 5", "Xbox", "PS Vita"];

  const ChangeInput = (e) => {
    if (e.target.name === "rating") {
      const num = parseInt(e.target.value);
      if (num > 5 || num < 1) {
        alert("Ingrese un numero valido");
        return;
      }
    }

    if (e.target.name === "genres" || e.target.name === "platforms") {
      const arr = game[e.target.name];
      setGame({
        ...game,
        [e.target.name]: arr.concat(e.target.value),
      });
    }
    //utilice un reject que simplemente me deje utilizar solo letras y numeros mas no otros simbolos
    else if (e.target.name === "name") {
      console.log(e.target.value);
      setGame({
        ...game,
        [e.target.name]: e.target.value?.replace(/[^a-zA-Z0-9 ]/g, ""),
      });
    } else {
      setGame({
        ...game,
        [e.target.name]: e.target.value,
      });
    }
  };

  // Crea una promesa para saber si cargo la imagen (necesario para hacer el codigo sync, o usar await)
  const checkForImage = async (url) => {
    return new Promise((resolve, reject) => {
      // Crea un objeto imagen (<img>) con el link e intenta cargar la imagen
      const img = new Image();
      img.src = url;

      // Asigna los listeners del objeto respectivamente, error, la promesa falla, cargo, se resuleve normal
      img.onload = () => resolve();
      img.onerror = () => reject("No hay imagen!");
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const obj = {
      name: game.name,
      description: game.description,
      image: game.image,
      released: game.released,
      rating: game.rating,
      genres: game.genres,
      platforms: game.platforms,
    };

    // Validaciones
    try {
      await checkForImage(obj.image);
    } catch (error) {
      alert("La imagen ingresada no es valida!");
      return;
    }
    if (!obj.name) {
      alert("Hey! falta el nombre.");
      return;
    }
    if (!obj.description) {
      alert("Hey! aun falta la descripcion.");
      return;
    }
    if (!obj.released) {
      alert("Hey! falta la fecha de lanzamiento.");
      return;
    }
    if (obj.rating > 5 || obj.rating < 0) {
      alert("Hey! el rating debe estar entre 0 and 5.");
      return;
    }

    dispatch(createVideogame(obj));
    e.target.reset();
    alert("Videogame creado correctamente !");
    /* dispatch(getVideogames()) */

    setGame({
      name: "",
      description: "",
      image: "",
      released: "",
      rating: 0,
      genres: [],
      platforms: [],
    });
  };

  return (
    <div className="container">
      <form id="survey-form" className="form" noValidate onChange={(e) => ChangeInput(e)} onSubmit={(e) => handleSubmit(e)}>
        <div>
          <div>
            <div className="titlesWrapper">
              <h1>ESTAS A PUNTO DE CREAR UN JUEGO!</h1>
              <h3>Rellena los siguientes campos</h3>
            </div>
            <div className="divTitles">
              <div>
                <label className="inputLabel">Nombre:</label>
                <input className="label" type="text" name="name" value={game.name}></input>
              </div>
              <div>
                <label className="inputLabel">Descripción:</label>
                <input className="label" type="text" name="description" value={game.description}></input>
              </div>
              <div>
                <label className="inputLabel">Lanzamiento:</label>
                <input className="label" type="date" name="released" value={game.released}></input>
              </div>
              <div>
                <label className="inputLabel">Rating:</label>
                <input className="label" type="number" name="rating" step="1" min="1" max="5" value={game.rating}></input>
              </div>
              <div className="imagedisv">
                <label className="inputLabel">URL de la imagen:</label>
                <input className="label" type="text" name="image" value={game.image}></input>
              </div>
            </div>
          </div>
          <div className="checkboxs">
            <div className="checks">
              <label className="inputLabel labelCenter">Generos</label>
              <div className="gendivs">
                {genres1.map((gen, i) => (
                  <div key={i} className="checkboxWrapper">
                    <input type="checkbox" name="genres" value={gen.name}></input>
                    <label name={gen}>{gen.name}</label>
                  </div>
                ))}

                {genres2.map((gen, i) => (
                  <div key={i} className="checkboxWrapper">
                    <input type="checkbox" name="genres" value={gen.name}></input>
                    <label name={gen}>{gen.name}</label>
                  </div>
                ))}
              </div>
            </div>
            <div className="checks">
              <label className="inputLabel labelCenter">Plataformas</label>
              <div className="platformsWrapper">
                {randomPlatforms.map((P, i) => (
                  <div key={i} className="checkboxWrapper">
                    <input type="checkbox" name="platforms" value={P}></input>
                    <label name={P}>{P}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <button className="button" type="submit">
            CREAR JUEGO!
          </button>
        </div>
      </form>
    </div>
  );
}
