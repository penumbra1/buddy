import React from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
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
  margin-bottom: 2rem;
  padding: 1rem 5vw;
  border-radius: 0% 0% 15px 15px;
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 30vw;
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
  transition: fill 0.15s ease-in-out;

  div svg {
    display: block;
  }

  &:hover,
  &:focus {
    fill: ${colors.primaryLight};
  }
`;

const Header = () => {
  return (
    <Wrapper>
      <StyledIconLink
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
};

export default Header;
