import React, { Component } from 'react';
import './Calculator.css';
import caculator from './ultis';
// var ans = 0;
// var param1 = "";
class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            result: [],
            result1: 0,
        }
        this.clickItem = this.clickItem.bind(this);
        // value = "";
    }

    calculate(par1, type, par2) {
        var result = 0;
        switch (type) {
            case "+": result = par1 + par2; break;
            case "-": result = par1 - par2; break;
            case ":": result = par1 / par2; break;
            case "x": result = par1 * par2; break;
            default: result = par1; break;
        }
        return result;
    }

    convertToArr = () => {
        debugger
        let stack = [];
        let newState = this.state.result.slice();
        let item = "";
        for (let i = 0; i < newState.length; i++) {
            if (this.operator(newState[i])) {
                item += newState[i];
            } else {
                if (item !== "") {
                    stack.push(item);
                }
                stack.push(newState[i]);
                item = "";
            }
        }
        if (item !== "") {
            stack.push(item);
        }
        console.log(stack);
        return stack;
    }

    clickItem(e) {
        //debugger 
        //alert(e.target.innerText)
        const keyPress = e.target.innerText;
        // copy array
        let newState = this.state.result.slice();
        switch (keyPress) {
            case '=':
                newState = [this.evaluatePostFix()];
                this.setState({
                    result1: newState
                });
                return;
            // newState = [this.convertToArr()];
            // break;
            case 'AC':
                newState.pop();
                break;
            default:
                newState.push(keyPress);
                break
        }
        this.setState({
            result: newState
        })
    }

    render() {
        // test postfix
        // let arr = ["2", "3", "4", "+", "3", "-", "2", "/", "*", "2"];
        const { result, result1 } = this.state;
        const board = ["(", ")", "%", "AC", "7",
            "8", "9", "/", "4", "5",
            "6", "*", "1", "2", "3",
            "-", "0", ".", "=", "+"].map((item, index) =>
                <button key={index}
                    className="item"
                    onClick={this.clickItem}
                // onClick={this.toPostFix}
                // onClick={this.evaluatePostFix}
                >{item}</button>)

        return (<div className="container">
            <input className="input" value={result1} />
            <input className="input" value={result.join('')} onChange={() => { }} />
            <div className="board">
                {board}
            </div>
        </div>)
    }

    toPostFix = () => {
        // implement
        let result = "";
        const stack = [];
        const outString = [];
        // const string = ["23", "*", "2", "+", "3", "*", "2", "-", "2", "+", "6", "/", "2"];
        const string = this.convertToArr();
        // const string = ["23","*", "2", "+", "3", "-", "6"];
        // const string = "2*(3+4)-2"; 
        //*(+  *(-/  *(  *  
        //234+32/-*2/
        // const string = "2*3+4*2-3/4+2";
        //*  +  +*  +- +-/ +-+
        // 23*42+34-2+
        for (let i = 0; i < string.length; i++) {
            var c = string[i];
            if (this.operator(c)) {
                outString.push(c);
            } else {
                if (stack.length === 0 || c === "(") {
                    stack.push(c)
                } else if (c === ")") {
                    while (stack[stack.length - 1] !== "(") {
                        outString.push(stack.pop());
                    }
                    stack.pop();
                } else {
                    while ((stack.length > 0 && this.hasHigherPrec(stack[stack.length - 1], c))) {
                        outString.push(stack.pop());
                    }
                    stack.push(c);
                }
            }
        }
        while (stack.length !== 0) {
            outString.push(stack.pop());
        }
        console.log(outString);
        return outString;
    }

    //V1: stack.pop() 
    hasHigherPrec = (v1, v2) => {
        // debugger
        if (v1 === "(") {
            return false;
        }
        let prior1 = 0;
        let prior2 = 0;
        const operators = [
            { value: "+", prior: "1" },
            { value: "-", prior: "1" },
            { value: "*", prior: "2" },
            { value: "/", prior: "2" }];
        operators.map((item, index) => {
            if (item.value === v1) {
                prior1 = parseInt(item.prior);
            }
            if (item.value === v2) {
                prior2 = parseInt(item.prior);
            }
        });
        if (prior1 >= prior2) {
            return true;
        }
        return false;
    }



    caculator = (o1, o2, operand) => {
        let result = 0;
        switch (operand) {
            case "+": result = o1 + o2; break;
            case "-": result = o1 - o2; break;
            case "*": result = o1 * o2; break;
            case "/": result = o1 / o2; break;
            default: result = 0; break;
        }
        return result;
    }

    evaluatePostFix = () => {
        debugger
        // let arr = "234+32/-*2/";
        // let arr = ["23","3","4","+","3","2","/","-","*","2", "/"]
        let arr = this.toPostFix();
        // let arr = ["23","2", "*", "3", "+", "6", "-"];
        let stack = [];
        let i = 0;
        let o1, o2, operand;
        while (i < arr.length) {
            if (this.operator(arr[i])) {
                stack.push(arr[i]);
            } else {
                operand = arr[i];
                o2 = stack.pop();
                o1 = stack.pop();
                stack.push(this.caculator(parseFloat(o1), parseFloat(o2), operand));
            }
            i++;
        }
        console.log(stack);
        return stack;
    }

    operator(char) {
        if (char.charCodeAt(0) >= 48 && char.charCodeAt(0) <= 57) {
            return true;
        }
        return false;
    }
}

export default Calculator;
