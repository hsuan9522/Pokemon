import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getEvolution } from "../redux/action";

const Evolution = (props) =>{
  const dispatch = useDispatch();
  const url = props.data.url;
  const id = url.match(/\/(\d.*)\/$/g)[0].replace(/\//g, "");
  const evolutionData = useSelector(state=>{
    return state.evolution.find(el=>el.id===id)
  });
  
  // const [evolutionData, setEvolutionData] = useState(null);
  
  useEffect(() => {
    dispatch(getEvolution(url))
    // const evolutionData_tmp = evolutionList.find(el => el.id === id)
    // setEvolutionData(evolutionData_tmp)
    // console.log('----', evolutionData)
  }, [])
  

  console.log('url',url)
  return (
    <div>
      {
        evolutionData &&
          <div className="evolution-wrapper">
            {
              evolutionData.chain_name.map((el, index) => {
                return (
                  <div key={el} className="">
                    <div className="dot-wrapper">
                      <div className="dot"></div>
                      <div className="name">{el}</div>
                    </div>
                    {
                      index !== evolutionData.chain_name.length - 1 &&
                      <div className="line"></div>
                    }
                  </div>
                )
              })
            }
          </div>
      }
    </div>
  )
}

export default Evolution;