import { useEffect, useState } from "react";
import axios from "axios";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Avatar from '@material-ui/core/Avatar';

import TypeTag from "./typeTag"

const PokeCard = (props) => {
  const [pic, setPic] = useState('/img/no-image.jpg');
  const [type, setType] = useState([]);
  const [id, setId] = useState(null);
  const [name, setName] = useState(props.data.name);
  const [species, setSpecies] = useState(null);
  const [details, setDetails] = useState(null);
  const [all ,setAll] = useState({});

  useEffect(() => {
    async function getEachPokemon() {
      try {
        const {data: data} = await axios.get(props.data.url);
        setDetails(data);
        data.sprites.other['official-artwork'].front_default ? setPic(data.sprites.other['official-artwork'].front_default) : setPic('/img/no-image.jpg');
        setType(data.types);
        setId(data.id);
        const { data: species_res } = await axios.get(data.species.url);
        setSpecies(species_res);
        setName(species_res.names.find(el => {
          return el.language.name == "zh-Hant"
        }).name )

        let tmp = Object.assign({}, data, species_res);
        setAll(tmp)
      } catch (err) {
        console.log(err);
      }
    }
    getEachPokemon();
  }, []);
  
  return (
      <Card className="card-wrapper p-3" onClick={()=>props.handleClick(all)}>
        { details &&
          <Avatar className="avatar">
          <img src={details.sprites.front_default} className="avatar__img"></img>
          </Avatar>
        }
        <div className="card-wrapper__detail">
          <CardContent className="card-wrapper__content">
            <Typography component="h6" variant="h6" className="p-0">
              {name}
            </Typography>
            <TypeTag data={type} id={id} orientation="vertical"></TypeTag>
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
