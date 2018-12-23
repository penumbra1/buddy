import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import Header from "./common/Header";
import GlobalStyles from "./globalStyles";
import SearchContainer from "./search/SearchContainer";
import Split from "./common/Split";

const App = () => (
  <StoreProvider store={store}>
    <GlobalStyles />
    <Header />
    <Router>
      <SearchContainer path="/" />
      <Split loader={() => import("./details/Details")} path="/details/:id" />
      <Split loader={() => import("./SearchParams")} path="/search-params" />
    </Router>
  </StoreProvider>
);

ReactDOM.render(<App />, document.getElementById("root"));
