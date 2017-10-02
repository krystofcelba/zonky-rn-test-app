import { combineReducers } from 'redux';

import nav from './nav';
import auth from './auth';
import loans from './loans';
import ui from './ui';

export default combineReducers({ nav, auth, loans, ui });
