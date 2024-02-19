import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getGenres, filterByGenre, orderByCreator, orderAsc, orderDesc } from "../../actions/index";
import "./Filter.css";

export function Filter({ paginate }) {
  const dispatch = useDispatch();
  const genres = useSelector((store) => store.genres);

  useEffect(() => {
    dispatch(getGenres());
  }, [dispatch]);

  // Filtrado por genre
  const handleFilter = (e) => {
    dispatch(filterByGenre(e.target.value));
    paginate(e, 1);
  };

  // Ordenado
  const handleOrder = (e) => {
    if (e.target.value === "asc_name" || e.target.value === "asc_rating") {
      dispatch(orderAsc(e.target.value));
    } else if (e.target.value === "desc_name" || e.target.value === "desc_rating") {
      dispatch(orderDesc(e.target.value));
    } else {
      dispatch(filterByGenre(e.target.value));
    }
  };

  // Filtrado por API/DB
  const handleCreator = (e) => {
    if (e.target.value === "Api" || e.target.value === "Created") {
      dispatch(orderByCreator(e.target.value));
      paginate(e, 1);
    } else {
      dispatch(filterByGenre(e.target.value));
      paginate(e, 1);
    }
  };

  return (
    <div className="filter">
      <div>
        <span className="filterText">Filtrado por Genero</span>
        <select onChange={(e) => handleFilter(e)}>
          <option default>Todos</option>
          {genres.length && genres?.map((G) => <option value={G.name}>{G.name}</option>)}
        </select>
      </div>
      <div>
        <span className="filterText">Ordenamiento</span>
        <select onChange={(e) => handleOrder(e)}>
          <option value="All" default>
            Todos
          </option>
          <option value="asc_name">Alfabéticamente (A-Z)</option>
          <option value="desc_name">Alfabéticamente (Z-A)</option>
          <option value="asc_rating">Rating (Menor-Mayor)</option>
          <option value="desc_rating">Rating (Mayor-Menor)</option>
        </select>
      </div>
      <div>
        <span className="filterText">Filtrado API / User</span>
        <select onChange={(e) => handleCreator(e)}>
          <option default>Todos</option>
          <option value="Api">API Videogames</option>
          <option value="Created">User Videogames</option>
        </select>
      </div>
    </div>
  );
}

export default Filter;
