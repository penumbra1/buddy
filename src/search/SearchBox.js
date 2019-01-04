import React, { Component } from "react";
import { connect } from "react-redux";
import { ANIMALS } from "petfinder-client";
import { getBreeds } from "../petfinder";
import getCities from "./algoliaPlaces";
import { updateSearchData } from "./searchReducer";
import Button from "../common/Button";
import styled from "@emotion/styled";
import Color from "color";
import colors from "../colors";
import SearchInput from "./SearchInput";

const StyledForm = styled.form`
  display: grid;
  grid-gap: 2.4rem 3rem;
  grid-template-columns: repeat(auto-fit, minmax(auto, 360px));
  justify-content: center;
  margin-bottom: 6rem;
  padding: 5rem;
  background-color: ${colors.primaryLight};
  border-radius: 0 0 70% 70% / 0 0 18rem 18rem;
  box-shadow: 0 1px 4px
    ${Color(colors.primaryLight)
      .darken(0.6)
      .alpha(0.5)
      .string()};

  .label-text {
    font-size: 1.5rem;
    text-transform: uppercase;
    padding-left: 2rem;
  }

  fieldset {
    border: none;
    margin: 0;
    padding: 0;
    display: contents;
  }

  fieldset label[for="breed"] {
    grid-column: -2;
  }

  ${Button} {
    justify-self: center;
    grid-column: 1/-1;
    margin-top: 2rem;
  }
`;

// React-select overrides
const selectStyles = {
  control: provided => ({
    ...provided,
    padding: "0.4rem 0.8rem 0.4rem 1.2rem",
    marginTop: "0.8rem",
    height: "5rem",
    borderRadius: "5rem"
  })
};

const overrideTheme = theme => ({
  ...theme,
  colors: {
    ...theme.colors,
    primary: colors.primary,
    primary75: Color(colors.primary)
      .alpha(0.75)
      .string(),
    primary50: Color(colors.primary)
      .alpha(0.5)
      .string(),
    primary25: Color(colors.primary)
      .alpha(0.25)
      .string(),
    neutral20: colors.border
  }
});

// SearchBox uses Redux to persist form data between page reloads.
// Search results are managed by the parent SearchContainer.

class SearchBox extends Component {
  state = {
    ...this.props.params,
    breedList: this.props.breedList
  };

  componentDidMount() {
    // Fetch breeds for current animal unless they've already been fetched
    if (this.props.breedList.length === 0) {
      getBreeds(this.state.animal).then(breedList =>
        this.setState({ breedList })
      );
    }
  }

  showNoOptions = () => "Type to search";

  handleChange = (id, value) => {
    if (id === "animal") {
      this.setState({ breed: "" });
      getBreeds(value).then(breedList => this.setState({ breedList }));
    }

    this.setState({ [id]: value });
  };

  handleFormSubmit = event => {
    event.preventDefault();

    const { breedList, ...searchParams } = this.state;
    this.props.updateSearchData(this.state);
    this.props.onSearch(searchParams);
  };

  render() {
    return (
      <StyledForm onSubmit={this.handleFormSubmit}>
        <label htmlFor="location">
          <span className="label-text">Location</span>
          <SearchInput
            id="location"
            value={this.state.location}
            getSuggestions={getCities}
            onSelect={value => this.handleChange("location", value)}
          />
        </label>
        <fieldset>
          <legend className="visuallyhidden">Who can be your buddy?</legend>
          <label htmlFor="animal">
            <span className="label-text">Animal</span>
            <SearchInput
              id="animal"
              value={this.state.animal}
              options={ANIMALS}
              onSelect={value => this.handleChange("animal", value)}
            />
          </label>
          <label htmlFor="breed">
            <span className="label-text">Breed</span>
            <SearchInput
              id="breed"
              value={this.state.breed}
              key={this.state.animal} // Creates a new empty input if animal changes
              options={this.state.breedList}
              onSelect={value => this.handleChange("breed", value)}
            />
          </label>
        </fieldset>
        <Button>Submit</Button>
      </StyledForm>
    );
  }
}

const mapStateToProps = ({ search: { results, breedList, ...params } }) => ({
  breedList,
  params
});

const mapDispatchToProps = { updateSearchData };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchBox);
