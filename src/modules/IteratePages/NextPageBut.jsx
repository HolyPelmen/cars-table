import { useContext } from "react";
import { PageContext } from "../../App";

export default function NextPageBut() {
  const { page, setPage, lastPage } = useContext(PageContext);
  const clickHandler = () => {
    setPage(page + 1);
  };
  return (
    <button
      className="page-iterator__container-next"
      onClick={clickHandler}
      disabled={page >= lastPage}
    >
      &#9654;
    </button>
  );
}
