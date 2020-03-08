import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addInsight,
  removeInsight,
  updateInsight
} from './features/insights/insights-slice';
import {
  addAnalysis,
  removeAnalysis,
  updateAnalysis
} from './features/analyses/analyses-slice';
import {
  addHypothesis,
  removeHypothesis,
  updateHypothesis
} from './features/hypotheses/hypotheses-slice';
import { setProject } from './features/project/project-slice';

const App = () => {
  const dispatch = useDispatch();
  const insights = useSelector(state => state.project.collections.insights);
  const analyses = useSelector(state => state.project.collections.analyses);
  const hypotheses = useSelector(state => state.project.collections.hypotheses);

  const [insightText, setInsightText] = useState('');
  const [analysisText, setAnalysisText] = useState('');
  const [hypothesisText, setHypothesisText] = useState('');

  const handleSetProject = () =>
    dispatch(setProject({ id: '1', name: 'My Project' }));

  const handleInsightTextChange = e => setInsightText(e.target.value);
  const handleAddInsight = () => {
    dispatch(addInsight({ id: insightText, name: 'name' }));
    setInsightText('');
  };
  const handleRemoveInsight = id => {
    dispatch(removeInsight(id));
  };
  const handleUpdateInsight = insight => {
    dispatch(updateInsight(insight));
  };

  const handleAnalysisTextChange = e => setAnalysisText(e.target.value);
  const handleAddAnalysis = () => {
    dispatch(addAnalysis({ id: analysisText, name: 'name' }));
    setAnalysisText('');
  };
  const handleRemoveAnalysis = id => {
    dispatch(removeAnalysis(id));
  };
  const handleUpdateAnalysis = analysis => {
    dispatch(updateAnalysis(analysis));
  };

  const handleHypothesisTextChange = e => setHypothesisText(e.target.value);
  const handleAddHypothesis = () => {
    dispatch(addHypothesis({ id: hypothesisText, name: 'name' }));
    setHypothesisText('');
  };
  const handleRemoveHypothesis = id => {
    dispatch(removeHypothesis(id));
  };
  const handleUpdateHypothesis = hypothesis => {
    dispatch(updateHypothesis(hypothesis));
  };

  return (
    <div>
      <div>
        <button onClick={handleSetProject}>Set Project</button>
      </div>
      <div>
        <button onClick={handleAddInsight}>Add Insight</button>
        <input onChange={handleInsightTextChange} value={insightText} />
      </div>
      <div>
        <button onClick={handleAddAnalysis}>Add Analysis</button>
        <input onChange={handleAnalysisTextChange} value={analysisText} />
      </div>
      <div>
        <button onClick={handleAddHypothesis}>Add Hypothesis</button>
        <input onChange={handleHypothesisTextChange} value={hypothesisText} />
      </div>

      <hr />
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div>
          {insights.map(insight => (
            <div>
              {insight.id} --- {insight.name}
              <button onClick={() => handleRemoveInsight(insight.id)}>
                Remove
              </button>
              <button
                onClick={() =>
                  handleUpdateInsight({ id: insight.id, name: 'new-name' })
                }
              >
                Update
              </button>
            </div>
          ))}
        </div>

        <div>
          {analyses.map(analysis => (
            <div>
              {analysis.id} --- {analysis.name}
              <button onClick={() => handleRemoveAnalysis(analysis.id)}>
                Remove
              </button>
              <button
                onClick={() =>
                  handleUpdateAnalysis({ id: analysis.id, name: 'new-name' })
                }
              >
                Update
              </button>
            </div>
          ))}
        </div>

        <div>
          {hypotheses.map(hypothesis => (
            <div>
              {hypothesis.id} --- {hypothesis.name}
              <button onClick={() => handleRemoveHypothesis(hypothesis.id)}>
                Remove
              </button>
              <button
                onClick={() =>
                  handleUpdateHypothesis({
                    id: hypothesis.id,
                    name: 'new-name'
                  })
                }
              >
                Update
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
