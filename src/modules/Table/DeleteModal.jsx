import { useContext } from "react";
import { CarsContext } from "../../App";
import FormButtonGroup from "./FormButtonGroup";

export default function DeleteModal(props) {
  const { cars, setCars, setDeleteModalWindow } = useContext(CarsContext);

  const clickHandler = (event) => {
    setDeleteModalWindow(0);
    if (event.target.value === "cancel") return;
    setCars(
      cars.filter((x) => {
        return x.id !== props.carId;
      })
    );
  };
  return (
    <>
      <div className="modal-window__delete-container">
        Are you sure you want to delete this entity?
        <FormButtonGroup onClick={clickHandler} />
      </div>
      <div className="blocker"></div>
    </>
  );
}
