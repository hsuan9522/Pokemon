import { useEffect, useState } from 'react';
import _ from "lodash";
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Chip from '@material-ui/core/Chip';
import StarIcon from '@material-ui/icons/Star';
import ArrowForwardIosRoundedIcon from '@material-ui/icons/ArrowForwardIosRounded';
import ArrowBackIosRoundedIcon from '@material-ui/icons/ArrowBackIosRounded';

import DescTab from "./descTab";
import AbilityBlock from "./abilityBlock";
import Evolution from "./evolution";
import TypeTag from "./typeTag";

const PopupDetail = (props) => {
  const details = props.details;
  const [name, setName] = useState(null);
  const [genera, setGenera] = useState(null);
  const [desc, setDesc] = useState([]);
  
  const statMap = {
    hp: { name: "HP", color:"#ffb6b6"},
    attack: { name: "Atk", color:"#ffd2b2"},
    defense: { name: "Def", color:"#f7e6a1"},
    "special-attack": { name: "Sp.Atk", color:"#bfcff5"},
    "special-defense": { name: "Sp.Def", color:"#c6e8b4"},
    speed: { name: "Speed", color:"#f1b2c6"}
  };

  console.log(details)
  function makeDescClear(data) {
    data.map(el => {
      el.text = el.flavor_text.replace(/\s/g, ' ').toLowerCase();
      return el;
    })
    let tmp = Object.values(_.groupBy(data, (el) => el.text));
    setDesc(tmp)
  }

  useEffect(() => {
    setName(details.names.find(el => el.language.name === 'zh-Hant').name)
    setGenera(details.genera.find(el => el.language.name === 'zh-Hant').genus)
    let desc_tmp = details.flavor_text_entries.filter(el => el.language.name === 'zh-Hant');
    if (desc_tmp.length === 0) desc_tmp = details.flavor_text_entries.filter(el => el.language.name === 'en'); //沒中文抓英文
    makeDescClear(desc_tmp)
  }, [])

  function renderStar(count,stat){
    if(count===0) return "-";
    let tmp = [];
    for(let i = 0; i < count; i++){
      tmp.push(<StarIcon className="star" key={`${stat}_${i+1}`}></StarIcon>)
    }
    return tmp;
  }

  return (
    <div>
      <Dialog onClose={props.handleClose} className="popup-wrapper" aria-labelledby="customized-dialog-title" open={true}>
        {/* //TODO 下一個，上一個的快捷按鈕 */}
        {/* <IconButton className="forward-btn" >
          <ArrowForwardIosRoundedIcon/>
        </IconButton>
        <IconButton className="back-btn">
          <ArrowBackIosRoundedIcon/>
        </IconButton> */}
        <MuiDialogTitle disableTypography className="popup-wrapper__title">
          <div>
            <Typography variant="h5" className="mb-2">{name}</Typography>
            <div className="d-flex align-items-center flex-wrap">
              <Chip label={genera} variant="outlined" size="small" className="mr-1" />&ensp;/ &ensp;
              <TypeTag data={details.types} outlined={true} size="small"></TypeTag>
            </div>
          </div>
          <IconButton aria-label="close" onClick={() => props.handleClose()}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <MuiDialogContent className="popup-wrapper__content" dividers>

          {/* DESCRIPTION */}
          <div className="mb-3">
            <Typography variant="h6" className="mb-1">Description</Typography>
            <DescTab data={desc}></DescTab>
          </div>

          {/* ABILITY */}
          <div className="mb-3">
            <Typography variant="h6" className="mb-1">Abilities</Typography>
            <AbilityBlock ability={details.abilities}></AbilityBlock>
          </div>

          {/* H&W DATA */}
          <div>
            <Typography variant="h6" className="mb-1">Stats</Typography>
            <div className="d-flex wh-block mb-3">
              <div className="w-50 py-2 pr-1 pl-2">
                <Typography variant="subtitle1" className="font-weight-bold">身高</Typography>
                <Typography variant="body1" className="">{details.height / 10} m</Typography>
              </div>
              <div className="w-50 py-2 pr-2 pl-1">
                <Typography variant="subtitle1" className="font-weight-bold">體重</Typography>
                <Typography variant="body1" className="">{details.weight / 10} kg</Typography>
              </div>
            </div>
          </div>

          {/* STAT */}
          <div className="d-flex justify-content-between stat-wrapper mb-3">
            { details.stats.map(el=>{
              return (
                <div style={{ backgroundColor:statMap[el.stat.name].color}} key={el.stat.name} className="stat-wrapper__block">
                  <div>{statMap[el.stat.name].name}</div>
                  <div className="d-flex flex-wrap justify-content-center">{renderStar(el.effort, el.stat.name)}</div>
                  <div>{el.base_stat}</div>
                </div>
              )
            })}
          </div>

          {/* EVOLUTION */}
          <div>
            <Typography variant="h6" className="mb-1">Evolution</Typography>
            <div>
              <Evolution data={details.evolution_chain}></Evolution>
            </div>
          </div>
          {/* <div className="picture">
            <img src={details.sprites.other.dream_world.front_default} />
          </div> */}

        </MuiDialogContent>
        <MuiDialogActions>
          
        </MuiDialogActions>
      </Dialog>
    </div>
  )
}

export default PopupDetail;