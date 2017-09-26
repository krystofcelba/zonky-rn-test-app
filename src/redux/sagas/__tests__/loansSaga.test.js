import * as matchers from 'redux-saga-test-plan/matchers';
import { expectSaga } from 'redux-saga-test-plan';

import { loansFetchingFlow } from '../loansSaga';
import {
  FETCH_NEXT_LOANS_PAGE,
  FETCH_NEXT_LOANS_PAGE_SUCCESS,
  FETCH_NEXT_LOANS_PAGE_FAILED,
} from '../../reducers/loans';
import { SHOW_ERROR_ALERT } from '../../reducers/ui';
import reducers from '../../reducers';

import * as API from '../api';
import * as Strings from '../../../constants/strings';

const loans = [
  {
    id: 133638,
    name: 'nová střecha nový domov',
    story:
      'Koupili jsme si malý starší domeček.Vše opravili ale na střechu která je stará a zatéka nemáme peníze.Prosíme Zonky aby nám pujčili na novou střechu.Děkujem.',
    photos: [
      {
        name: 'othe-default.cbec3a78.png',
        url: '/loans/133638/photos/15200',
      },
    ],
    termInMonths: 84,
    interestRate: 0.0849,
    rating: 'AA',
    amount: 250000,
    remainingInvestment: 225400,
    published: true,
    deadline: '2017-09-27T11:58:17.922+02:00',
    investmentsCount: 47,
  },
];

it('runs loans fetching flow', () =>
  expectSaga(loansFetchingFlow)
    .withReducer(reducers)
    .provide([[matchers.call.fn(API.fetchLoans), { ok: true, data: loans }]])
    .dispatch({ type: FETCH_NEXT_LOANS_PAGE })
    .put({ type: FETCH_NEXT_LOANS_PAGE_SUCCESS, loans, page: 0 })
    .dispatch({ type: FETCH_NEXT_LOANS_PAGE })
    .put({ type: FETCH_NEXT_LOANS_PAGE_SUCCESS, loans, page: 1 })
    .run());

it('fails fetching next loans page', () =>
  expectSaga(loansFetchingFlow)
    .withReducer(reducers)
    .provide([
      [
        matchers.call.fn(API.fetchLoans),
        { ok: false, data: {}, errorMessage: 'Invalid access token: null' },
      ],
    ])
    .dispatch({ type: FETCH_NEXT_LOANS_PAGE })
    .put({ type: FETCH_NEXT_LOANS_PAGE_FAILED })
    .put({
      type: SHOW_ERROR_ALERT,
      title: Strings.FETCHING_LOANS_ERROR_ALERT_TITLE,
      message: Strings.errorMessageFormatter('Invalid access token: null'),
      duration: 2000,
    })
    .run());
