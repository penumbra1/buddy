import React from "react";
import Select from "react-select";
import { ANIMALS } from "petfinder-client";
import { search, getBreeds } from "../petfinder";
import Button from "../common/Button";
import styled from "@emotion/styled";
import colors from "../colors";

const StyledForm = styled.form`
  display: flex;
  flex-wrap: wrap;

  label {
    display: block;
    flex: 0 1 320px;
    font-size: 1.5rem;
  }
`;

// React-select overrides
const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    borderWidth: "2px",
    boxShadow: "none",
    borderColor: state.isFocused ? colors.primary : colors.border
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

  handleChange = (id, value) => {
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
          <Select
            options={ANIMALS.map(a => ({ value: a, label: a }))}
            // https://github.com/JedWatson/react-select/issues/2669
            value={{ value: this.state.animal, label: this.state.animal }}
            inputId="animal"
            onChange={({ value }) => this.handleChange("animal", value)}
            theme={overrideTheme}
            // styles={selectStyles}
          />
        </label>
        <label htmlFor="breed">
          Breed
          <Select
            options={this.state.breedList.map(b => ({ value: b, label: b }))}
            inputId="breed"
            isDisabled={!this.state.breedList.length}
            isMulti
            onChange={({ value }) => this.handleChange("breed", value)}
          />
        </label>
        <Button>Submit</Button>
      </StyledForm>
    );
  }
}

export default SearchBox;
