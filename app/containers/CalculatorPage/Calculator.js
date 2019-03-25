import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import injectReducer from 'utils/injectReducer';
import './Calculator.css';
import { count, evaluatePostFix, changeExpression } from './actions';
import { countNumber, getResult, selectExpression } from './selectors';
import reducer from './reducer';
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

  clickItem(e) {
    const keyPress = e.target.innerText;
    // copy array
    // const newState = this.state.value.slice();
    const { onChangeExpression, expression } = this.props;
    // convert imutable list to array
    // console.log('Calculator expression: ', expression);
    const newState = expression.toArray();
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
    const { result, expression } = this.props;
    return (
      <div className="container">
        <input className="input" value={result} />
        <input
          className="input"
          value={expression.join('')}
          onChange={() => {}}
        />
        <div className="board">{this.board()}</div>
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
  onChangeExpression: PropTypes.func,
};

export function mapDispatchToProps(dispatch) {
  return {
    // call action
    onChangeExpression: exp => dispatch(changeExpression(exp)),
    onCount: () => dispatch(count()),
    onCalculate: value => dispatch(evaluatePostFix(value)),
  };
}

const mapStateToProps = createStructuredSelector({
  // call to selector
  number: countNumber(),
  result: getResult(),
  expression: selectExpression(),
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
