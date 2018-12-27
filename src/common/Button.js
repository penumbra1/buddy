import styled from "@emotion/styled";
import colors from "../colors";

const Button = styled.button`
  background-color: transparent;
  padding: 1rem 2.4rem;
  color: ${colors.dark};
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.065em;
  border: 2px solid ${colors.secondaryDark};
  border-radius: 2.5rem;
  display: block;
  height: 5rem;
  width: 13rem;
  cursor: pointer;
  transition: all 0.15s ease-out;

  &:focus {
    outline: none;
  }

  &:hover,
  &:active,
  &:focus {
    color: ${colors.white};
    border: 2px solid transparent;
    background-color: ${colors.secondary};
  }

  &:active {
    background-color: ${colors.secondaryDark};
  }
`;

export default Button;
