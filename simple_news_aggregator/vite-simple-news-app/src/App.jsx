import Header from "./components/Header";
import "./App.css";
import NewsList from "./components/NewsList";
import SearchInput from "./components/SearchInput";
import Spinner from "./components/Spinner";
import { useState } from "react";

export default function App() {
  const [loading, setLoading] = useState(false);
  const [dataArr, setDataArr] = useState([]);
  const [error, setError] = useState("");
  const apiKey = "ea302295a96940d99b4602a8c480c5da";
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;
  const [showPagination, setShowPagination] = useState(false);

  const fetchNews = async (userInput) => {
    const apiUrl = `https://newsapi.org/v2/everything?q=${userInput}&apiKey=${apiKey}`;
    /*
    fetch(apiUrl)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      });
    */

    try {
      setLoading(true);
      setError("");
      const response = await fetch(apiUrl);
      //Handle HTTP errors
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setDataArr(data.articles);
      setShowPagination(data.articles.length > 0);
    } catch (error) {
      //Handle network or other errors
      setError(error.message || "Someting went wrong");
    } finally {
      //Set loading to false once the data fetching is complete
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(dataArr.length / itemsPerPage);

  const currentData = dataArr.slice(
    (currentPage - 1) * itemsPerPage,
    itemsPerPage * currentPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="bg-altprimary">
      <Header />
      <SearchInput fetchSearchInput={fetchNews} />
      {loading && <Spinner />}
      {error && (
        <div className="alert alert-danger text-center" role="alert">
          {error}
        </div>
      )}
      {currentData.length > 0 && <NewsList newsArticles={currentData} />}
      {showPagination && totalPages > 0 && (
        <div className="d-flex justify-content-center">
          <ul className="pagination">
            <li className="page-item">
              <button
                className="btn btn-outline-info"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage >= totalPages || totalPages === 1}
              >
                &laquo;
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, index) => (
              <li className="page-item" key={index + 1}>
                <button
                  className={
                    currentPage === index + 1
                      ? "btn btn-outline-info active"
                      : "btn btn-outline-info"
                  }
                  onClick={() => handlePageChange(index + 1)}
                >
                  {index + 1}
                </button>
              </li>
            ))}
            <li className="page-item">
              <button
                className="btn btn-outline-info"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                &raquo;
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
}
