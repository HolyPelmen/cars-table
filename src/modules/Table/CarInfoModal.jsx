import { useContext } from "react";
import { CarsContext } from "../../App";
import FormButtonGroup from "./FormButtonGroup";

export default function CarInfoModal(props) {
  const { cars, setCars, setEditModalWindow } = useContext(CarsContext);

  const handleClick = (event) => {
    if (event.target.value === "cancel") {
      if (!props.isForEdit) {
        setCars((prevCars) => prevCars.slice(0, -1));
      }
      setEditModalWindow(0);
    }
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    const newData = new FormData(event.target);

    const formDataObj = {};
    newData.forEach((value, key) => {
      if (value) formDataObj[key] = value;
    });
    formDataObj.availability = Boolean(formDataObj.availability);

    const updatedCars = cars.map((car) =>
      car.id === props.carId ? { ...car, ...formDataObj } : car
    );
    setCars(updatedCars);

    setEditModalWindow(0);
  };

  if (props.carId > cars.slice(-1)[0].id) {
    cars.push({
      id: props.carId,
      car: "",
      car_model: "",
      car_color: "",
      car_model_year: "",
      car_vin: "",
      price: "",
      availability: false,
    });
  }

  const neededCar = cars.find((x) => x.id === props.carId);
  return (
    <>
      <form onSubmit={handleSubmit} id={"modalForm"}>
        <label htmlFor="company">Change Company</label>
        <input
          type="text"
          name="car"
          id=""
          placeholder={neededCar.car}
          disabled={props.isForEdit}
        />

        <label htmlFor="model">Change Model</label>
        <input
          type="text"
          name="car_model"
          id=""
          placeholder={neededCar.car_model}
          disabled={props.isForEdit}
        />

        <label htmlFor="vin">Change VIN</label>
        <input
          type="text"
          name="car_vin"
          id=""
          placeholder={neededCar.car_vin}
          disabled={props.isForEdit}
        />

        <label htmlFor="color">Change Color</label>
        <input type="text" name="car_color" id="" placeholder={neededCar.car_color} />

        <label htmlFor="year">Change Year</label>
        <input
          type="text"
          name="car_model_year"
          id=""
          placeholder={neededCar.car_model_year}
          disabled={props.isForEdit}
        />

        <label htmlFor="price">Change Price</label>
        <input type="text" name="price" id="" placeholder={neededCar.price} />

        <div className="form__availability">
          <label htmlFor="availability">Is Available?</label>
          <input
            type="checkbox"
            name="availability"
            id=""
            defaultChecked={neededCar.availability}
          />
        </div>
        <FormButtonGroup onClick={handleClick} />
      </form>
      <div className="blocker"></div>
    </>
  );
}
