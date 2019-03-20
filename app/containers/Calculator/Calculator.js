import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import './Calculator.css';
// import injectSaga from 'utils/injectSaga';
// import Button from 'components/Button';
// import H2 from 'components/H2';
// import ReposList from 'components/ReposList';
// import Form from './Form';
// import Input from './Input';
import { count, evaluatePostFix } from './actions';
import { countNumber, getResult } from './selectors';
import reducer from './reducer';
export class Calculator extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: [],
      result1: 0,
    };
    this.clickItem = this.clickItem.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    // console.log('result', nextProps.result);
    if (nextProps) {
      this.setState({
        result1: nextProps.result,
      });
    }
    console.log('result', nextProps.result);
  }

  clickItem(e) {
    const keyPress = e.target.innerText;
    // copy array
    const newState = this.state.value.slice();
    switch (keyPress) {
      case '=':
        this.props.onCalculate(newState);
        return;
      case 'AC':
        newState.pop();
        break;
      default:
        newState.push(keyPress);
        break;
    }
    this.setState({
      value: newState,
    });
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
    ].map((item, index) => (
      <button
        type="button"
        key={index}
        className="item"
        onClick={this.clickItem}
      >
        {item}
      </button>
    ));

  render() {
    //result1 or result is true too
    const { result } = this.props;
    const { value, result1 } = this.state;
    return (
      <div className="container">
        <input className="input" value={result} />
        <input className="input" value={value.join('')} onChange={() => {}} />
        <div className="board">{this.board()}</div>
      </div>
    );
  }
}
// export default Calculator;
Calculator.propTypes = {
  // onCount: PropTypes.func,
  onCalculate: PropTypes.func,
  // number: PropTypes.number,
  result: PropTypes.number,
};

export function mapDispatchToProps(dispatch) {
  return {
    // call action
    onCount: () => dispatch(count()),
    onCalculate: value => dispatch(evaluatePostFix(value)),
  };
}

const mapStateToProps = createStructuredSelector({
  // call to selector
  number: countNumber(),
  result: getResult(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

/**
 * key is named by coder
 */
const withReducer = injectReducer({ key: 'calculator', reducer });
// const withSaga = injectSaga({ key: 'calculator', saga });

export default compose(
  withReducer,
  // withSaga,
  withConnect,
)(Calculator);