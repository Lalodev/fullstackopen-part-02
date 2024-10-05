export const Filter = ({ search, setSearch }) => {
  const handleSearchName = (event) => {
    setSearch(event.target.value);
  };
  return (
    <div>
      Filter show with <input value={search} onChange={handleSearchName} />
    </div>
  );
};
