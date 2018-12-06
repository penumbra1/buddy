import React from "react";
import { Link } from "@reach/router";
import styled from "@emotion/styled";
import Logo from "./logo.svg";
import Search from "./icon-search.svg";
import Heart from "./icon-heart.svg";
import colors from "./colors";

const Container = styled.header`
  background-color: ${colors.dark};
  position: sticky;
  top: 0;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 1rem 2rem;
`;

const Nav = styled.nav`
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  max-width: 30vw;
`;

const IconContainer = styled.div`
  width: ${props => props.width || "36px"};
  fill: ${props => props.fill || colors.greyLight};
  margin: 0.8rem;
  transition: fill 0.2s ease-in-out;

  &:hover {
    fill: ${colors.primary};
  }
`;

const IconLink = ({ image, description, to, ...props }) => (
  <Link to={to}>
    <span className="visuallyhidden">{description}</span>
    <IconContainer {...props} aria-hidden={true}>
      {image}
    </IconContainer>
  </Link>
);

const Header = () => {
  return (
    <Container>
      <IconLink
        to="/"
        image={<Logo />}
        width="120px"
        fill={colors.primary}
        description="Buddy"
      />
      <Nav>
        <IconLink to="/search-params" image={<Search />} description="Search" />
        <IconLink to="/favorites" image={<Heart />} description="Favorites" />
      </Nav>
    </Container>
  );
};

export default Header;
