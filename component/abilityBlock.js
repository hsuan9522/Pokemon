import { useEffect, useState } from "react";
import axios from "axios";

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
        console.log(tmp)
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
    console.log('result',result);
    return result
  }

  return (
    <div>
      { abilityDetails.map((el,index)=>{
        return (
          <div>{
            getAbilityName(el)} {abilityHidden[index] && "隱藏屬性"}
            <div>
              {
                getAbilityDescription(el).map(el=>{
                  return (
                    <div>
                      {el.map(e => { return (<div>{e.version_group.name}</div>)})}
                      {el[0].flavor_text}
                    </div>
                  )
                })
              }
            </div>
          </div>
        )
      })
      }
    </div>
  )
}

export default AbilityBlock;