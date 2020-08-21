import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import axios from "axios";

import PokeCard from "../component/card";
import Pagination from "../component/pagination";
import PopupDetail from "../component/popupDetail";

const Index = (props) => {
  const itemAmount = 20;
  const router = useRouter();
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const [details, setDetails] = useState({});
  const [hover, setHover] = useState(null);

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
    setOpen(true);
    setDetails(e);
  }
  async function getNewData(page) {
    //切頁
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${(page - 1) * itemAmount}&limit=20`
    );
    setData(res.data.results);
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
                key={el.name} onMouseEnter={() => setHover(index)} onMouseLeave={() => setHover(null)}>
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
    </div>
  );
};

Index.getInitialProps = async () => {
  const { data: data } = await axios.get("https://pokeapi.co/api/v2/pokemon");
  return {
    list: data
  };
};

export default Index;
