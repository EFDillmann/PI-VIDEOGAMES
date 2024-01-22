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

const initialState = {
  videogames: [],
  genres: [],
  platforms: [],
  renderVideogames: [],
  renderDetailVideogame: [],

  currentPage: 1,
  totalVideogames: 0,
  itemsByPage: 15,

  filterGenres: false,
  filterVideogames: false,
};

const rootReducer = (state = initialState, { type, payload }) => {
  const filters = (byGenre, byOrigin) => {
    let filteredVideogames = [...state.videogames];
    if (byGenre && byGenre !== "ALLGENRES") {
      filteredVideogames = filteredVideogames.filter((game) => {
        const extractGenre = game.genres.map((genre) =>
          genre.name.toUpperCase()
        );
        return extractGenre.includes(byGenre);
      });
    }

    if (byOrigin === "DB")
      filteredVideogames = filteredVideogames.filter((game) => isNaN(game.id));
    if (byOrigin === "API")
      filteredVideogames = filteredVideogames.filter((game) => !isNaN(game.id));

    return filteredVideogames;
  };

  switch (type) {
    case GETGENRES:
      return {
        ...state,
        genres: payload.data,
      };
    case GETALLVIDEOGAMES: {
      const total = [...payload.data.db, ...payload.data.api];
      const platformsPerVideogames = total.map(
        (videogame) => videogame.platforms
      );
      const flatPlatforms = platformsPerVideogames.flat();
      const allPlatforms = [...new Set(flatPlatforms)];
      return {
        ...state,
        videogames: total,
        renderVideogames: total,
        totalVideogames: total.length,
        platforms: allPlatforms,
      };
    }
    case GETVIDEOGAMESBYNAME:
      return {
        ...state,
        renderVideogames: [...payload.data.db, ...payload.data.api],
      };
    case GETVIDEOGAMEBYID:
      return {
        ...state,
        renderDetailVideogame: payload.data,
      };
    case POSTVIDEOGAME:
      return {
        ...state,
        videogames: [payload.data, ...state.videogames],
        totalVideogames: state.totalVideogames + 1,
      };
    case MODIFYPAGE: {
      let value = payload;

      if (state.currentPage + value < 1) {
        value = 0;
      }
      if (
        state.currentPage + value >
        Math.ceil(state.totalVideogames / state.itemsByPage)
      ) {
        value = 0;
      }

      return {
        ...state,
        currentPage: state.currentPage + value,
      };
    }
    case BOTTOMPAGE:
      return {
        ...state,
        currentPage: 1,
      };
    case TOPPAGE:
      return {
        ...state,
        currentPage:
          state.totalVideogames === 0
            ? 1
            : Math.ceil(state.totalVideogames / state.itemsByPage),
      };
    case RESET:
      return {
        ...state,
        renderVideogames: state.videogames,
      };
    case ALPHABETICORDER: {
      let orderVideogames = [...state.renderVideogames];
      orderVideogames.sort((a, b) => {
        if (a.name < b.name) {
          return payload === "A-Z" ? -1 : 1;
        }
        if (a.name > b.name) {
          return payload === "Z-A" ? -1 : 1;
        }
        return 0;
      });
      return {
        ...state,
        renderVideogames: orderVideogames,
        totalVideogames: orderVideogames.length,
        currentPage: 1,
      };
    }
    case RATINGORDER: {
      let orderVideogames = [...state.renderVideogames];
      orderVideogames.sort((a, b) => {
        if (payload === "A") return a.rating - b.rating;
        if (payload === "D") return b.rating - a.rating;
      });
      return {
        ...state,
        renderVideogames: orderVideogames,
        totalVideogames: orderVideogames.length,
        currentPage: 1,
      };
    }
    case FILTERBYGENRES: {
      let filteredVideogames = filters(payload, state.filterVideogames);
      return {
        ...state,
        renderVideogames: filteredVideogames,
        totalVideogames: filteredVideogames.length,
        currentPage: 1,
        filterGenres: payload,
      };
    }
    case FILTERBYORIGIN: {
      let filteredVideogames = filters(state.filterGenres, payload);

      return {
        ...state,
        renderVideogames: filteredVideogames,
        totalVideogames: filteredVideogames.length,
        currentPage: 1,
        filterVideogames: payload,
      };
    }
    default:
      return state;
  }
};

export default rootReducer;
