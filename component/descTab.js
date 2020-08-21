import { useEffect, useState } from "react"
import IconButton from '@material-ui/core/IconButton';
import Chip from '@material-ui/core/Chip';

const DescTab = (props) => {
  const [showText, setShowText] = useState();
  const [hover, setHover] = useState(null);
  const [clickItemIndex, setClickItemIndex] = useState(0)
  const description = props.data;

  useEffect(()=>{
    getVersionDescription(0);
  },[])

  function handleClick(index){
    setClickItemIndex(index)
    getVersionDescription(index)
  }

  function getVersionDescription(index){
    let tmp = {}
    description[index].forEach(el => {
      tmp.text = el.flavor_text,
        tmp.version = tmp.version ? tmp.version : [];
      tmp.version.push(el.version.name)
    })
    setShowText(tmp);
  }

  return (
    <div className="descrption-wrapper">
      <div className="btn-group">
        {
          description.map((el,index)=>{
            return (
              <IconButton aria-label="delete" className="version-btn-wrapper" onClick={() => handleClick(index)} key={index} onMouseEnter={()=>setHover(index)} onMouseLeave={()=>setHover(null)}>
              { clickItemIndex!==index ?
                <img src="/img/pokemon-icon.png" style={{transform: hover === index ? "scale(1.2)": ""}}/>
                :
                <img src="/img/pokemon-icon_red.png" style={{ transform: hover === index ? "scale(1.2)" : "" }}/>
              }
            </IconButton>)
          })
        }
        
      </div>
      <div className="description-wrapper__content mb-3">
        {showText && showText.text}
      </div>
      <div className="text-right">
        {
          showText &&
          <Chip size="small" label={showText.version.join('/ ').toUpperCase()} />
        }
      </div>
    </div>
  )
}

export default DescTab;