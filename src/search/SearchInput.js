import React, { Component } from "react";
import Autosuggest from "react-autosuggest";
import styled from "@emotion/styled";
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

class SearchInput extends Component {
  state = {
    value: "",
    suggestions: this.props.options
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

  getSuggestions = value => {
    const inputValue = value.trim().toLowerCase();
    const inputLength = inputValue.length;

    return inputLength === 0
      ? this.props.options
      : this.props.options.filter(
          option => option.toLowerCase().slice(0, inputLength) === inputValue
        );
  };

  onSuggestionsFetchRequested = async ({ value }) => {
    const suggestions = this.props.getSuggestions
      ? await this.props.getSuggestions(value)
      : this.getSuggestions(value);
    this.setState({
      suggestions
    });
  };

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
        theme={theme}
      />
    );
  }
}

export default SearchInput;
