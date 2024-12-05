//Handles 'show more news' and 'clear results' actions

const Results = () => {
  return (
    <div className="container py-3">
      <div
        className="row row-cols-1 row-cols-md-3 g-2 position-relative"
        id="newsContainer"
      ></div>
      <div className="d-flex justify-content-center w-100">
        <button id="more-btn" class="btn btn-info z-3">
          Show more news
        </button>
      </div>
    </div>
  );
};
 export default Results;