/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import styled from 'styled-components';
// Route
import { Switch, Route } from 'react-router-dom';

import Calculator from 'containers/CalculatorPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import HoverDemo from 'containers/HoverDemo/Loadable';
import HomePage from 'containers/HomePage/Loadable';
import FeaturePage from 'containers/FeaturePage/Loadable';
import TableForm from 'containers/TableForm/Loadable';
import Header from 'components/Header';

const AppWrapper = styled.div`
  max-width: calc(768px + 16px * 2);
  margin: 0 auto;
  display: flex;
  min-height: 100%;
  padding: 0 16px;
  flex-direction: column;
`;

export default function App() {
  return (
    <AppWrapper>
      <Header />
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route path="/calculator" component={Calculator} />
        <Route path="/features" component={FeaturePage} />
        <Route path="/login" component={LoginPage} />
        <Route path="/menu" component={HoverDemo} />
        <Route path="/table" component={TableForm} />
      </Switch>
    </AppWrapper>
  );
}
