import React, { Component } from "react";
import { connect } from "react-redux";
import MainBox from "../common/MainBox";
import SearchBox from "./SearchBox";
import Results from "./Results";
import { updateSearch } from "./searchReducer";

class SearchContainer extends Component {
  state = { pets: [] };

  handleSearch = (params, results) => {
    results.then(pets => {
      this.props.updateSearch(params);
      this.setState({ pets });
    });
  };
  s;

  render() {
    return (
      <MainBox className="search">
        <SearchBox
          initialParams={this.props.searchParams}
          onSearch={this.handleSearch}
        />
        <Results pets={this.state.pets} />
      </MainBox>
    );
  }
}

const mapStateToProps = ({ search: searchParams }) => ({ searchParams });
const mapDispatchToProps = { updateSearch };

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchContainer);
