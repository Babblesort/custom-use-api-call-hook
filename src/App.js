import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInsights,
  removeInsight,
  updateInsight,
  addInsight
} from './features/insights/insights-slice';
import {
  getInsights,
  getOptions,
  postInsight,
  deleteInsight
} from './services/data-service';
import useApiFetchEffectRedux from './redux/use-api-fetch-effect-redux';
import useApiPostRedux from './redux/use-api-post-redux';
import useApiDeleteRedux from './redux/use-api-delete-redux';
import useApiFetchEffectLocal from './redux/use-api-fetch-effect-local';
import './app.scss';

const App = () => {
  const dispatch = useDispatch();

  // useApiFetchEffectRedux
  const insights = useSelector(state => state.insights);
  const [insightsTrigger, setInsightsTrigger] = useState(1);
  const fetchInsights = () => setInsightsTrigger(insightsTrigger + 1);
  const handleUpdateInsight = insight => dispatch(updateInsight(insight));
  const {
    isProcessing: insightsAreLoading,
    hasError: insightsHasError
  } = useApiFetchEffectRedux(
    getInsights,
    setInsights,
    undefined,
    insightsTrigger
  );

  // useApiPostRedux
  // depends on post method returning new id as result
  const [
    { isProcessing: insightIsPosting, hasError: insightPostHasError },
    createInsightCall
  ] = useApiPostRedux(postInsight, addInsight);

  const handleCreateInsight = () => createInsightCall({ name: 'new insight' });

  // useApiDeleteRedux
  const [
    { isProcessing: insightIsDeleting, hasError: insightDeleteHasError },
    deleteInsightCall
  ] = useApiDeleteRedux(deleteInsight, removeInsight);

  const handleRemoveInsight = id => deleteInsightCall(id);

  // useApiFetchEffectLocal
  const [optionsTrigger, setOptionsTrigger] = useState(1);
  const fetchOptions = () => setOptionsTrigger(optionsTrigger + 1);
  const {
    isProcessing: optionsAreLoading,
    hasError: optionsHasError,
    data: options
  } = useApiFetchEffectLocal(getOptions, [], optionsTrigger);

  return (
    <div className="main-content">
      <div className="demo-content">
        <div>
          <h2 className="info">useApiServiceCallRedux</h2>
          <h3>Insights are in Global Redux Store</h3>
          <div className="group-header">
            <button
              className="hook-demo-btn"
              onClick={fetchInsights}
              disabled={insightsAreLoading}
            >
              Reload Insights
            </button>
            <button
              className="hook-demo-btn"
              onClick={handleCreateInsight}
              disabled={insightIsPosting || insightsAreLoading}
            >
              Create Insight
            </button>
            {insightsAreLoading && (
              <h3 className="info">Loading Insights...</h3>
            )}
            {insightsHasError && (
              <h3 className="error">Error Loading Insights</h3>
            )}
            {insightIsPosting && <h3 className="info">Creating Insight...</h3>}
            {insightPostHasError && (
              <h3 className="error">Error Creating Insight</h3>
            )}
            {insightIsDeleting && <h3 className="info">Deleting Insight...</h3>}
            {insightDeleteHasError && (
              <h3 className="error">Error Deleting Insight</h3>
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
                    handleUpdateInsight({
                      ...insight,
                      name: 'new-name'
                    })
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
