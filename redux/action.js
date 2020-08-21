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

export const getEvolution = (url) => async (dispatch, getState) => {
  function getAllEvolutions(data,res){
    res = res? res: []
    res.push(data.species)
    if (data.evolves_to.length !== 0) {
      getAllEvolutions(data.evolves_to[0],res)
    }
    return res;
  }
  try{
    const id = url.match(/\/(\d.*)\/$/g)[0].replace(/\//g, "");
    let tmpState = getState().evolution;
    let api = [];
    let api_pic = [];
    if (!tmpState.find(el => el.id === id)) {
      const { data } = await axios.get(url);
      let chain = data.chain;
      chain = getAllEvolutions(chain)
      chain.forEach(el=>{
        api.push(axios.get(el.url));
        api_pic.push(axios.get(el.url.replace('pokemon-species', 'pokemon')))
      })

      let res = await Promise.all(api);
      res = res.map(el=>el.data.names.find(e=>e.language.name ==='zh-Hant').name)

      let pic = await Promise.all(api_pic);
      pic = pic.map(el => el.data.sprites.other.dream_world.front_default)
      // console.log(pic)
      tmpState.push({
        id: id,
        chain_name: res,
        chain_pic: pic,
      })
      dispatch({
        type: "ADD_EVOLUTION",
        data: tmpState
      })
    }
  } catch(err){
    console.log(err)
  }
  
  return false;
}