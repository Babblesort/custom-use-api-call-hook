import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setInsights,
  removeInsight,
  updateInsight
} from './features/insights/insights-slice';
import { getInsights, getOptions } from './services/data-service';
import useApiServiceFetchRedux from './redux/use-api-service-fetch-redux';
import useApiServiceFetchLocal from './redux/use-api-service-fetch-local';

const App = () => {
  const dispatch = useDispatch();
  const insights = useSelector(state => state.insights);

  // useApiServiceFetchRedux custom hook

  // insights are stored in global redux store
  // useApiServiceFetchRedux allows generic loading and error states
  // while still dispatching to the global store for data changes

  // Data is fetched on first mount of the component.
  // Refetch can be triggered by updating the refetchInsightsTrigger value

  // setInsights and undefined are passed as onSuccessActionCreator and
  // onErrorActionCreator.

  // When the fetch succeeds the hook will call the onSuccessActionCreator (if passed in)
  // with the fetch result as payload and dispatch the result.

  // When the fetch fails the hook will call the onErrorActionCreator (if passed in)
  // with the fetch error as payload and dispath the result.
  const [refetchInsightsTrigger, setRefetchInsightsTrigger] = useState(1);
  const {
    isLoading: insightsAreLoading,
    hasError: insightsHasError
  } = useApiServiceFetchRedux(
    getInsights,
    setInsights,
    undefined,
    refetchInsightsTrigger
  );

  const handleRefetchInsights = () =>
    setRefetchInsightsTrigger(refetchInsightsTrigger + 1);

  const handleRemoveInsight = id => {
    dispatch(removeInsight(id));
  };
  const handleUpdateInsight = insight => {
    dispatch(updateInsight(insight));
  };

  // useApiServiceFetchLocal custom hook

  // options are fetched and made available to the host component.
  // useApiServiceFetchLocal allows generic loading and error states
  // and returns the fetched data.

  // Data is fetched on first mount of the component.
  // Refetch can be triggered by updating the refetchInsightsTrigger value
  const [refetchOptionsTrigger, setRefetchOptionsTrigger] = useState(1);
  const {
    isLoading: optionsAreLoading,
    hasError: optionsHasError,
    data: options
  } = useApiServiceFetchLocal(getOptions, [], refetchOptionsTrigger);

  const handleRefetchOptions = () =>
    setRefetchOptionsTrigger(refetchOptionsTrigger + 1);

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-around'
      }}
    >
      <div>
        <h3>Insights are in Global Redux Store</h3>
        <button
          style={{ height: '35px', margin: '15px' }}
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
            {insight.id} --- {insight.name}
            <button onClick={() => handleRemoveInsight(insight.id)}>
              Remove
            </button>
            <button
              onClick={() =>
                handleUpdateInsight({
                  id: insight.id,
                  name: 'new-name'
                })
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
          style={{ height: '35px', margin: '15px' }}
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
            {option.label} --- {option.value}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
