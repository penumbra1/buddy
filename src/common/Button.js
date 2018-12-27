import styled from "@emotion/styled";
import colors from "../colors";

const Button = styled.button`
  background-color: transparent;
  padding: 1rem 2.4rem;
  color: ${colors.primary};
  font-size: 1.8rem;
  font-weight: 600;
  letter-spacing: 0.065em;
  border: 2px solid ${colors.primary};
  border-radius: 2.5rem;
  display: block;
  height: 5rem;
  width: 13rem;
  cursor: pointer;
  transition: all 0.15s ease-in-out;

  &:focus {
    outline: none;
  }

  &:hover,
  &:active,
  &:focus {
    color: ${colors.white};
    background-color: ${colors.primary};
  }

  &:active {
    background-color: ${colors.primaryDark};
  }
`;

export default Button;
