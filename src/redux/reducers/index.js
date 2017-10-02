import { combineReducers } from 'redux';

import nav from './nav';
import auth from './auth';
import loans from './loans';

export default combineReducers({ nav, auth, loans });
