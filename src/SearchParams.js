import React from "react";
import { navigate } from "@reach/router";
import SearchBox from "./search/SearchBox";

class Search extends React.Component {
  search() {
    navigate("/");
  }

  render() {
    return (
      <div className="search-route">
        <SearchBox onSearch={this.search} />
      </div>
    );
  }
}

export default Search;
