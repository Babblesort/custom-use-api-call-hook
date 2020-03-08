const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

export const getInsights = async () => {
  await delay(750);
  return [
    { id: 'i1', name: 'Insight One' },
    { id: 'i2', name: 'Insight Two' },
    { id: 'i3', name: 'Insight Three' }
  ];
};

export const getOptions = async () => {
  await delay(750);
  return [
    { label: 'High', value: 300 },
    { label: 'Medium', value: 200 },
    { label: 'Low', value: 100 }
  ];
};
