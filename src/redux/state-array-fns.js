export const addItemToArray = (state, action) => {
  state.push(action.payload);
  return state;
};

export const removeItemById = (state, action) => {
  const index = state.findIndex(i => i.id === action.payload);
  state.splice(index, 1);
  return state;
};

export const updateItemInArray = (state, action) => {
  const index = state.findIndex(i => i.id === action.payload.id);
  state[index] = action.payload;
  return state;
};
