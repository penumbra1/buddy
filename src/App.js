import "@babel/polyfill";
import React from "react";
import { Router } from "@reach/router";
import { Provider as StoreProvider } from "react-redux";
import store from "./store";
import GlobalStyles from "./globalStyles";
import Layout from "./common/Layout";
import SearchContainer from "./search/SearchContainer";
import Split from "./common/Split";

const App = () => (
  <StoreProvider store={store}>
    <GlobalStyles />
    <Layout>
      <Router>
        <SearchContainer path="/" />
        <Split loader={() => import("./details/Details")} path="/details/:id" />
        <Split
          loader={() => import("./favorites/Favorites")}
          path="/favorites"
        />
      </Router>
    </Layout>
  </StoreProvider>
);

export default App;
