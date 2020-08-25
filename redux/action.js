import axios from 'axios';
import _ from 'lodash';
import { $getId } from '../utils';

export const getAllData = (data) => async (dispatch, getState) => {
  let list = getState().pokemonData || [];
  let tmp_list = [...list];
  let pokemonAPI = [];
  let speciesAPI = [];
  data.forEach(el => {
    const id = $getId(el.url)
    if(!tmp_list.find(el=>el.id==id)){
      pokemonAPI.push(axios.get(el.url))
    }
  })
  let pokemon = await Promise.all(pokemonAPI);
  pokemon = pokemon.map(el => {
    el.data.pokemonId = $getId(el.config.url);
    return el.data;
  });
  
  pokemon.forEach(el=>{
    speciesAPI.push(axios.get(el.species.url));
  })

  let species = await Promise.all(speciesAPI);
  species = species.map(el => {
    el.data.speciesId = $getId(el.config.url);
    return el.data;
  });
  
  pokemon.forEach((el, index) => {
    let tmp = Object.assign({}, el, species[index]);
    tmp_list.push(tmp)
  })
  dispatch({
    type: "ADD_DATA",
    data: tmp_list,
  })
}

export const getEvolution = (url) => async (dispatch, getState) => {
  function getAllEvolutions(data, res) {
    //TODO 以蚊香蝌蚪來說 可能不只一種狀況
    res = res ? res : []
    res.push(data.species)
    if (data.evolves_to.length !== 0) {
      getAllEvolutions(data.evolves_to[0], res)
    }
    return res;
  }
  try {
    const id = $getId(url)
    let tmpState = getState().evolution;
    let nameArray = [];
    let picArray = [];
    const list = getState().pokemonData;

    if (!tmpState.find(el => el.id === id)) {
      const { data } = await axios.get(url);
      let chain = data.chain;
      let api = [];
      chain = getAllEvolutions(chain);

      chain.forEach(async (el) => {
        const id = $getId(el.url)
        const item = list.find(el => el.speciesId == id);
        if(!item) {
          //因為可能不存在過，所以要重新打api找
          api.push(axios.get(el.url));
          api.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${el.name}`));
          //需要保持排序所以先把空的推進去
          nameArray.push('');
          picArray.push('');
        }else{
          nameArray.push(item.names.find(e => e.language.name === 'zh-Hant').name);
          picArray.push(item.sprites.other.dream_world.front_default)
        }
      })

      if(api.length>0){
        let res = await Promise.all(api);
        res = res.map(el=>el.data);
        const tmp = Object.assign({}, res[0], res[1]);
        nameArray.forEach((el,index)=>{
          if(el==='') {
            nameArray[index] = tmp.names.find(e => e.language.name === 'zh-Hant').name;
            picArray[index] = tmp.sprites.other.dream_world.front_default;
          }
        })
      }
      tmpState.push({
        id: id,
        chain_name: nameArray,
        chain_pic: picArray,
      })
      dispatch({
        type: "ADD_EVOLUTION",
        data: tmpState
      })
    }
  } catch (err) {
    console.log(err)
  }

  return false;
}