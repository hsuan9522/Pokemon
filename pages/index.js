import { useState, useEffect } from "react";
import { useDispatch, connect } from "react-redux";
import axios from "axios";

import IconButton from '@material-ui/core/IconButton';

import { getAllData } from "../redux/action.js";

import PokeCard from "../component/card";
import Pagination from "../component/pagination";
import PopupDetail from "../component/popupDetail";


const Index = (props) => {
  const itemAmount = 20;
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [hover, setHover] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setData(props.list.results);
  }, []);

  function changePage(page) {
    getNewData(page);
  }
  function handleClose() {
    setOpen(false);
  }

  function handleClick(e) {
    setHover(null)
    setOpen(true);
    setDetails(e);
  }
  async function getNewData(page) {
    //切頁
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * itemAmount}&limit=20`
    );
    setData(res.data.results);
    await dispatch(getAllData(res.data.results)); //pokemon & species 更多資料一起拿也存進redux
  }

  return (
    <div className="container">
      <h1 className="text-center p-3">Pokemon</h1>
      <div className="row">
        {data.length !== 0 &&
          data.map((el, index) => {
            return (
              <div className="col-lg-3  col-md-6 col-12 mb-3" 
                style={{ 
                  transform: hover === index ? "scale(1.2)" : "",
                  transition: "transform .3s", 
                  zIndex: hover === index ? "111111" : "1",
                  filter: hover === index ? "drop-shadow( 3px 4px 12px black )" : "" }} 
                  key={el.name} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)}
              >
                <PokeCard data={el} handleClick={handleClick}></PokeCard>
              </div>
            );
          })}
      </div>
      {
        open &&
        <PopupDetail handleClose={handleClose} open={open} details={details}></PopupDetail>
      }
      <div>
        <Pagination
          allCount={props.list.count}
          changePage={changePage}
        ></Pagination>
      </div>
      <IconButton className="github-icon" onClick={() => { window.open("https://github.com/hsuan9522/Pokemon", "_blank")}}>
        <img src="/img/github-icon.png"/>
      </IconButton>
    </div>
  );
};

Index.getInitialProps = async ({ reduxStore}) => {
  const { data: data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
  await reduxStore.dispatch(getAllData(data.results))
  return {
    list: data
  };
};


export default Index;
