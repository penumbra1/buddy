import React from "react";
import ReactDOM from "react-dom";
import { Router } from "@reach/router";
import pf from "petfinder-client";
import Results from "./Results";
import Loadable from "react-loadable";
import { Provider } from "./SearchContext";
import Header from "./Header";
import GlobalStyles from "./globalStyles";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

const makeLoadable = path =>
  Loadable({
    loader: () => import(path),
    loading() {
      return <div>Loading...</div>;
    }
  });

const Loading = ({ error, pastDelay }) => {
  if (error) {
    return "oh-noes!";
  }
  if (!pastDelay) return null;
  else {
    return <h3>Loading...</h3>;
  }
};

//const LoadableDetails = makeLoadable("./Details");

const LoadableDetails = Loadable({
  loader: () => import("./Details"),
  loading: Loading
});

const LoadableSearchParams = Loadable({
  loader: () => import("./SearchParams"),
  loading() {
    return <div>Loading...</div>;
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      handleAnimalChange: this.handleAnimalChange,
      handleBreedChange: this.handleBreedChange,
      handleLocationChange: this.handleLocationChange,
      getBreeds: this.getBreeds
    };
  }
  handleLocationChange = event => {
    this.setState({
      location: event.target.value
    });
  };
  handleAnimalChange = event => {
    this.setState(
      {
        animal: event.target.value
      },
      this.getBreeds
    );
  };
  handleBreedChange = event => {
    this.setState({
      breed: event.target.value
    });
  };
  getBreeds() {
    if (this.state.animal) {
      petfinder.breed
        .list({ animal: this.state.animal })
        .then(data => {
          if (
            data.petfinder &&
            data.petfinder.breeds &&
            Array.isArray(data.petfinder.breeds.breed)
          ) {
            this.setState({
              breeds: data.petfinder.breeds.breed
            });
          } else {
            this.setState({ breeds: [] });
          }
        })
        .catch(console.error);
    } else {
      this.setState({
        breeds: []
      });
    }
  }
  render() {
    return (
      <>
        <GlobalStyles />
        <Header />
        <Provider value={this.state}>
          <Router>
            <Results path="/" />
            <LoadableDetails path="/details/:id" />
            <LoadableSearchParams path="/search-params" />
          </Router>
        </Provider>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
