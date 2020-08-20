import initState from './state';

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_SPECIES":
      return { 
        ...state,
        pokemonSpecies: action.data
      }
    case "ADD_DATA":
      return {
        ...state,
        pokemonData: action.data
      }
    case "ADD_DATA":
      return {
        ...state,
        evolution: action.data
      }
    default:
      return state;
  }
}

export default reducer;