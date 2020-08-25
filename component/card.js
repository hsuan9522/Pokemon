import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import TypeTag from "./typeTag"

import { $getId } from "../utils";

const PokeCard = (props) => {
  const all = useSelector(state => {
    const id = $getId(props.data.url);
    return state.pokemonData.find(el => el.pokemonId == id);
  })
  const [pic, setPic] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(props.data.name);


  useEffect(() => {
    if (all) {
      all.sprites.other['official-artwork'].front_default ? setPic(all.sprites.other['official-artwork'].front_default) : setPic('/img/no-image.jpg');
      setId(all.id);
      setName(all.names.find(el => {
        return el.language.name == "zh-Hant"
      }).name)
    }
  }, [all]);

  return (
    <Card className="card-wrapper p-3" onClick={() => props.handleClick(all)}>
      {all &&
        <div>
          <Avatar className="avatar">
            <img src={all.sprites.front_default} className="avatar__img"></img>
          </Avatar>
          <div className="card-wrapper__detail">
            <CardContent className="card-wrapper__content">
              <Typography component="h6" variant="h6" className="p-0">
                {name}
              </Typography>
              <TypeTag data={all.types} id={id} orientation="vertical"></TypeTag>
            </CardContent>
          </div>
        </div>
      }

      {!pic ?
        <div className="card-wrapper__img d-flex justify-content-center align-items-center">
          <CircularProgress></CircularProgress>
        </div>
        :
        <CardMedia
          className={`card-wrapper__img ${pic === '/img/no-image.jpg' ? '' : 'has-pic'}`}
          image={pic}
          title="Live from space album cover"
        ></CardMedia>
      }
    </Card>
  );
};

export default PokeCard;
