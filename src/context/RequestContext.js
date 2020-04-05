import createDataContext from './createDataContext';

const requestReducer = (state, action) => {
  switch (action.type) {
    case 'fetch_requests':
      return { ...state };
    case 'create_request':
      return { ...state, requests: [...state.requests, action.payload] };
    default:
      return state;
  }
};

const fetchRequests = dispatch => async () => {
  dispatch({ type: 'fetch_requests' });
};
const createRequest = dispatch => async ({ name, location }) => {
  dispatch({ type: 'create_request', payload: { name, location } });
};

export const { Provider, Context } = createDataContext(
  requestReducer,
  {
    fetchRequests,
    createRequest
  },
  { requests: [] }
);
