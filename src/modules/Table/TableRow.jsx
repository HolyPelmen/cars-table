import ActionMenu from "./ActionMenu";

export default function TableRow(props) {
  return (
    <>
      <tr className="main-table__row">
        <td className="main-table__col">{props.car.car}</td>
        <td className="main-table__col">{props.car.car_model}</td>
        <td className="main-table__col">{props.car.car_vin}</td>
        <td className="main-table__col">{props.car.car_color}</td>
        <td className="main-table__col">{props.car.car_model_year}</td>
        <td className="main-table__col">{props.car.price}</td>
        <td className="main-table__col">
          {props.car.availability ? "Available" : "Not available"}
        </td>
        <td className="main-table__col">
          <ActionMenu id={props.car.id} />
        </td>
      </tr>
    </>
  );
}
