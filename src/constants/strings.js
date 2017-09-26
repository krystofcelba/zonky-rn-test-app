/* @flow */
import { format } from 'currency-formatter';

export const USERNAME = 'Uživatelské jméno';
export const PASSWORD = 'Heslo';
export const SIGN_IN = 'Přihlásit se';

export const NAVBAR_TITLE = 'ZONKY';
export const RATING = 'RATING';
export const INTEREST_RATE = 'ÚROK';
export const REPAYMENT_PERIOD = 'DOBA';
export const INVESTORS_COUNT = 'INVESTOVALO';
export const REMAINING_TIME = 'ZBÝVAJICÍ ČAS';

export const LOGIN_ERROR_ALERT_TITLE = 'Přihlašování se nezdařilo!';
export const TOKEN_REFRESHING_ERROR_ALERT_TITLE = 'Chyba komunikace. Nyní budete odhlášeni.';
export const FETCHING_LOANS_ERROR_ALERT_TITLE = 'Stahování dat se nezdařilo!';

export const errorMessageFormatter = (message: string) => `Chyba: ${message}`;

const formatCzkAmount = (amount: number) => format(amount, { code: 'CZK', precision: 0 });

export const loanProgressTitleFormatter = (invested: number, amount: number) =>
  `Investováno ${formatCzkAmount(invested)} z ${formatCzkAmount(amount)}`;
