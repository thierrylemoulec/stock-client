import React from "react";
import StocksGraph from "./StocksGraph";
import StocksTable from "./StocksTable";
import { useDispatch, useSelector } from "react-redux";
import { getStocks } from "./actions";
import { uniqueMergeByProperty, POLLING_INTERVAL } from "./utils";
import { SCStocksViewer } from "./styles";

const StocksViewer = () => {
  const dispatch = useDispatch();
  const { stocks, editedStocks, loading, editing, error } = useSelector(
    state => state
  );

  React.useEffect(() => {
    dispatch(getStocks());
    let pollingIntervalId = setInterval(() => {
      if (!editing) {
        dispatch(getStocks());
      }
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(pollingIntervalId);
    };
  }, [dispatch, editing]);

  const mergedStocks = uniqueMergeByProperty(editedStocks, stocks, "index");

  if (error) return <div>Failed to load…</div>;

  if (loading) return <div>Loading…</div>;

  return (
    <SCStocksViewer>
      <h1>Stocks Viewer</h1>
      <StocksGraph stocks={mergedStocks} />
      <StocksTable stocks={mergedStocks} />
    </SCStocksViewer>
  );
};

export default StocksViewer;
