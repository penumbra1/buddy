import React from "react";
import makeLoadable from "react-loadable";

const Loading = ({ error, pastDelay }) => {
  if (error) {
    return "Oops, something went wrong - please refresh the page.";
  }
  if (!pastDelay) return null;
  else {
    return <h3>Loading...</h3>;
  }
};

const Split = ({ loader, ...props }) => {
  const Component = makeLoadable({
    loader,
    loading: Loading
  });

  return <Component {...props} />;
};

export default Split;
