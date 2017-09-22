import { createStore } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';

import rootReducer from './reducers';

const composeEnhancers = composeWithDevTools({ realtime: true, hostname: 'localhost', port: 8000 });

const store = createStore(rootReducer, composeEnhancers());

export default store;
