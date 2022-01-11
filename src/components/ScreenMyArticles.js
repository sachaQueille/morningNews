import React from "react";
import "../App.css";
import { Card, Icon } from "antd";
import Nav from "./Nav";
import { connect } from "react-redux";

const { Meta } = Card;

function ScreenMyArticles(props) {
  return (
    <div>
      <Nav />
      <div className="Banner" />
      <div style={{ display: "flex", flexDirection: "row" }}>
        {props.myArticles.map(function (article) {
          return (
            <div className="Card" key={article.title}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Card
                  style={{
                    width: 300,
                    margin: "15px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                  cover={<img alt="example" src={article.img} />}
                  actions={[
                    <Icon type="read" key="ellipsis2" />,
                    <Icon
                      onClick={() => props.deleteToWishList(article.title)}
                      type="delete"
                      key="ellipsis"
                    />,
                  ]}
                >
                  <Meta title={article.title} description={article.desc} />
                </Card>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  console.log(state);
  return {
    myArticles: state.article,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    deleteToWishList: function (title) {
      dispatch({ type: "delete-article", articleDeleted: title });
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ScreenMyArticles);
