import { createStore, combineReducers } from 'redux';
import membersReducer from './reducers/membersReducer';
import coachesReducer from './reducers/cochesReducer';

const rootReducer = combineReducers({
  members: membersReducer,
  coaches : coachesReducer
});

const store = createStore(rootReducer);

export default store;