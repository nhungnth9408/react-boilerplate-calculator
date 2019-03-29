/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export const scope = 'boilerplate.components.Header';

export default defineMessages({
  home: {
    id: `${scope}.home`,
    defaultMessage: 'Home',
  },
  calculator: {
    id: `${scope}.calculator`,
    defaultMessage: 'Calculator',
  },
  features: {
    id: `${scope}.features`,
    defaultMessage: 'Features',
  },
  login: {
    id: `${scope}.login`,
    defaultMessage: 'Login',
  },
  menu: {
    id: `${scope}.menu`,
    defaultMessage: 'Menu',
  },
  table: {
    id: `${scope}.table`,
    defaultMessage: 'Table',
  },
});
