import { combineReducers } from 'redux';
import dataReducer from './dataReducer';

const combinedReducer = combineReducers({
    dataReducer
});

export default combinedReducer;