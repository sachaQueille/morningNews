import React, { useState, useEffect } from "react";
import "../App.css";
import { List, Avatar } from "antd";
import Nav from "./Nav";
import { Link } from "react-router-dom";

function ScreenSource() {
  const [sourceList, setSourceList] = useState([]);
  const [country, setCountry] = useState("fr");

  useEffect(() => {
    async function loadNews() {
      let dataNews = await fetch(
        `https://newsapi.org/v2/top-headlines/sources?country=${country}&apiKey=3c532deacade406cb4bb8ea9ff641164`
      );
      let dataNewsAPI = await dataNews.json();
      setSourceList(dataNewsAPI.sources);
    }
    loadNews();
  }, [country]);

  const changeCountry = (countrypick) => {
    setCountry(countrypick);
  };

  return (
    <div>
      <Nav />
      <div className="Banner">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            paddingTop: 10,
          }}
        >
          <img
            onClick={() => changeCountry("Fr")}
            src="./images/france.png"
            alt="french-flag"
            style={{ width: 50, cursor: "pointer" }}
          />
          <img
            onClick={() => changeCountry("gb")}
            src="./images/united-kingdom.png"
            alt="united-kingdom-flag"
            style={{ width: 50, cursor: "pointer" }}
          />
        </div>
      </div>

      <div className="HomeThemes">
        <List
          itemLayout="horizontal"
          dataSource={sourceList}
          renderItem={(item) => (
            <List.Item key={item.id}>
              <List.Item.Meta
                avatar={<Avatar src={`./images/${item.category}.png`} />}
                title={
                  <Link to={`/articles-by-source/${item.id}`}>{item.name}</Link>
                }
                description={item.description}
              />
            </List.Item>
          )}
        />
      </div>
    </div>
  );
}

export default ScreenSource;
