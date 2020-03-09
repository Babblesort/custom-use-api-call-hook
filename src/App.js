import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInsights,
  removeInsight,
  updateInsight
} from './features/insights/insights-slice';
import { getInsights, getOptions } from './services/data-service';
import useApiServiceCallRedux from './redux/use-api-service-call-redux';
import useApiServiceCallLocal from './redux/use-api-service-call-local';
import './app.scss';

const App = () => {
  const dispatch = useDispatch();

  // useApiServiceCallRedux
  const insights = useSelector(state => state.insights);
  const [insightsTrigger, setInsightsTrigger] = useState(1);
  const fetchInsights = () => setInsightsTrigger(insightsTrigger + 1);
  const handleRemoveInsight = id => dispatch(removeInsight(id));
  const handleUpdateInsight = insight => dispatch(updateInsight(insight));
  const {
    isProcessing: insightsAreLoading,
    hasError: insightsHasError
  } = useApiServiceCallRedux(
    getInsights,
    setInsights,
    undefined,
    insightsTrigger
  );

  // useApiServiceCallLocal
  const [optionsTrigger, setOptionsTrigger] = useState(1);
  const fetchOptions = () => setOptionsTrigger(optionsTrigger + 1);
  const {
    isProcessing: optionsAreLoading,
    hasError: optionsHasError,
    data: options
  } = useApiServiceCallLocal(getOptions, [], optionsTrigger);

  return (
    <div className="main-content">
      <div className="demo-content">
        <div>
          <h2 className="info">useApiServiceCallRedux</h2>
          <h3>Insights are in Global Redux Store</h3>
          <div className="group-header">
            <button className="hook-demo-btn" onClick={fetchInsights}>
              Reload Insights
            </button>
            {insightsAreLoading && (
              <h3 className="info">Loading Insights...</h3>
            )}
            {insightsHasError && (
              <h3 className="error">Error Loading Insights</h3>
            )}
          </div>

          {!insightsAreLoading &&
            insights.map(insight => (
              <div>
                <span className="item">
                  {insight.id} - {insight.name}
                </span>
                <button
                  className="item-btn"
                  onClick={() =>
                    handleUpdateInsight({ ...insight, name: 'new-name' })
                  }
                >
                  Update
                </button>
                <button
                  className="item-btn"
                  onClick={() => handleRemoveInsight(insight.id)}
                >
                  Remove
                </button>
              </div>
            ))}
        </div>

        <div>
          <h2 className="info">useApiServiceCallLocal</h2>
          <h3>Options are Fetched and Returned Locally</h3>
          <div className="group-header">
            <button className="hook-demo-btn" onClick={fetchOptions}>
              Reload Options
            </button>
            {optionsAreLoading && <h3 className="info">Loading Options...</h3>}
            {optionsHasError && (
              <h3 className="error">Error Loading Options</h3>
            )}
          </div>

          {!optionsAreLoading &&
            options.map(option => (
              <div>
                {option.value} - {option.label}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default App;
