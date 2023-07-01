import { useContext } from "react";
import { CarsContext } from "../../App";

export default function ActionMenu(props) {
  const editVar = "Edit";
  const deleteVar = "Delete";

  const { openEditModalWindow, openDeleteModalWindow } = useContext(CarsContext);
  const handleClick = (event) => {
    if (event.target.innerText === editVar) openEditModalWindow(props.id);
    else if (event.target.innerText === deleteVar) openDeleteModalWindow(props.id);
  };
  return (
    <div className="dropdown">
      <button className="dropbtn">&#9660;</button>
      <div className="dropdown-content">
        <a href="http://" onClick={handleClick}>
          {editVar}
        </a>
        <a href="http://" onClick={handleClick}>
          {deleteVar}
        </a>
      </div>
    </div>
  );
}
