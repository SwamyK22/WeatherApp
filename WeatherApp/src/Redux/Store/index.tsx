import { createStore } from "redux";
import rootReducer from '../Reducers/combinedReducer'


const store = createStore(rootReducer);

export default store;