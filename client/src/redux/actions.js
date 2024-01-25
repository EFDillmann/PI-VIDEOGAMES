import axios from "axios";
import {
  GETGENRES,
  GETALLVIDEOGAMES,
  GETVIDEOGAMESBYNAME,
  GETVIDEOGAMEBYID,
  POSTVIDEOGAME,
  MODIFYPAGE,
  TOPPAGE,
  BOTTOMPAGE,
  RESET,
  ALPHABETICORDER,
  RATINGORDER,
  FILTERBYGENRES,
  FILTERBYORIGIN,
} from "./action-types";

const URL_BASE = "http://localhost:3001/";

export function getGenres() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_BASE}genres`);

      return dispatch({
        type: GETGENRES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function getAllVideogames() {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_BASE}videogames`);
      return dispatch({
        type: GETALLVIDEOGAMES,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function getVideogamesByName(name) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_BASE}videogames?name=${name}`);

      return dispatch({
        type: GETVIDEOGAMESBYNAME,
        payload: data,
      });
    } catch ({ response }) {
      alert(response.data.message);
      console.error(response);
    }
  };
}
export function getVideogameById(id) {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`${URL_BASE}videogames/${id}`);

      return dispatch({
        type: GETVIDEOGAMEBYID,
        payload: data,
      });
    } catch (error) {
      console.error(error);
    }
  };
}
export function postVideogame(newVideogame) {
  return async (dispatch) => {
    try {
      const { data } = await axios.post(`${URL_BASE}videogames`, newVideogame);

      alert("Videogame created successfully");

      return dispatch({
        type: POSTVIDEOGAME,
        payload: data,
      });
    } catch ({ response }) {
      alert(response.data.message);
      console.error(response.data.message);
    }
  };
}
export function modifyPage(value) {
  return {
    type: MODIFYPAGE,
    payload: value,
  };
}
export function topPage() {
  return {
    type: TOPPAGE,
  };
}
export function bottomPage() {
  return {
    type: BOTTOMPAGE,
  };
}
export function reset() {
  return {
    type: RESET,
  };
}
export function alphabeticOrder(orderType) {
  return {
    type: ALPHABETICORDER,
    payload: orderType,
  };
}
export function ratingOrder(orderType) {
  return {
    type: RATINGORDER,
    payload: orderType,
  };
}
export function filterByOrigin(origin) {
  return {
    type: FILTERBYORIGIN,
    payload: origin,
  };
}
export function filterByGenres(genre) {
  return {
    type: FILTERBYGENRES,
    payload: genre,
  };
}
