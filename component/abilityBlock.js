import { useEffect, useState } from "react";
import axios from "axios";
import Typography from '@material-ui/core/Typography';
import { LinearProgress } from "@material-ui/core";

const AbilityBlock = (props)=>{
  const ability = props.ability;
  const [abilityHidden, setAbilityHidden] = useState([])
  const [abilityDetails, setAbilityDetails] = useState([])
  useEffect(() => {
    async function getAbility(){
      const api = []
      try{
        let hidden = [];
        ability.forEach(el=>{
          hidden.push(el.is_hidden)
          api.push(axios.get(el.ability.url))
        })
        setAbilityHidden(hidden);

        const res = await Promise.all(api);
        const tmp = res.map(el=>el.data);
        setAbilityDetails(tmp);
      }catch(err){
        console.log(err)
      }
    }
    getAbility();
  },[])

  function getAbilityName(data){
    return data.names.find(el => el.language.name === 'zh-Hant').name
  }

  function getAbilityDescription(data){
    let tmp = data.flavor_text_entries.filter(el => el.language.name === 'zh-Hant');
    if (tmp.length === 0) tmp = data.flavor_text_entries.filter(el => el.language.name === 'en'); //沒中文抓英文
    let result = tmp.map(el => {
      el.text = el.flavor_text.replace(/\s/g, ' ').toLowerCase();
      return el;
    })
    result = Object.values(_.groupBy(result, (el) => el.text));
    return result
  }

  return (
    <div className="ability-wrapper p-2">
      { 
        abilityDetails.length!==0 ?
        abilityDetails.map((el,index)=>{
        return (
          <div key={el.name+'_'+index}>
            <div className="ability-wrapper__title">
              <Typography variant="subtitle1" className="font-weight-bold">
                {getAbilityName(el)}
                <small className="text-monospace text-black-50">{abilityHidden[index] && " /隱藏屬性"}</small>
              </Typography>
            </div>
            <div>
              {
                getAbilityDescription(el).map((el1,i)=>{
                  return (
                    <div key={el.name + index + '_' + i} className="ability-wrapper__content">
                      <div className="version-chip small">{el1.map((e, ii) => { return (<span key={el.name + index + '_' + i+'_'+ii}>{e.version_group.name.toUpperCase()}</span>) })}</div>
                      <div>{el1[0].flavor_text}</div>
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      })
      :
      <LinearProgress></LinearProgress>
     }
    </div>
  )
}

export default AbilityBlock;