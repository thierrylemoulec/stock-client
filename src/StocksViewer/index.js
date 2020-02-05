import React from "react";
import StocksGraph from "./StocksGraph";
import StocksTable from "./StocksTable";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { getStocks } from "./actions";
import { POLLING_INTERVAL, uniqueMergeByProperty } from "./utils";
import { SCStocksViewer } from "./styles";

const StocksViewer = () => {
  const dispatch = useDispatch();
  const { stocks, editedStocks, loading, error } = useSelector(state => {
    return {
      stocks: state.stocks,
      loading: state.loading,
      error: state.error,
      editedStocks: state.editedStocks
    };
  }, shallowEqual);

  const mergedStocks = React.useCallback(
    uniqueMergeByProperty(editedStocks, stocks, "index"),
    [editedStocks, stocks]
  );

  React.useEffect(() => {
    dispatch(getStocks());
    let pollingIntervalId = setInterval(() => {
      dispatch(getStocks());
    }, POLLING_INTERVAL);

    return () => {
      clearInterval(pollingIntervalId);
    };
  }, [dispatch]);

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
