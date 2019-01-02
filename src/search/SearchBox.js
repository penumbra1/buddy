import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/lib/Async";
import { ANIMALS } from "petfinder-client";
import { getBreeds } from "../petfinder";
import getCities from "./algoliaPlaces";
import { updateSearchData } from "./searchReducer";
import Button from "../common/Button";
import styled from "@emotion/styled";
import Color from "color";
import colors from "../colors";

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
          <AsyncSelect
            inputId="location"
            value={{ value: this.state.location, label: this.state.location }}
            defaultOptions={[]}
            cacheOptions
            loadOptions={getCities}
            noOptionsMessage={this.showNoOptions}
            onChange={option =>
              this.handleChange("location", option ? option.value : "")
            }
            theme={overrideTheme}
            styles={selectStyles}
          />
        </label>
        <fieldset>
          <legend className="visuallyhidden">Who can be your buddy?</legend>
          <label htmlFor="animal">
            <span className="label-text">Animal</span>
            <Select
              inputId="animal"
              options={ANIMALS.map(a => ({ value: a, label: a }))}
              // https://github.com/JedWatson/react-select/issues/2669
              value={{ value: this.state.animal, label: this.state.animal }}
              isClearable
              onChange={option =>
                this.handleChange("animal", option ? option.value : "")
              }
              theme={overrideTheme}
              styles={selectStyles}
            />
          </label>
          <label htmlFor="breed">
            <span className="label-text">Breed</span>
            <Select
              inputId="breed"
              options={this.state.breedList.map(b => ({ value: b, label: b }))}
              isDisabled={!this.state.breedList.length === 0}
              // isMulti
              value={{ value: this.state.breed, label: this.state.breed }}
              isClearable
              onChange={option =>
                this.handleChange("breed", option ? option.value : "")
              }
              theme={overrideTheme}
              styles={selectStyles}
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
