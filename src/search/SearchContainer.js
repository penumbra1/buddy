import React, { Component } from "react";
import { connect } from "react-redux";
import MainBox from "../common/MainBox";
import SearchBox from "./SearchBox";
import Results from "./Results";
import { updateSearch } from "./searchReducer";
import { toggleFavorite } from "../favorites/favoritesReducer";
import Pet from "./Pet";

class SearchContainer extends Component {
  state = { pets: [] };

  handleSearch = (params, results) => {
    results.then(pets => {
      this.props.updateSearch(params);
      this.setState({ pets });
    });
  };

  render() {
    return (
      <MainBox className="search">
        <SearchBox
          initialParams={this.props.searchParams}
          onSearch={this.handleSearch}
        />
        <Results>
          {this.state.pets.map(pet => {
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
                media={pet.media}
                location={`${pet.contact.city}, ${pet.contact.state}`}
                id={pet.id}
                isFavorite={this.props.favorites.includes(pet.id)}
                onClickFavorite={this.props.toggleFavorite}
              />
            );
          })}
        </Results>
      </MainBox>
    );
  }
}

const mapStateToProps = ({ search: searchParams, favorites }) => ({
  searchParams,
  favorites
});
const mapDispatchToProps = { updateSearch, toggleFavorite };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
