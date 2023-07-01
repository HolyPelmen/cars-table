import { useState, useEffect, createContext } from "react";
import TableRow from "./modules/Table/TableRow";
import SearchBar from "./modules/SearchBar";
import IteratePages from "./modules/IteratePages/IteratePages";
import CarInfoModal from "./modules/Table/CarInfoModal";
import DeleteModal from "./modules/Table/DeleteModal";
import { v4 as uuidv4 } from "uuid";

export const PageContext = createContext();
export const CarsContext = createContext();

export default function App() {
  const elOnPage = 10;
  const [cars, setCars] = useState([]);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [editModalWindow, setEditModalWindow] = useState(0);
  const [deleteModalWindow, setDeleteModalWindow] = useState(0);

  const getSearchEntry = (searchEntry) => setSearchInput(searchEntry);
  const openEditModalWindow = (modal) => setEditModalWindow(modal);
  const openDeleteModalWindow = (modal) => setDeleteModalWindow(modal);

  const handleAddButton = () => {
    const newId = cars.slice(-1)[0].id + 1;
    setEditModalWindow(newId);
  };

  useEffect(() => {
    if (window.localStorage && window.localStorage.getItem("carsData") !== null) {
      const storedCarsData = JSON.parse(window.localStorage.getItem("carsData"));
      setCars(storedCarsData);
    } else {
      fetch("https://myfakeapi.com/api/cars/")
        .then((res) => res.json())
        .then((data) => {
          setCars(data.cars);
          window.localStorage.setItem("carsData", JSON.stringify(data.cars));
        });
    }
  }, []);

  useEffect(() => {
    if (cars.length > 0) {
      window.localStorage.setItem("carsData", JSON.stringify(cars));
    }
  }, [cars]);

  const filteredData = cars.filter((car) => {
    if (searchInput === "") return car;
    return Object.values(car).toString().toLowerCase().includes(searchInput);
  });

  const lastPage = Math.ceil(Object.keys(filteredData).length / elOnPage);

  return (
    <>
      <CarsContext.Provider
        value={{ cars, setCars, setEditModalWindow, setDeleteModalWindow }}
      >
        {editModalWindow ? (
          <CarInfoModal
            carId={editModalWindow}
            isForEdit={editModalWindow <= cars.slice(-1)[0].id}
          />
        ) : null}
        {deleteModalWindow ? <DeleteModal carId={deleteModalWindow} /> : null}
      </CarsContext.Provider>
      <div className="top-container">
        <SearchBar onChange={getSearchEntry} />
        <button className="top-container__add-new-but" onClick={handleAddButton}>
          Add New Car
        </button>
      </div>
      <table className="main-table">
        <thead>
          <tr className="main-table__row">
            <th className="main-table__col company">Company</th>
            <th className="main-table__col model">Model</th>
            <th className="main-table__col">VIN</th>
            <th className="main-table__col color">Color</th>
            <th className="main-table__col">Year</th>
            <th className="main-table__col">Price</th>
            <th className="main-table__col availability">Availability</th>
            <th className="main-table__col actions">Actions column</th>
          </tr>
        </thead>
        <tbody>
          <CarsContext.Provider value={{ openEditModalWindow, openDeleteModalWindow }}>
            {filteredData.map((car, iterator = 0) => {
              ++iterator;
              const targetIterator = page * elOnPage;
              if (iterator > targetIterator || iterator <= targetIterator - elOnPage)
                return;
              return <TableRow key={uuidv4()} car={car}></TableRow>;
            })}
          </CarsContext.Provider>
        </tbody>
      </table>
      <div className="page-iterator__container">
        <PageContext.Provider value={{ page, setPage, lastPage }}>
          <IteratePages />
        </PageContext.Provider>
      </div>
    </>
  );
}
