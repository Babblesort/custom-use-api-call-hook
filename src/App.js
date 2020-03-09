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

const App = () => {
  const dispatch = useDispatch();
  const insights = useSelector(state => state.insights);

  // useApiServiceCallRedux custom hook

  // insights are stored in global redux store
  // useApiServiceCallRedux allows generic loading and error states
  // while still dispatching to the global store for data changes

  // Data is fetched on first mount of the component.
  // Refetch can be triggered by updating the refetchInsightsTrigger value

  // setInsights and undefined are passed as onSuccessActionCreator and
  // onErrorActionCreator.

  // When the fetch succeeds the hook will call the onSuccessActionCreator (if passed in)
  // with the fetch result as payload and dispatch the result.

  // When the fetch fails the hook will call the onErrorActionCreator (if passed in)
  // with the fetch error as payload and dispath the result.
  const [insightsTrigger, setInsightsTrigger] = useState(1);
  const {
    isProcessing: insightsAreLoading,
    hasError: insightsHasError
  } = useApiServiceCallRedux(
    getInsights,
    setInsights,
    undefined,
    insightsTrigger
  );

  const handleRefetchInsights = () => setInsightsTrigger(insightsTrigger + 1);
  const handleRemoveInsight = id => dispatch(removeInsight(id));
  const handleUpdateInsight = insight => dispatch(updateInsight(insight));

  // useApiServiceCallLocal custom hook

  // options are fetched and made available to the host component.
  // useApiServiceCallLocal allows generic loading and error states
  // and returns the fetched data.

  // Data is fetched on first mount of the component.
  // Refetch can be triggered by updating the refetchOptionsTrigger value
  const [optionsTrigger, setOptionsTrigger] = useState(1);
  const {
    isProcessing: optionsAreLoading,
    hasError: optionsHasError,
    data: options
  } = useApiServiceCallLocal(getOptions, [], optionsTrigger);

  const handleRefetchOptions = () => setOptionsTrigger(optionsTrigger + 1);

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div
        style={{
          width: '1000px',
          display: 'flex',
          justifyContent: 'space-around'
        }}
      >
        <div>
          <h3>Insights are in Global Redux Store</h3>
          <button
            style={{ height: '35px', margin: '15px 0' }}
            onClick={handleRefetchInsights}
          >
            Reload Insights
          </button>
          {insightsAreLoading && (
            <h3 style={{ color: 'blue' }}>Loading Insights...</h3>
          )}
          {insightsHasError && (
            <h3 style={{ color: 'red' }}>Error Loading Insights</h3>
          )}
          {insights.map(insight => (
            <div>
              <span style={{ width: '150px', display: 'inline-block' }}>
                {insight.id} - {insight.name}
              </span>
              <button
                style={{ marginRight: '5px' }}
                onClick={() => handleRemoveInsight(insight.id)}
              >
                Remove
              </button>
              <button
                onClick={() =>
                  handleUpdateInsight({ ...insight, name: 'new-name' })
                }
              >
                Update
              </button>
            </div>
          ))}
        </div>

        <div>
          <h3>Options are Fetched and Returned Locally</h3>
          <button
            style={{ height: '35px', margin: '15px 0' }}
            onClick={handleRefetchOptions}
          >
            Reload Options
          </button>
          {optionsAreLoading && (
            <h3 style={{ color: 'blue' }}>Loading Options...</h3>
          )}
          {optionsHasError && (
            <h3 style={{ color: 'red' }}>Error Loading Options</h3>
          )}
          {options.map(option => (
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
