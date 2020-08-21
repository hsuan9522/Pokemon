import Chip from '@material-ui/core/Chip';

const TypeTag = (props) => {
  const mapType = {
    normal: { name: "一般", color: "#919AA2", img: "/img/type/normal.png"},
    flying: { name: "飛行", color: "#8AA9E3", img: "/img/type/flying.png"},
    psychic: { name: "超能力", color: "#FE6675", img: "/img/type/psychic.png"},
    fire: { name: "火", color: "#FE9841", img: "/img/type/fire.png"},
    water: { name: "水", color: "#3990DC", img: "/img/type/water.png"},
    bug: { name: "蟲", color: "#83C400", img: "/img/type/bug.png"},
    electric: { name: "電", color: "#FAD300", img: "/img/type/electric.png"},
    rock: { name: "岩石", color: "#C8B786", img: "/img/type/rock.png"},
    grass: { name: "草", color: "#38C04B", img: "/img/type/grass.png"},
    ghost: { name: "幽靈", color: "#4D68B2", img: "/img/type/ghost.png"},
    ice: { name: "冰", color: "#4ED1C0", img: "/img/type/ice.png"},
    dragon: { name: "龍", color: "#0D6DC9", img: "/img/type/dragon"},
    fighting: { name: "格鬥", color: "#DF2F6A", img: "/img/type/flighting.png"},
    dark: { name: "惡", color: "#5B5466" , img: "/img/type/dark.png"},
    steel: { name: "鋼", color: "#5B8EA2", img: "/img/type/steel.png"},
    poison: { name: "毒", color: "#B564CE", img: "/img/type/posion.png"},
    ground: { name: "地面", color: "#E77336", img: "/img/type/ground.png"},
    fairy: { name: "妖精", color: "#FB87EB", img: "/img/type/fairy.png"},
    unknown: { name: "未知", color: "#e0e0e0", img: "/img/type"},
    shadow: { name: "影子", color: "#e6e6fa", img: "/img/type"},
  }
  return (
    <div className="tag-wrapper" style={{ flexDirection: `${props.orientation==="vertical"? "column" : "row"}`}}>
      {
        props.data.map((el, index) => {
          const res = mapType[el.type.name]
          const style = {
            backgroundColor: res.color,
          }
          return (
            <div key={`${props.id}_${index}`} className="d-flex type-wrapper" style={{ marginRight: `${props.orientation === "vertical" ? "" : "3px"}`}}>
              <div style={style} className="pr-1 type-icon">
                <img src={res.img}/>
              </div>
              <div className="type-name">{res.name}</div>
            </div>
          )
        })
      }
    </div>
  )
}

export default TypeTag;