import React from "react";
import { ANIMALS } from "petfinder-client";
import { search, getBreeds } from "../petfinder";
import Button from "../common/Button";
import styled from "@emotion/styled";

const StyledForm = styled.form`
  label {
    display: block;
    width: 60px;
  }

  input,
  select {
    margin-bottom: 30px;
    font-size: 18px;
    height: 30px;
    width: 320px;
  }
`;

// SearchBox is aware of the API but unaware of Redux.
// It manages transitory search parameter changes and data fetching.

class SearchBox extends React.Component {
  state = {
    ...this.props.initialParams,
    breedList: []
  };

  componentDidMount() {
    this.search();
    // Fetch breeds in without rerendering
    getBreeds(this.state.animal).then(breedList =>
      this.setState({ breedList })
    );
  }

  search = () => {
    const { breedList, ...searchParams } = this.state;
    const results = search(searchParams); // Promise
    this.props.onSearch(searchParams, results);
  };

  handleChange = event => {
    const { id, value } = event.target;
    if (id === "animal") {
      getBreeds(value).then(breedList => this.setState({ breedList }));
    }

    this.setState({ [id]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    this.search();
  };

  render() {
    return (
      <StyledForm onSubmit={this.handleFormSubmit}>
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={this.state.location}
            onChange={this.handleChange}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={this.state.animal}
            onChange={this.handleChange}
            onBlur={this.handleChange} // Remove it?
          >
            <option />
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!this.state.breedList.length}
            id="breed"
            value={this.state.breed}
            onChange={this.handleChange}
            onBlur={this.handleChange}
          >
            <option />
            {this.state.breedList.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <Button>Submit</Button>
      </StyledForm>
    );
  }
}

export default SearchBox;
