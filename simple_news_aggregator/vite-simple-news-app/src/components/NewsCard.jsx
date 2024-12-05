//Represents each news item

const NewsCard = ({ newsArticle }) => {
  //Extract the news details
  const { author, content, publishedAt, title, url, urlToImage } = newsArticle;

  return (
    <div className="col mb-2 news-card">
      <div className="card bg-altdarksubtle">
        <img src={urlToImage || "placeholder.jpg"} alt="news=image" className="card-img-top" />
        <div className="card-body">
          <h5 className="card-title">{title || "Unavailale title"}</h5>
          <p className="card-text">{content || "Unavailale content"}</p>
          <a
            target="_blank"
            href={url || "#"}
            className="link-opacity-100-hover link-offset-2 link-offset-3-hover link-underline-opacity-0 link-underline-opacity-100-hover"
          >
            Click for full news
          </a>
        </div>
        <div className="card-footer">
          <p className="card-text">{author || "Unknown author"}</p>
          <p className="card-text">{new Date(publishedAt).toLocaleDateString()}</p>
          <div className="bottom-div"></div>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;
