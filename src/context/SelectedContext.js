import createDataContext from './createDataContext';

const selectedReducer = (state, action) => {
  switch (action.type) {
    case 'set_selected':
      return { ...state, selected: action.payload };
    case 'set_type':
      return { ...state, type: action.payload };
    default:
      return state;
  }
};

const setSelectedState = dispatch => selected => {
  dispatch({ type: 'set_selected', payload: selected });
};

const setSelectedType = dispatch => type => {
  dispatch({ type: 'set_type', payload: type });
};

export const { Context, Provider } = createDataContext(
  selectedReducer,
  { setSelectedState, setSelectedType },
  { selected: null }
);
