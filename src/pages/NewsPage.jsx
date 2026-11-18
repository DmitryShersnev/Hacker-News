import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { useState } from "react";

import Comment from "../Comment";

const NewsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [refreshKey, setRefreshKey] = useState(0);

  const newsItem = useSelector((state) =>
    state.news.news.find((item) => item.id === Number(id)),
  );

  if (!newsItem) {
    return (
      <div>
        <p>Новость не найдена или ещё загружается.</p>
        <button onClick={() => navigate(-1)}>К списку новостей</button>
      </div>
    );
  }

  return (
    <>
      <div style={{ marginBottom: 20 }}>
        <h2>{newsItem.title}</h2>
        <a href={newsItem.url}>Ссылка на новость</a>

        <p>
          {newsItem.score} points by {newsItem.by}{" "}
          {new Date(newsItem.time * 1000).toLocaleString("ru-RU")},{" "}
          {newsItem.kids?.length ?? 0} comments
        </p>
        <hr />
        <h3>Комментарии:</h3>
        <button
          style={{ backgroundColor: "gray" }}
          onClick={() => setRefreshKey((key) => key + 1)}
        >
          Обновить комментарии
        </button>
        {newsItem.kids?.length ? (
          newsItem.kids.map((commentId) => (
            <Comment key={commentId} id={commentId} refreshKey={refreshKey} />
          ))
        ) : (
          <p>Комментариев пока нет.</p>
        )}
        <hr />
        <button onClick={() => navigate(-1)}>К списку новостей</button>
      </div>
    </>
  );
};
export default NewsPage;
