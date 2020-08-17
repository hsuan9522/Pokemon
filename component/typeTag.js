import Chip from '@material-ui/core/Chip';

const TypeTag = (props) => {
  const mapType = {
    normal: { name: "一般", color: "antiquewhite" },
    fighting: { name: "格鬥", color: "coral" },
    flying: { name: "飛行", color: "lightblue" },
    poison: { name: "毒", color: "mediumorchid" },
    ground: { name: "地面", color: "burlywood" },
    rock: { name: "岩石", color: "peru" },
    bug: { name: "蟲", color: "darkseagreen" },
    ghost: { name: "幽靈", color: "silver" },
    steel: { name: "鋼", color: "slategray" },
    fire: { name: "火", color: "orangered" },
    water: { name: "水", color: "cornflowerblue" },
    grass: { name: "草", color: "olivedrab" },
    electric: { name: "電", color: "gold" },
    psychic: { name: "超能力", color: "plum" },
    ice: { name: "冰", color: "paleturquoise" },
    dragon: { name: "龍", color: "steelblue" },
    dark: { name: "暗", color: "slategray" },
    fairy: { name: "妖精", color: "thistle" },
    unknown: { name: "未知", color: "grey" },
    shadow: { name: "影子", color: "lavender" },
  }
  return (
    <div className="tag-wrapper">
      {
        props.data.map((el,index)=>{
          const res = mapType[el.type.name]
          const style = {
            backgroundColor: res.color
          }
          return <Chip label={res.name} style={style} key={`${props.id}_${index}`}/>
        })
      }
      
    </div>
  )
}

export default TypeTag;