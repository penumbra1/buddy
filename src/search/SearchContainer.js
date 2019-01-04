import React, { Component } from "react";
import { connect } from "react-redux";
import SearchBox from "./SearchBox";
import Results from "./Results";
import { search } from "../petfinder";
import { updateResults } from "./searchReducer";
import { toggleFavorite } from "../favorites/favoritesReducer";
import Pet from "./Pet";

class SearchContainer extends Component {
  componentDidMount() {
    if (this.props.results.length === 0) {
      this.handleSearch(this.props.params);
    }
  }

  handleSearch = searchParams => {
    search(searchParams).then(results => {
      this.props.updateResults(results);
    });
  };

  render() {
    return (
      <>
        <SearchBox onSearch={this.handleSearch} />
        <Results>
          {this.props.results.map(pet => {
            return (
              <Pet
                key={pet.id}
                pet={pet}
                isFavorite={
                  !!this.props.favorites.find(fav => fav.id === pet.id)
                }
                onClickFavorite={this.props.toggleFavorite}
                scrollPosition={this.props.scrollPosition}
              />
            );
          })}
        </Results>
      </>
    );
  }
}

const mapStateToProps = ({ search: { results, ...params }, favorites }) => ({
  results,
  params,
  favorites
});
const mapDispatchToProps = { updateResults, toggleFavorite };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
