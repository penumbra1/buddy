/** @jsx jsx */

import React, { lazy, Suspense, PureComponent } from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import Home from "../assets/home.svg";
import Heart from "../assets/heart.svg";
import colors from "../colors";

const Placeholder = lazy(() => import("../assets/placeholder.svg"));

const iconStyles = {
  height: "1.6rem",
  display: "inline-block",
  marginRight: "0.8rem",
  fill: colors.greyDark
};

const StyledLink = styled(Link)`
  width: 100%;
  display: flex;
  margin: 0;
  background-color: ${colors.white};
  padding: 1.5rem;
  text-decoration: none;
  box-shadow: 1px 1px 1px 2px ${colors.shadow};
  border-left: ${props =>
    `3px solid ${props.isFavorite ? colors.primaryLight : colors.greyDark}`};

  .image-container {
    width: 100px;
    height: 100px;
    margin-right: 20px;
    border: 2px solid ${colors.greyLight};
    border-radius: 50%;
    overflow: hidden;
    flex-shrink: 0;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 40%;
  }

  .info {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }

  h1 {
    font-weight: normal;
    font-size: 2.5rem;
    width: 100%;
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h2 {
    font-weight: normal;
    font-size: 2rem;
    margin: -1rem 0 0 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  p {
    font-size: 1.7rem;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

class Pet extends PureComponent {
  handleClickFavorite = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClickFavorite(this.props.id);
  };

  render() {
    let { name, breed, media, location, id, isFavorite } = this.props;
    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    let hero = null;
    if (photos[0] && photos[0].value) {
      hero = photos[0].value;
    }

    return (
      <StyledLink to={`/details/${id}`}>
        <div className="image-container">
          {hero ? (
            <img src={hero} alt={name} />
          ) : (
            <Suspense fallback={null}>
              <Placeholder style={{ fill: colors.greyDark }} />
            </Suspense>
          )}
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>{breed}</h2>
          <p>
            <span>
              <Home css={iconStyles} />
              {location}
            </span>
            <button
              css={{
                flex: "0 0 4rem",
                padding: "1rem",
                background: "transparent",
                border: "none"
              }}
              onClick={this.handleClickFavorite}
            >
              <Heart
                css={{
                  ...iconStyles,
                  margin: "auto",
                  fill: isFavorite ? colors.primary : colors.greyLight
                }}
              />
            </button>
          </p>
        </div>
      </StyledLink>
    );
  }
}

export default Pet;
