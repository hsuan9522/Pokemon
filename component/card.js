import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { useEffect, useState } from "react";
import axios from "axios";

const PokeCard = (props) => {
  const [pic, setPic] = useState('/img/no-image.jpg')
  useEffect(() => {
    async function getEachPokemon() {
      try {
        let id = props.data.url.match(/\/(\d.*)\/$/g);
        id = id[0].replace(/\//g, "");
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = res.data;
        data.sprites.other['official-artwork'].front_default ? setPic(data.sprites.other['official-artwork'].front_default) : setPic('/img/no-image.jpg')
        ;
      } catch (err) {
        console.log(err);
      }
    }
    getEachPokemon();
  }, []);

  return (
    <Card className="card-wrapper p-3">
      <div className="card-wrapper__detail">
        <CardContent className="card-wrapper__content test">
          <Typography component="h6" variant="h6" className="p-0">
            {props.data.name}
            {/* {getId(props.data.url)} */}
          </Typography>
          {/* <Typography variant="subtitle1" color="textSecondary">
            Mac Miller
          </Typography> */}
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
