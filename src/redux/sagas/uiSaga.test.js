import { expectSaga } from 'redux-saga-test-plan';

import { errorAlertFlow } from './uiSaga';
import { SHOW_ERROR_ALERT, HIDE_ERROR_ALERT, SET_ERROR_ALERT_VISIBLE } from '../reducers/ui';

it('shows error alert', () => {
  const title = '';
  const message = '';
  expectSaga(errorAlertFlow)
    .dispatch({ type: SHOW_ERROR_ALERT, title, message })
    .put({ type: SET_ERROR_ALERT_VISIBLE, visible: true, title, message, duration: 1 })
    .put({ type: SET_ERROR_ALERT_VISIBLE, visible: false })
    .run();
});

it('shows error alert and hides it before duration is over', () => {
  const title = '';
  const message = '';
  expectSaga(errorAlertFlow)
    .dispatch({ type: SHOW_ERROR_ALERT, title, message })
    .put({ type: SET_ERROR_ALERT_VISIBLE, visible: true, title, message, duration: 4000 })
    .dispatch({ type: HIDE_ERROR_ALERT })
    .put({ type: SET_ERROR_ALERT_VISIBLE, visible: false })
    .run();
});
