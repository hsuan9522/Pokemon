import { useEffect, useState } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import TypeTag from "./typeTag"

const PokeCard = (props) => {
  const [pic, setPic] = useState('/img/no-image.jpg');
  const [type, setType] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState(props.data.name);
  const [avatar, setAvatar] = useState('')

  useEffect(() => {
    async function getEachPokemon() {
      try {
        const id_tmp = props.data.url.match(/\/(\d.*)\/$/g)[0].replace(/\//g, "");
        setId(id_tmp);
        const {data: data} = await axios.get(props.data.url);
        data.sprites.other['official-artwork'].front_default ? setPic(data.sprites.other['official-artwork'].front_default) : setPic('/img/no-image.jpg');
        setType(data.types);
        setAvatar(data.sprites.front_default);
        const { data: species_res } = await axios.get(data.species.url);
        setName(species_res.names.find(el => {
          return el.language.name == "zh-Hant"
        }).name )
      } catch (err) {
        console.log(err);
      }
    }
    getEachPokemon();
  }, []);

  return (
    <Card className="card-wrapper p-3">
      { avatar &&
        <Avatar className="avatar">
          <img src={avatar} className="avatar__img"></img>
        </Avatar>
      }
      <div className="card-wrapper__detail">
        <CardContent className="card-wrapper__content">
          <Typography component="h6" variant="h6" className="p-0">
            {name}
            {/* {getId(props.data.url)} */}
          </Typography>
          <TypeTag data={type} id={id}></TypeTag>
        </CardContent>
      </div>
      <CardMedia
        className={`card-wrapper__img ${pic ==='/img/no-image.jpg'? '' : 'has-pic'}`}
        image={pic}
        title="Live from space album cover"
      ></CardMedia>
    </Card>
  );
};

export default PokeCard;
