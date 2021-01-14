import React, { useState, useCallback, useRef, useEffect } from "react";
import styled from "styled-components";
import { findWinner } from "./utils";

import Chess from "./Chess";
import Button from "./Button";

const WinnerModal = styled.div`
  position: absolute;
  background: rgba(0, 0, 0, 0.4);
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  z-index: 999;
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    background: rgba(255, 255, 255, 0.2);
    margin-top: 20px;
    font-size: 18px;
    font-weight: 500;
    border: solid 2px white;
    padding: 3px 10px;
    letter-spacing: 2px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
    cursor: pointer;
  }
`;

const ModalInner = styled.div`
  color: white;
  background: rgba(210, 35, 35, 0.9);
  height: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 80px;
  font-weight: 900;
  font-style: italic;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: 3px;
`;

const BtnWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Wrap = styled.div`
  display: flex;
`;

const StepsWrap = styled.div`
  margin-left: 20px;
  font-size: 20px;
  text-align: center;
  h1 {
    margin: 20px 0px;
  }
  ul {
    max-height: 580px;
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
  }
  li {
    background: rgba(255, 255, 255, 0.3);
    color: #a57000;
    font-weight: 900;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    padding: 2px;
    font-size: 15px;
    margin: 5px;
    width: 30px;
    height: 20px;
    cursor: pointer;
  }
  li:last-child {
    background: rgba(255, 255, 255, 0.8);
  }
`;

const BoardWrap = styled.div`
  width: 570px;
  height: 570px;
  background: white;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  display: flex;
  align-content: flex-start;
  flex-wrap: wrap;
  position: relative;
  box-sizing: border-box;
  &:after {
    content: "";
    position: absolute;
    left: 0px;
    top: 0px;
    width: 570px;
    height: 570px;
    border: solid 15px #666;
    z-index: 1;
  }
`;

const Row = styled.div`
  display: flex;
`;

const NxtPlayer = styled.div`
  text-align: center;
  font-size: 15px;
  letter-spacing: 2px;
  .player {
    font-size: 23px;
    line-height: 35px;
    font-weight: 900;
  }
`;

const Player = ({ children }) => {
  return (
    <NxtPlayer>
      <span>下一位玩家</span>
      <div className="player">{children}</div>
    </NxtPlayer>
  );
};

function App() {
  const SIZE = 19;
  const [board, setBoard] = useState(Array(SIZE).fill(Array(SIZE).fill(null)));

  const isBlackMoving = useRef(true);

  const [history, setHistory] = useState([null]);

  const lastRow = useRef();
  const lastCol = useRef();

  const updateBoard = useCallback((y, x, newValue) => {
    setBoard((board) =>
      board.map((row, currentY) => {
        // 如果這一個橫排不是我要改的，直接回傳即可
        if (currentY !== y) return row;

        // 如果是的話，找到我要改的那個 x 的位置
        return row.map((col, currentX) => {
          if (currentX !== x) return col;
          return newValue;
        });
      })
    );
  }, []);

  const handleChessClick = useCallback(
    (row, col, value) => {
      // 已經下過了
      if (value !== null) return;

      lastRow.current = row;
      lastCol.current = col;
      updateBoard(row, col, isBlackMoving.current ? "black" : "white");
      isBlackMoving.current = !isBlackMoving.current;
      setHistory(history.concat([{ board }]));
    },
    [updateBoard, history]
  );

  const handleRestartClick = () => {
    window.location.reload();
  };

  const handleStepClick = (step) => {
    if (step == history.length - 1) return;
    if (step % 2 === 0) {
      isBlackMoving.current = true;
    } else {
      isBlackMoving.current = false;
    }
    console.log(isBlackMoving);
    setHistory(history.slice(0, step + 1));
    setBoard(history[step + 1].board);
    console.log(history.length);
  };

  const handlePreviousClick = () => {
    setHistory(history.slice(0, history.length - 1));
    setBoard(history[history.length - 1].board);
    isBlackMoving.current = !isBlackMoving.current;
  };

  const [wineer, setWineer] = useState();
  useEffect(() => {
    if (lastRow.current === undefined || lastCol.current === undefined) return;
    setWineer(findWinner(board, lastRow.current, lastCol.current));
  }, [board]);

  return (
    <>
      {wineer && (
        <WinnerModal>
          <ModalInner>
            {wineer === "draw" && "平手"}
            {wineer === "black" && "獲勝的是黑子"}
            {wineer === "white" && "獲勝的是白子"}
            <br />
            <button onClick={handleRestartClick}>再玩一次</button>
          </ModalInner>
        </WinnerModal>
      )}
      <Wrap>
        <mainWrap>
          <BtnWrap>
            <Button onClick={handlePreviousClick}>上一步</Button>
            <Player>{isBlackMoving.current ? "黑子" : "白子"}</Player>
            <Button onClick={handleRestartClick}>開新局</Button>
          </BtnWrap>
          <BoardWrap>
            {board.map((row, rowIndex) => {
              return (
                <Row key={rowIndex}>
                  {row.map((col, colIndex) => {
                    return (
                      <Chess
                        key={colIndex}
                        row={rowIndex}
                        col={colIndex}
                        value={board[rowIndex][colIndex]}
                        onClick={handleChessClick}
                      />
                    );
                  })}
                </Row>
              );
            })}
          </BoardWrap>
        </mainWrap>
        <StepsWrap>
          <h1>步數</h1>
          <ul>
            {history.map(
              (steps, indexMove) =>
                indexMove !== 0 && (
                  <li
                    key={indexMove}
                    onClick={() => handleStepClick(indexMove)}
                  >
                    {indexMove}
                  </li>
                )
            )}
          </ul>
        </StepsWrap>
      </Wrap>
    </>
  );
}

export default App;
