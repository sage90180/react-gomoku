import { memo } from "react";
import styled from "styled-components";

const Btn = styled.button`
  margin: 10px 0px;
  font-size: 18px;
  font-weight: 500;
  border: solid 2px white;
  padding: 3px 10px;
  letter-spacing: 2px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  cursor: pointer;
`;

const Button = ({ children, onClick }) => {
  return <Btn onClick={onClick}>{children}</Btn>;
};

export default memo(Button);
