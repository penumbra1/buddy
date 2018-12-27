import React, { PureComponent } from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import { css, jsx } from "@emotion/core";
import { LazyLoadImage } from "react-lazy-load-image-component";
import PlaceholderIcon from "../assets/placeholder.svg";
import Home from "../assets/home.svg";
import Heart from "../assets/heart.svg";
import colors from "../colors";

const Placeholder = () => (
  <div className="image-container">
    <PlaceholderIcon fill={colors.greyDark} />
  </div>
);

const iconStyles = {
  height: "1.6rem",
  display: "inline-block",
  marginRight: "0.8rem",
  fill: colors.greyDark
};

const StyledLink = styled(Link)`
  display: flex;
  margin: 0;
  background-color: ${colors.white};
  padding: 2rem;
  text-decoration: none;
  box-shadow: 1px 1px 1px 2px ${colors.shadow};
  border-left: 3px solid ${colors.greyDark};
  border-radius: 0.3rem 0.3rem 3.6rem 0.3rem;

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
    flex-direction: column;
    justify-content: space-around;
    overflow: hidden;
  }

  h1,
  h2 {
    margin: 0;
    font-weight: normal;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
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
      <StyledLink
        to={`/details/${id}`}
        css={css`
          border-left: 3px solid
            ${isFavorite ? colors.primaryLight : colors.greyDark};
        `}
      >
        {hero ? (
          <LazyLoadImage
            alt={name}
            src={hero}
            effect="opacity"
            wrapperClassName="image-container"
            scrollPosition={this.props.scrollPosition}
          />
        ) : (
          <Placeholder />
        )}

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
                  display: "block",
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
