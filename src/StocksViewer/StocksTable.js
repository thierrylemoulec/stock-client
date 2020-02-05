import React from "react";
import { roundToTwo } from "./utils";
import { useDispatch } from "react-redux";
import { toggleEdit, addCustomStock } from "./actions";
import { SCTableCell, SCTable, SCTableHead, SCCol, SCCellEdit } from "./styles";

export function EditableStockPrice({ type, stock }) {
  const dispatch = useDispatch();
  const [price, setPrice] = React.useState(roundToTwo(stock.stocks[type]));
  const [priceEdit, setPriceEdit] = React.useState(false);
  const inputRef = React.useRef(null);

  React.useEffect(() => {
    if (priceEdit) {
      inputRef.current.select();
    }
  }, [priceEdit]);

  function handleToggleEdit() {
    setPriceEdit(!priceEdit);
    dispatch(toggleEdit());
  }

  function handleSubmit(e) {
    e.preventDefault();
    setPriceEdit(!priceEdit);
    dispatch(
      addCustomStock({
        ...stock,
        stocks: { ...stock.stocks, [type]: parseFloat(price) }
      })
    );
  }

  return (
    <SCCellEdit>
      {!priceEdit ? (
        <button onClick={handleToggleEdit} tabIndex="0">
          {price}
        </button>
      ) : (
        <form data-testid="form-cell" onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            type="number"
            onBlur={handleToggleEdit}
            step={0.01}
            min={0}
            onChange={e => setPrice(e.currentTarget.value)}
            value={price}
          />
        </form>
      )}
    </SCCellEdit>
  );
}

function isStockEqual(prevProps, nextProps) {
  if (prevProps.stock.timestamp === nextProps.stock.timestamp) return true;
  return false;
}

const StockCell = React.memo(({ stock }) => {
  return (
    <SCTableCell role="row">
      <SCCol role="gridcell">
        <EditableStockPrice stock={stock} type="CAC40" />
      </SCCol>
      <SCCol>
        <EditableStockPrice stock={stock} type="NASDAQ" />
      </SCCol>
    </SCTableCell>
  );
}, isStockEqual);

const StockTable = ({ stocks }) => {
  return (
    <SCTable role="grid">
      <SCTableHead>
        <SCCol>CAC40</SCCol>
        <SCCol>NASDAQ</SCCol>
      </SCTableHead>
      {stocks.map(stock => {
        return <StockCell stock={stock} key={stock.timestamp} />;
      })}
    </SCTable>
  );
};

export default StockTable;
