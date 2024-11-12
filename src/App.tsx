import { useState } from 'react'
import './App.css'

function App() {
  const [answer, setAnswer] = useState("");
  const [expression, setExpression] = useState("");
  const et = expression.trim();
  let newEt;

  const isOperator = (Symbol : string) => {
    return /[-+*/]/.test(Symbol);
  }
  const buttonPress = (symbol: string) => {
    if(symbol === "clear") {
      setAnswer("");
      setExpression("0");
    } else if(symbol === "negative") {
      if(answer === "") return;
      setAnswer(
        answer.toString().charAt(0) === "-" ? answer.slice(1) : "-" + answer
      );
    } else if(symbol === "percent") {
      if(answer === "") return;
      setAnswer((parseFloat(answer) / 100).toString());
    } else if(isOperator(symbol)) {
      if (isOperator(et.charAt(et.length - 1))) {
        if(symbol!== "-") {
          if(isOperator(et?.charAt(et.length - 2))) {
            newEt = et.slice(0, et.length - 2) + symbol;
          } else {
            newEt = et.slice(0, et.length - 1) + symbol;
          }
         setExpression(newEt + "");
        } else {
            if(!isOperator(et?.charAt(et.length - 2))) {
              setExpression(et + "" + symbol + "");
            }
         }    
      }
      else {
        setExpression(et + "" + symbol + "");
      }
    } else if(symbol === "=") {
      calculate();
    } else if(symbol === "0") {
      if(expression.charAt(0) !== "0") {
        setExpression(expression + symbol);
      }
    } else if(symbol === ".") {
      //split by operator and get last number
      const lastNumber = expression.split(/[-+*/]/g).pop();
      //if last number alrady has a decimal, dont add another
      if(lastNumber?.includes(".")) return;
      setExpression(expression + symbol);
    } else {
      if(expression.charAt(0) === "0") {
        //if the first character is 0, replace it with symbol
        setExpression(expression.slice(1) + symbol);
      }
      else {
        setExpression(expression + symbol);
      }
    }
  }

  const calculate = () => {
    //if last char is operator, do nothing
    if(isOperator(et.charAt(et.length - 1))) return;
    //clear the expression so that two operators in a row uses the last operator
    else {
      if(isOperator(et.charAt(0))) {
        setAnswer(eval(answer + expression as string))
      } else {
        setAnswer(eval(expression) as string);
      }
    }
    setExpression("");
  };

  return (
    <>
      <div className="container">
        <h1>Calculator Application</h1>
        <div id="calculator">
          <div id="display" style={{textAlign: "right"}}>
            <div id="answer">{answer}</div>
            <div id="expression">{expression}</div>
          </div>
          <button id="clear" onClick={() => buttonPress("clear")} className="light-grey">C</button> 
          <button id="negative" onClick={() => buttonPress("negative")} className="light-grey">+/-</button> 
          <button id="percentage" onClick={() => buttonPress("percent")} className="light-grey">%</button> 
          <button id="divide"onClick={() => buttonPress("/")} className="yellow">/</button> 
          <button id="seven"onClick={() => buttonPress("7")} className="dark-grey">7</button> 
          <button id="eight"onClick={() => buttonPress("8")} className="dark-grey">8</button> 
          <button id="nine" onClick={() => buttonPress("9")} className="dark-grey">9</button> 
          <button id="multiply" onClick={() => buttonPress("*")} className="yellow">x</button> 
          <button id="four" onClick={() => buttonPress("4")} className="dark-grey">4</button> 
          <button id="five" onClick={() => buttonPress("5")} className="dark-grey">5</button> 
          <button id="six" onClick={() => buttonPress("6")} className="dark-grey">6</button> 
          <button id="subtract" onClick={() => buttonPress("-")} className="yellow">-</button> 
          <button id="one" onClick={() => buttonPress("1")} className="dark-grey">1</button> 
          <button id="two" onClick={() => buttonPress("2")} className="dark-grey">2</button> 
          <button id="three" onClick={() => buttonPress("3")} className="dark-grey">3</button> 
          <button id="add" onClick={() => buttonPress("+")} className="yellow">+</button> 
          <button id="zero" onClick={() => buttonPress("0")} className="dark-grey">0</button> 
          <button id="decimal" onClick={() => buttonPress(".")} className="dark-grey">.</button> 
          <button id="equals" onClick={() => buttonPress("=")} className="yellow">=</button>
        </div>
      </div>
    </>
  )
}

export default App
