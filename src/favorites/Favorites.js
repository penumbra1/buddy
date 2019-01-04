import React from "react";
import { connect } from "react-redux";
import Results from "../search/Results";
import { toggleFavorite } from "../favorites/favoritesReducer";

const Favorites = () => {
  return <Results />;
};

const mapStateToProps = ({ favorites }) => ({ favorites });
const mapDispatchToProps = { toggleFavorite };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Favorites);
