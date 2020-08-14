import Link from "next/link";
import { useRouter } from "next/router";
import axios from "axios";

import PokeCard from "../component/card";
import Pagination from "../component/pagination";
import { useState, useEffect } from "react";

const Index = (props) => {
  const itemAmount = 20;
  const router = useRouter();
  const [data, setData] = useState([]);
  useEffect(() => {
    setData(props.list.results);
  }, []);

  function changePage(page) {
    getNewData(page);
  }

  async function getNewData(page) {
    const res = await axios.get(
      `https://pokeapi.co/api/v2/pokemon?offset=${page * itemAmount}&limit=20`
    );
    setData(res.data.results);
  }
  return (
    <div className="container">
      Hello World.
      <Link href="/about">
        <span>About</span>
      </Link>
      <div
        onClick={() => {
          router.push("/about");
        }}
      >
        Click
      </div>
      <div className="row">
        {data.length !== 0 &&
          data.map((el) => {
            return (
              <div className="col-md-3 col-6 mb-3" key={el.name}>
                <PokeCard data={el}></PokeCard>
              </div>
            );
          })}
      </div>
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
  const res = await axios.get("https://pokeapi.co/api/v2/pokemon");
  const data = res.data;
  return {
    list: data
  };
};

export default Index;
