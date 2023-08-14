const Searcher = () => {
  return (
    <div className="container-fluid input-group mb-3">
      <input
        className="form-control"
        type="search"
        placeholder="Buscar Votacion"
        aria-label="Search"
      />

      <button className="btn btn-outline-success me-3" type="submit">
        Buscar
      </button>
    </div>
  );
};

export default Searcher;
