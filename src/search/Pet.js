import React, { PureComponent } from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import { css } from "@emotion/core";
import Color from "color";
import { LazyImage } from "react-lazy-images";
import Placeholder from "../assets/placeholder.svg";
import Home from "../assets/home.svg";
import Heart from "../assets/heart.svg";
import colors from "../colors";

const StyledLink = styled(Link)`
  display: flex;
  width: 100%;
  max-width: 550px;
  margin: 0;
  padding: 2.4rem;
  padding-top: 2.1rem;
  background-color: ${colors.white};
  text-decoration: none;
  box-shadow: 2px 1px 4px
    ${Color(colors.greyDark)
      .alpha(0.8)
      .rgb()
      .string()};
  border-radius: 0.5rem 0.5rem 0.5rem 7.5rem;
  border-left: 3px solid;
  outline-offset: 1.8rem;
  outline-color: ${colors.secondaryDark};

  .image-container {
    width: 120px;
    height: 120px;
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
    object-position: center;
  }

  .info {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-content: space-between;
    overflow: hidden;
    position: relative;
  }

  h1,
  h2 {
    margin: 0;
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }

  h1 {
    font-size: 2.2rem;
  }

  h2 {
    font-size: 1.6rem;
    margin-top: -0.8rem;
  }

  p {
    margin: 0;
    flex: 1 0 60%;
    margin-top: -0.8rem;

    &:last-of-type {
      margin-top: initial;
      flex-shrink: 1;
    }
  }

  button {
    padding: 1rem;
    /* margin avoids overflow on focus outline*/
    margin-right: 2px;
    background: transparent;
    border: none;
    position: absolute;
    bottom: -1rem;
    right: -1rem;
  }
`;

class Pet extends PureComponent {
  handleClickFavorite = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onClickFavorite(this.props.pet);
  };

  render() {
    let { name, age, media, id } = this.props.pet;
    let breed = this.props.pet.breeds.join(", ");
    let sex = this.props.pet.sex === "F" ? "female" : "male";
    let location = `${this.props.pet.city}, ${this.props.pet.state}`;

    let photos = [];
    if (media && media.photos && media.photos.photo) {
      photos = media.photos.photo.filter(photo => photo["@size"] === "pn");
    }

    let hero = null;
    if (photos[0] && photos[0].value) {
      hero = photos[0].value;
    }

    return (
      <StyledLink
        to={`/details/${id}`}
        css={css`
          border-left-color: ${this.props.isFavorite
            ? colors.primary
            : colors.greyDark};
        `}
      >
        <div className="image-container">
          {hero ? (
            <LazyImage
              alt={name}
              src={hero}
              placeholder={({ imageProps, ref }) => (
                <div
                  ref={ref}
                  css={{
                    height: "100%",
                    width: "100%",
                    backgroundColor: colors.greyLight
                  }}
                />
              )}
              actual={({ imageProps }) => <img {...imageProps} />}
            />
          ) : (
            <Placeholder fill={colors.greyDark} />
          )}
        </div>
        <div className="info">
          <h1>{name}</h1>
          <h2>{breed}</h2>
          <p>{`${age} ${sex}`}</p>
          <p>
            <Home
              css={{
                height: "1.6rem",
                display: "inline-block",
                marginRight: "0.6rem",
                fill: colors.greyDark
              }}
            />
            {location}
          </p>
          <button onClick={this.handleClickFavorite}>
            <Heart
              css={{
                margin: "auto",
                display: "block",
                height: "1.8rem",
                fill: this.props.isFavorite ? colors.primary : colors.greyLight
              }}
            />
          </button>
        </div>
      </StyledLink>
    );
  }
}

export default Pet;
