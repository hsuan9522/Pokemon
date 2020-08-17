import Pagination from "@material-ui/lab/Pagination";
import { useState } from "react";

const PaginationI = (props) => {
  const [page, setPage] = useState(1);
  const handleChange = (event, value) => {
    setPage(value);
    props.changePage(value);
  };

  return (
    <div className="d-flex justify-content-center p-4">
      <Pagination
        count={Math.ceil(props.allCount / 20)}
        onChange={handleChange}
      />
    </div>
  );
};

export default PaginationI;
