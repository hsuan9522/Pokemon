import { useEffect, useState } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

import TypeTag from "./typeTag"

const PokeCard = (props) => {
  const [pic, setPic] = useState(null);
  const [id, setId] = useState(null);
  const [name, setName] = useState(props.data.name);
  const [all ,setAll] = useState(null);

  useEffect(() => {
    async function getEachPokemon() {
      try {
        const { data: data } = await axios.get(props.data.url); //pokemon那隻
        const { data: species_res } = await axios.get(data.species.url); //species那隻

        //把兩隻api的資料merge起來
        let tmp = Object.assign({}, data, species_res);
        setAll(tmp)

        data.sprites.other['official-artwork'].front_default ? setPic(data.sprites.other['official-artwork'].front_default) : setPic('/img/no-image.jpg');
        setId(data.id);
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
      <Card className="card-wrapper p-3" onClick={()=>props.handleClick(all)}>
        { all &&
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
            className={`card-wrapper__img ${pic ==='/img/no-image.jpg'? '' : 'has-pic'}`}
            image={pic}
            title="Live from space album cover"
          ></CardMedia>
        }
      </Card>
  );
};

export default PokeCard;
