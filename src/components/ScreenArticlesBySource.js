import React from "react";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../App.css";
import { Card, Icon, Modal } from "antd";
import Nav from "./Nav";
import { connect } from "react-redux";

function ScreenArticlesBySource(props) {
  const { Meta } = Card;

  const { id } = useParams();
  console.log(id);

  const [articleList, setArticleList] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const showModal = (title, content) => {
    setIsModalVisible(true);
    setTitle(title);
    setContent(content);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    const findArticles = async () => {
      const data = await fetch(
        `https://newsapi.org/v2/top-headlines?sources=${id}&apiKey=3c532deacade406cb4bb8ea9ff641164`
      );
      const body = await data.json();
      setArticleList(body.articles);
    };
    findArticles();
  }, [id]);

  const news = articleList.map(function (article, i) {
    return (
      <Card
        key={article.title}
        style={{
          width: 300,
          margin: "15px",
          display: "flex",
          flexDirection: "column",
        }}
        cover={
          <img alt="example" src={article.urlToImage} style={{ height: 200 }} />
        }
        actions={[
          <Icon
            onClick={() => showModal(article.title, article.description)}
            type="read"
            key="ellipsis2"
          />,
          <Icon
            onClick={() =>
              props.addToWishList({
                title: article.title,
                desc: article.description,
                img: article.urlToImage,
              })
            }
            type="like"
            key="ellipsis"
          />,
        ]}
      >
        <Meta
          style={{ height: 200 }}
          title={article.title}
          description={article.description}
        />
        <Modal
          title={title}
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <p>{content}</p>
        </Modal>
      </Card>
    );
  });

  return (
    <div>
      <Nav />

      <div className="Banner" />

      <div className="Card">{news}</div>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    addToWishList: function (article) {
      dispatch({ type: "add-article", articleLiked: article });
    },
  };
}
export default connect(null, mapDispatchToProps)(ScreenArticlesBySource);
