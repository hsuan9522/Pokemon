import initState from './state';

const reducer = (state = initState, action) => {
  switch (action.type) {
    case "ADD_DATA":
      return {
        ...state,
        pokemonData: action.data
      }
    case "ADD_EVOLUTION":
      return {
        ...state,
        evolution: action.data
      }
    case "TEST":
      return {
        ...state,
        test: action.data
      }
    default:
      return state;
  }
}

export default reducer;