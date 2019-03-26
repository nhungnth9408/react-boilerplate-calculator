import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import {
  makeSelectRepos,
  makeSelectLoading,
  makeSelectError,
} from 'containers/App/selectors';
import ReposList from 'components/ReposList';

import Form from './Form';
import Input from './Input';
// import AtPrefix from './AtPrefix';

import './Calculator.css';
import {
  count,
  evaluatePostFix,
  changeExpression,
  changeUsername,
} from './actions';

import {
  countNumber,
  getResult,
  selectExpression,
  makeSelectUsername,
} from './selectors';
import { loadRepos } from '../App/actions';
import reducer from './reducer';
import saga from './saga';
export class Calculator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.clickItem = this.clickItem.bind(this);
  }

  // componentWillReceiveProps(nextProps) {
  //   // console.log('result', nextProps.result);
  //   if (nextProps) {
  //     this.setState({
  //       value: nextProps.result,
  //     });
  //   }
  //   console.log('result', nextProps.result);
  // }

  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  clickItem(e) {
    const keyPress = e.target.innerText;
    // copy array
    // const newState = this.state.value.slice();
    const { onChangeExpression, expression } = this.props;
    // convert imutable list to array
    // console.log('Calculator expression: ', expression, ' ', this.props);
    const newState = expression.toArray();
    switch (keyPress) {
      case '=':
        console.log('Calculator onCalculate');
        this.props.onCalculate(newState);
        return;
      case 'AC':
        console.log('Calculator pop');
        newState.pop();
        break;
      default:
        console.log('Calculator push');
        newState.push(keyPress);
        break;
    }
    // this.setState({
    //   value: newState,
    // });
    onChangeExpression(newState);
  }

  board = () =>
    [
      '(',
      ')',
      '%',
      'AC',
      '7',
      '8',
      '9',
      '/',
      '4',
      '5',
      '6',
      '*',
      '1',
      '2',
      '3',
      '-',
      '0',
      '.',
      '=',
      '+',
    ].map(item => (
      <button
        name={item}
        type="button"
        key={item}
        className="item"
        onClick={this.clickItem}
      >
        {item}
      </button>
    ));

  render() {
    const { loading, error, repos, result, expression } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };
    console.log('Calculator: ', this.props.username);
    return (
      <div className="container">
        <input className="input" value={result} />
        <input
          className="input"
          value={expression.join('')}
          onChange={() => {}}
        />
        <div className="board">{this.board()}</div>
        <Form onSubmit={this.props.onSubmitForm}>
          <label htmlFor="username">
            {/* <FormattedMessage {...messages.trymeMessage} />
            <AtPrefix>
              <FormattedMessage {...messages.trymeAtPrefix} />
            </AtPrefix> */}
            <Input
              id="username"
              type="text"
              placeholder="mxstbr"
              value={this.props.username}
              onChange={this.props.onChangeUsername}
            />
          </label>
        </Form>
        <ReposList {...reposListProps} />
      </div>
    );
  }
}
// export default Calculator;
Calculator.propTypes = {
  expression: PropTypes.oneOfType([PropTypes.array, PropTypes.object]),
  // onCount: PropTypes.func,
  onCalculate: PropTypes.func,
  // number: PropTypes.number,
  result: PropTypes.number,
  username: PropTypes.string,
  onChangeExpression: PropTypes.func,
  onChangeUsername: PropTypes.func,
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  repos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]),
  onSubmitForm: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    // call action
    onChangeExpression: exp => dispatch(changeExpression(exp)),
    onCount: () => dispatch(count()),
    onCalculate: value => dispatch(evaluatePostFix(value)),
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onSubmitForm: evt => {
      if (evt !== undefined && evt.preventDefault) evt.preventDefault();
      dispatch(loadRepos());
    },
    // name => dispatch(changeUsername(name)),
  };
}

const mapStateToProps = createStructuredSelector({
  // call to selector
  number: countNumber(),
  result: getResult(),
  expression: selectExpression(),
  // do again saga section
  repos: makeSelectRepos(),
  username: makeSelectUsername(),
  loading: makeSelectLoading(),
  error: makeSelectError(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

/**
 * key is named by coder
 */
const withReducer = injectReducer({ key: 'calculator', reducer });
const withSaga = injectSaga({ key: 'calculator', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Calculator);
