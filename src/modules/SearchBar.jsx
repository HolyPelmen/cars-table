export default function SearchBar(props) {
  const inputHandler = (e) => {
    let convertedToLowerCase = e.target.value.toLowerCase();
    props.onChange(convertedToLowerCase);
  };
  return (
    <input
      type="text"
      name="searchBar"
      id="searchBar"
      onChange={inputHandler}
      placeholder="Search..."
      className="top-container__search-bar"
    />
  );
}
