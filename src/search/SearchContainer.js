import React, { Component } from "react";
import { connect } from "react-redux";
import MainBox from "../common/MainBox";
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
            let breed;
            if (Array.isArray(pet.breeds.breed)) {
              breed = pet.breeds.breed.join(", ");
            } else {
              breed = pet.breeds.breed;
            }
            return (
              <Pet
                animal={pet.animal}
                key={pet.id}
                name={pet.name}
                breed={breed}
                sex={pet.sex}
                age={pet.age}
                media={pet.media}
                location={`${pet.contact.city.trim()}, ${pet.contact.state.trim()}`}
                id={pet.id}
                isFavorite={this.props.favorites.includes(pet.id)}
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
