import React from "react";
import { connect } from "react-redux";
import Select from "react-select";
import { ANIMALS } from "petfinder-client";
import { getBreeds } from "../petfinder";
import { updateSearchData } from "./searchReducer";
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

// SearchBox uses Redux to persist form data between page reloads.
// Search results are managed by the parent SearchContainer.

class SearchBox extends React.Component {
  state = {
    ...this.props.params,
    breedList: this.props.breedList
  };

  componentDidMount() {
    if (this.props.breedList.length === 0) {
      getBreeds(this.state.animal).then(breedList =>
        this.setState({ breedList })
      );
    }
  }

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
            inputId="animal"
            // https://github.com/JedWatson/react-select/issues/2669
            value={{ value: this.state.animal, label: this.state.animal }}
            isClearable
            onChange={option =>
              this.handleChange("animal", option ? option.value : "")
            }
            theme={overrideTheme}
            // styles={selectStyles}
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
          />
        </label>
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
