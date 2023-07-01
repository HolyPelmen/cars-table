import { useContext } from "react";
import { PageContext } from "../../App";

export default function PrevPageBut() {
  const { page, setPage } = useContext(PageContext);
  const clickHandler = () => {
    setPage(page - 1);
  };
  return (
    <button
      className="page-iterator__container-prev"
      onClick={clickHandler}
      disabled={page === 1}
    >
      &#9664;
    </button>
  );
}
