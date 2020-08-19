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

import DescTab from "./descTab";


const PopupDetail = (props) => {
  const details = props.details;
  const [name, setName] = useState(null);
  const [genera, setGenera] = useState(null);
  const [desc, setDesc] = useState([]);

  function makeDescClear(data){
    data.map(el => {
      el.text = el.flavor_text.replace(/\s/g, ' ').toLowerCase();
      return el;
    })
    let tmp = Object.values(_.groupBy(data, (el) => el.text));
    //group到一半看要不要在整理或是這樣就好
    setDesc(tmp)
  }

  useEffect(() => {
    setName(details.names.find(el => el.language.name === 'zh-Hant').name)
    setGenera(details.genera.find(el => el.language.name === 'zh-Hant').genus)
    let desc_tmp = details.flavor_text_entries.filter(el => el.language.name === 'zh-Hant');
    if (desc_tmp.length === 0) desc_tmp = details.flavor_text_entries.filter(el => el.language.name === 'en'); //沒中文抓英文
    makeDescClear(desc_tmp)
  }, [])

  return (
    <div>
      <Dialog onClose={props.handleClose} className="popup-wrapper" aria-labelledby="customized-dialog-title" open={true}>
        <MuiDialogTitle disableTypography className="popup-wrapper__title">
          <div>
            <Typography variant="h5" className="mb-2">{name}</Typography>
            <Chip label={genera} variant="outlined" size="small" />
          </div>
          <IconButton aria-label="close" onClick={() => props.handleClose()}>
            <CloseIcon />
          </IconButton>
        </MuiDialogTitle>
        <MuiDialogContent className="popup-wrapper__content" dividers>
          <div>
            <div>
              <Typography variant="h6" className="mb-1">Description</Typography>
              <DescTab data={desc}></DescTab>
            </div>
            <div className="picture">
              <img src={details.sprites.other.dream_world.front_default} />
            </div>
          </div>
        </MuiDialogContent>
        <MuiDialogActions>
          123
        </MuiDialogActions>
      </Dialog>
    </div>
  )
}

export default PopupDetail;