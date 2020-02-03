import styled from "styled-components";

export const SCStocksViewer = styled("div")`
  width: ${props => props.theme.maxWidth};
  margin: 50px auto;
`;

export const SCGraph = styled("div")`
  border: 1px solid #edf2f7;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px #e2e8f0;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const SCTable = styled("div")`
  margin: 20px 0;
  width: 100%;
  display: grid;
  grid-template-columns: 85px repeat(20, 1fr);
  border: 1px solid #edf2f7;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 4px #e2e8f0;
`;

export const SCTableHead = styled("div")`
  font-weight: bold;
  color: #2d3748;
`;

export const SCTableCell = styled("div")`
  text-align: center;
  font-size: 12px;
  border-right: 1px solid #e2e8f0;
  color: #4a5568;

  &:nth-of-type(21) {
    border-right: none;
  }
`;

export const SCCol = styled("div")`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 32px;

  & + & {
    border-top: 1px solid #e2e8f0;
  }
`;

export const SCCellEdit = styled("div")`
  flex: 1;
  display: inline-flex;
  align-items: center;
  width: 100%;

  form {
    width: 100%;
    height: 100%;
    flex: 1;
  }

  button {
    padding: 0 3px;
    width: 100%;
    border: none;
    height: 100%;

    &:hover {
      cursor: pointer;
    }

    &:focus,
    &:hover {
      border: 2px solid #c6f6d5;
      outline: none;
    }
  }

  input {
    width: 100%;
    height: 100%;
    display: inline-flex;
    padding: 0 3px;
    align-items: center;
    font-size: 14px;
    font-family: monospace;
  }

  input:focus,
  input:active {
    background: #f0fff4;
    outline: none;
    border: 2px solid #68d391;
  }
`;
