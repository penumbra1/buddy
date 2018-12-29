import React, { Component } from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import Color from "color";
import throttle from "lodash.throttle";
import Logo from "../assets/logo.svg";
import Search from "../assets/search.svg";
import Heart from "../assets/heart-line.svg";
import colors from "../colors";

const Wrapper = styled.header`
  background-color: ${colors.dark};
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 5vw;
  box-shadow: 0 1px 6px 1px
    ${Color(colors.dark)
      .alpha(0.5)
      .rgb()
      .string()};
  transition: transform 0.2s ease-in;
  transform-origin: center top;

  #logo,
  nav {
    transition: inherit;
  }

  &.small {
    transform: scaleY(0.7);

    nav {
      transform: scaleX(0.9) scaleY(calc(0.9 / 0.7));
    }

    #logo {
      transform: scaleX(0.8) scaleY(calc(0.8 / 0.7));
    }
  }
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 30vw;
  transition: inherit;
`;

const IconLink = ({ image, description, to, ...props }) => (
  <Link {...props} to={to}>
    <span className="visuallyhidden">{description}</span>
    <div aria-hidden={true}>{image}</div>
  </Link>
);

const StyledIconLink = styled(IconLink)`
  fill: ${props => props.fill || colors.greyLight};
  box-sizing: content-box;
  width: ${props => props.width || "3.6rem"};
  margin: 0 0.6rem;
  padding: 1.2rem;
  transition: fill 0.15s ease-in;

  div svg {
    display: block;
  }

  &:hover,
  &:focus {
    fill: ${colors.primaryLight};
  }
`;

class Header extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.resizeHeader);
  }

  resizeHeader = throttle(() => {
    const distanceY = window.pageYOffset || document.documentElement.scrollTop;
    const threshold = 200;
    const header = document.querySelector("header");

    if (distanceY > threshold) {
      header.classList.add("small");
    } else {
      header.classList.remove("small");
    }
  }, 100);

  render() {
    return (
      <Wrapper>
        <StyledIconLink
          id="logo"
          to="/"
          image={<Logo />}
          width="13rem"
          fill={colors.primaryLight}
          description="Buddy"
        />
        <Nav>
          <StyledIconLink
            to="/search-params"
            image={<Search />}
            description="Search"
          />
          <StyledIconLink
            to="/favorites"
            image={<Heart />}
            description="Favorites"
            width="3.4rem"
          />
        </Nav>
      </Wrapper>
    );
  }
}

export default Header;
