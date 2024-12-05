import { useState } from "react";

const SearchInput = ({ fetchSearchInput }) => {
  const [searchInput, setSearchInput] = useState("");

  const handleSearchInput = () => {
    if(searchInput) fetchSearchInput(searchInput);
  }

  return (
    <div className="container py-3">
      <div className="row justify-content-center">
        <div className="col-12 col-md-6">
          <div className="input-group">
            <span className="input-group-text">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-newspaper text-info"
                viewBox="0 0 16 16"
              >
                <path
                  d="M0 2.5A1.5 1.5 0 0 1 1.5 1h11A1.5 1.5 0 0 1 14 2.5v10.528c0 .3-.05.654-.238.972h.738a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 1 1 0v9a1.5 1.5 0 0 1-1.5 1.5H1.497A1.497 1.497 0 0 1 0 13.5zM12 14c.37 0 .654-.211.853-.441.092-.106.147-.279.147-.531V2.5a.5.5 0 0 0-.5-.5h-11a.5.5 0 0 0-.5.5v11c0 .278.223.5.497.5z"
                />
                <path
                  d="M2 3h10v2H2zm0 3h4v3H2zm0 4h4v1H2zm0 2h4v1H2zm5-6h2v1H7zm3 0h2v1h-2zM7 8h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2zm-3 2h2v1H7zm3 0h2v1h-2z"
                />
              </svg>
            </span>
            <input
              type="text"
              className="form-control"
              value={searchInput}
              onChange={e => setSearchInput(e.target.value)}
              aria-label="Enter the keyword to search for"
              id="searchInput"
              placeholder="Gen Z, Palestine, Trump..."
            />
            <button className="btn btn-outline-info" onClick={handleSearchInput}>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  )
};

export default SearchInput;