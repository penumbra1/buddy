import React, { Component } from "react";
import { connect } from "react-redux";
import Select from "react-select";
import AsyncSelect from "react-select/lib/Async";
import debounce from "lodash.debounce";
import throttle from "lodash.throttle";
import { ANIMALS } from "petfinder-client";
import { getBreeds } from "../petfinder";
import { updateSearchData } from "./searchReducer";
import Button from "../common/Button";
import styled from "@emotion/styled";
import colors from "../colors";

import getCities from "./algoliaPlaces";

const StyledForm = styled.form`
  display: grid;
  grid-gap: 2.4rem 3rem;
  grid-template-columns: repeat(auto-fit, minmax(auto, 360px));
  justify-content: center;
  margin-bottom: 5rem;

  label,
  fieldset label {
    display: block;
    font-size: 1.5rem;
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

  /* fieldset label {
    margin-bottom: 2.4rem;
  } */

  ${Button} {
    justify-self: center;
    grid-column: 1/-1;
    margin-top: 2rem;
  }
`;

// React-select overrides
const selectStyles = {
  // container: (provided, state) => ({
  //   ...provided,
  //   margin: "1rem 0"
  // }),
  control: (provided, state) => ({
    ...provided,
    // borderWidth: "2px",
    // boxShadow: "none",
    // borderColor: state.isFocused ? colors.primary : colors.border
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
    primary75: `rgba(${colors.primaryRGB}, 0.75)`,
    primary50: `rgba(${colors.primaryRGB}, 0.50)`,
    primary25: `rgba(${colors.primaryRGB}, 0.25)`,
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
    // getCities("Minne").then(cities => console.log(cities));
    if (this.props.breedList.length === 0) {
      getBreeds(this.state.animal).then(breedList =>
        this.setState({ breedList })
      );
    }
  }

  getLocationOptions = debounce(getCities, 500);

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
          Location
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
            Animal
            <Select
              options={ANIMALS.map(a => ({ value: a, label: a }))}
              inputId="animal"
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
            Breed
            <Select
              options={this.state.breedList.map(b => ({ value: b, label: b }))}
              inputId="breed"
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
