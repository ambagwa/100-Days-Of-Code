//Displays a list of new items

import Masonry from "react-masonry-css";
import NewsCard from "./NewsCard";

const NewsList = ({ newsArticles }) => {
  const breakpoints = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <Masonry
      breakpointCols={3}
      className="my-masonry-grid"
      columnClassName="my-masonry-grid_column"
    >
      {newsArticles.map((newsArticle) => (
          <NewsCard key={newsArticle.url} newsArticle={newsArticle} />
      ))}
    </Masonry>
  );
};

export default NewsList;
