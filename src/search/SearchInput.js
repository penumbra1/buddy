import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import styled from "@emotion/styled";
import debounce from "lodash.debounce";
import ArrowIcon from "../assets/arrow.svg";
import colors from "../colors";

const Arrow = styled.div`
  width: 1.2rem;
  height: 2.5rem;
  display: flex;
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  box-sizing: content-box;
  padding: 0 2rem 0 1.2rem;
  border-left: 1.5px solid ${colors.greyLight};
`;

const theme = {
  container: {
    marginTop: "0.8rem"
  },
  input: {
    width: "100%",
    padding: "0.8rem 2rem",
    height: "5rem",
    border: "none",
    borderRadius: "5rem"
  }
};

// Fully uncontrolled component (owns the "draft" state, reports the "final" state)
// https://reactjs.org/blog/2018/06/07/you-probably-dont-need-derived-state.html

class SearchInput extends Component {
  state = {
    value: this.props.value,
    suggestions: this.props.options
  };

  static defaultProps = {
    options: []
  };

  static getSuggestionValue = suggestion => suggestion;
  static renderSuggestion = suggestion => <div>{suggestion}</div>;
  static renderInputComponent = inputProps => (
    <div style={{ position: "relative" }}>
      <input {...inputProps} />
      <Arrow aria-hidden={true}>
        <ArrowIcon width="100%" />
      </Arrow>
    </div>
  );

  getSuggestions = async value => {
    const inputValue = value.trim().toLowerCase();

    if (this.props.getSuggestions && inputValue.length > 3) {
      const suggestions = await this.props.getSuggestions(inputValue);
      return suggestions;
    } else {
      return this.props.options.filter(
        option =>
          option.toLowerCase().slice(0, inputValue.length) === inputValue
      );
    }
  };

  showSuggestions = async ({ value }) => {
    let suggestions = [];

    if (value.length === 0 || this.state.value === this.props.value) {
      // Show all options when input is empty or has the old value
      suggestions = this.props.options;
    } else {
      suggestions = await this.getSuggestions(value);
    }

    this.setState({
      suggestions
    });
  };

  onSuggestionsFetchRequested = debounce(this.showSuggestions, 300);

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  onSuggestionSelected = (event, { suggestionValue }) => {
    event.stopPropagation();
    this.props.onSelect(suggestionValue);
  };

  shouldRenderSuggestions = () => true;

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;

    const inputProps = {
      placeholder: "Type to select",
      value,
      onChange: this.onChange
    };

    return (
      <Autosuggest
        id={this.props.id}
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={SearchInput.getSuggestionValue}
        renderSuggestion={SearchInput.renderSuggestion}
        shouldRenderSuggestions={this.shouldRenderSuggestions}
        onSuggestionSelected={this.onSuggestionSelected}
        inputProps={inputProps}
        renderInputComponent={SearchInput.renderInputComponent}
        focusInputOnSuggestionClick={false}
        theme={theme}
      />
    );
  }
}

export default SearchInput;
