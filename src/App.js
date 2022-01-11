import React from "react";
import "./App.css";
import ScreenHome from "./components/ScreenHome";
import ScreenMyArticles from "./components/ScreenMyArticles";
import ScreenMyArticlesBySource from "./components/ScreenArticlesBySource";
import ScreenSource from "./components/ScreenSource";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, combineReducers } from "redux";
import article from "./reducers/article";
import token from "./reducers/token";

const store = createStore(combineReducers({ article, token }));

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route exact path="/" component={ScreenHome} />
          <Route path="/source" component={ScreenSource} />
          <Route path="/articles" component={ScreenMyArticles} />
          <Route
            path="/articles-by-source/:id"
            component={ScreenMyArticlesBySource}
          />
        </Switch>
      </Router>
    </Provider>
  );
}
