import React from 'react';
import './App.css';
import ScreenHome from './ScreenHome';
import ScreenMyArticles from './ScreenMyArticles';
import ScreenMyArticlesBySource from './ScreenArticlesBySource';
import ScreenSource from './ScreenSource';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App() {
  return (

    <Router>
     <Switch>
       <Route exact path="/" component={ScreenHome} />
       <Route path="/source" component={ScreenSource}  />
       <Route path="/articles" component={ScreenMyArticles}  />
       <Route path="/articles-by-source/:id" component={ScreenMyArticlesBySource}  />
     </Switch>
   </Router>
  
  );
}

export default App;
