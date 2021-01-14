import { memo, useCallback } from "react";
import styled from "styled-components";

const Col = styled.div`
  width: 30px;
  height: 30px;
  position: relative;
  z-index: 998;
  cursor: pointer;
  &:hover {
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 50px;
  }
  &:before {
    content: "";
    height: 100%;
    width: 2px;
    background: #777;
    position: absolute;
    top: 0;
    left: 50%;
    transform: translateX(-50%);

    ${(props) =>
      props.$row === 0 &&
      `
      top: 50%;
    `}

    ${(props) =>
      props.$row === 18 &&
      `
      height: 50%;
    `}
  }

  &:after {
    content: "";
    width: 100%;
    height: 2px;
    background: #777;
    position: absolute;
    top: 50%;
    left: 0;
    transform: translateY(-50%);

    ${(props) =>
      props.$col === 0 &&
      `
      left: 50%;
    `}

    ${(props) =>
      props.$col === 18 &&
      `
      width: 50%;
    `}
  }
`;

const ChessElement = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 50%;
  position: absolute;
  transform: scale(0.75);
  top: 0;
  left: 0;
  z-index: 998;

  ${(props) =>
    props.$value === "black" &&
    `
    background: radial-gradient(
      circle at 35% 25%,
      #999 0%,
      #000 90%,
      #666 95%,
      #999 100%
    );
  `}

  ${(props) =>
    props.$value === "white" &&
    `
    background: radial-gradient(
      circle at 35% 25%,
      white 0%,
      #eee 30%,
      #ccc 60%,
      #bbb 80%,
      #aaa 95%,
      #999 100%
    );
  `}
`;

const Chess = ({ row, col, value, onClick }) => {
  const handleClick = useCallback(() => {
    onClick(row, col, value);
  }, [row, col, value, onClick]);

  return (
    <Col $row={row} $col={col} onClick={handleClick}>
      <ChessElement $value={value} />
    </Col>
  );
};

export default memo(Chess);
