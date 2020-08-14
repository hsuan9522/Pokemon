import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";

import { useEffect } from "react";
import axios from "axios";

const PokeCard = (props) => {
  useEffect(() => {
    async function getEachPokemon() {
      try {
        let id = props.data.url.match(/\/(\d.*)\/$/g);
        id = id[0].replace(/\//g, "");
        const res = axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        console.log("---", res);
      } catch (err) {
        console.log(err);
      }
    }
    getEachPokemon();
  }, []);

  function getId(url) {
    let id = url.match(/\/(\d.*)\/$/g);
    id = id[0].replace(/\//g, "");
    return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;
  }

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
        className="card-wrapper__img"
        image={getId(props.data.url)}
        title="Live from space album cover"
      ></CardMedia>
    </Card>
  );
};

export default PokeCard;
