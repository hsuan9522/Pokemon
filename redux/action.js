import axios from 'axios';
import _ from 'lodash';

export const getPokemonSpecies = (id,url) => async (dispatch, getState) => {
  if (getState().pokemonSpecies.length === 0 || _.isEmpty(getState().pokemonSpecies[id-1])){
    const { data: res } = await axios.get(url);
    let tmp = getState() ? getState().pokemonSpecies : [];
    tmp[id-1]=res;
    dispatch({
      type: "ADD_SPECIES",
      data: tmp
    });
  }
}

export const getPokemonData = (id, url) => async (dispatch,getState) => {
  if (getState().pokemonData.length === 0 || _.isEmpty(getState().pokemonData[id-1])) {
    const { data: res } = await axios.get(url);
    let tmp = getState() ? getState().pokemonData : [];
    tmp[id-1] = res;
    dispatch({
      type: "ADD_DATA",
      data: tmp
    });
  }
}