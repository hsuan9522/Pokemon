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
  function getAllEvolutions(data, res, index, parent) {
    //TODO 以蚊香蝌蚪來說 可能不只一種狀況（第四頁）
    res = res ? res : []
    data.species.index = index;
    data.species.parent = parent;
    res.push(data.species)
    if (data.evolves_to.length !== 0) {
      data.evolves_to.forEach(el=>{
        getAllEvolutions(el, res, index+1, data.species.name)
      })
    }
    return res;
  }
  try {
    const id = $getId(url)
    let tmpState = getState().evolution;
    let testState = getState().test;
    let nameArray = [];
    let picArray = [];
    let testArray = [];
    const list = getState().pokemonData;

    if (!tmpState.find(el => el.id === id)) {
      const { data } = await axios.get(url);
      let chain = data.chain;
      console.log('origin', chain)
      let api = [];
      chain = getAllEvolutions(chain,[],1);
      console.log(chain);
      chain.forEach(async (el) => {
        const name = el.name;
        const item = list.find(el => el.name == name);
        if(!item) {
          //因為可能不存在過，所以要重新打api找
          api.push(axios.get(el.url));
          api.push(axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`));
          //需要保持排序所以先把空的推進去
          nameArray.push('');
          testArray.push('')
          picArray.push('');
        }else{
          testArray.push({
            name: item.name,
            c_name: item.names.find(e => e.language.name === 'zh-Hant').name,
            pic: item.sprites.other.dream_world.front_default,
            parent: el.parent
          })
          nameArray.push(item.names.find(e => e.language.name === 'zh-Hant').name);
          picArray.push(item.sprites.other.dream_world.front_default)
        }
      })

      if(api.length>0){
        let res = await Promise.all(api);
        res = res.map(el=>el.data);
        let i = 0;
        nameArray.forEach((el,index)=>{
          if(el==='') {
            const tmp = Object.assign({}, res[i], res[i+1]);
            nameArray[index] = tmp.names.find(e => e.language.name === 'zh-Hant').name;
            picArray[index] = tmp.sprites.other.dream_world.front_default ? tmp.sprites.other.dream_world.front_default : tmp.sprites.other['official-artwork'].front_default;
            testArray[index] = {
              name: tmp.name,
              c_name: tmp.names.find(e => e.language.name === 'zh-Hant').name,
              pic: tmp.sprites.other.dream_world.front_default,
              parent: chain[index].parent
            };
            
            i=i+2;
          }
        })
      }
      let tree;
      testArray.forEach(el=>{
        if (!el.parent) {
          tree = {
            name: el.name,
            pic: el.pic,
            next: null
          }
        } else {
          find(tree, el)
        }
      })

      testState.push({
        id: id,
        chain: tree
      })
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

function find(data, el) {
  if (Array.isArray(data)) {
    data.forEach(e => {
      find(e, el)
    })
  } else if (data.name == el.parent) {
    data.next = data.next || [];
    data.next.push({
      name: el.name,
      pic: el.pic,
      next: null
    })
  } else {
    find(data.next, el)
  }
}