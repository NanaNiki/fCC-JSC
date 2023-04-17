// Import necessary React and ReactDOM hooks and libraries
const { useState, useEffect } = React;
const { render } = ReactDOM;

// Main component of simple JavaScript Calculator application, which contains the logic and UI.
function App() {
  // State variables initialized with an initial value and a corresponding setter function.
  const [input, setInput] = useState("");
  const [output, setOutput] = useState(input);
  const [darkMode, setDarkMode] = useState(true);

  // Toggle between light/dark mode, updating the HTML document accordingly
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  /**
   * Effect hook that updates the class on the HTML document element based on the darkMode state.
   * @effect
   * @param {boolean} darkMode - The state variable that toggles dark mode
   */
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [darkMode]);

  /**
   * Handles click events on the calculator buttons and updates the input and output fields accordingly.
   * @param {Object} event - The click event object.
   */
  function handleClick(event) {
    // Get the value of the clicked button.
    let symbol = event.target.value;
    // Define regular expression to match mathematical operators.
    const operators = /[\+\*\-/]/;
    // Get the last character in the input field.
    const lastChar = input[input.length - 1];

    /* This pattern of using the previous state
    value to calculate the new state value is known as the "functional update" pattern in React. */
    setInput((prevValue) => {
      // Handle decimal point input. This ensures that the input value always has a valid decimal point format.
      if (prevValue.split(operators).slice(-1)[0].includes("."))
        if (symbol === ".") {
          setInput(prevValue.replace(/\.+$/g, "."));
        } else if (/[0-9]/.test(symbol)) {
          setOutput(prevValue.replace(/\.+$/g, ".") + symbol);
        }
      // Handle consecutive operator input, to ensure that the input field always contains a valid mathematical expression.
      if (/[\-\+\*\/](?=[\-\+\*\/])/.test(prevValue)) {
        let lastOperator = prevValue.match(/[\-\+\*\/]/g).slice(-1)[0];
        if (prevValue.match(/\-(?=[\d])/g) || lastOperator === "-") {
          setInput(
            prevValue
              .split(/[\-\+\*\/](?=[\+\*\/])/g)
              .filter(Boolean)
              .join("") + symbol
          );
        } else {
          setInput(
            prevValue
              .split(/[\-\+\*\/](?=[\-\+\*\/])/g)
              .filter(Boolean)
              .join("") + symbol
          );
        }
      }
      // Handle input after an equals sign has been pressed, ensuring that the calculator can continue to perform calculations based on the previous result.
      if (lastChar === "=") {
        if (/[0-9.]/.test(symbol)) {
          setInput(symbol);
        } else {
          setInput(output + symbol);
        }
      }
      // Handle input of leading decimal point or after operator
      if (symbol === "." && input === "") {
        setInput("0.");
      } else if (symbol === "." && lastChar.match(operators)) {
        setInput(input + "0.");
      }
    });

    // Strip leading zeros from input and output
    setInput((input + symbol).replace(/^0+/, "0"));
    setOutput((input + symbol).replace(/^0+/, "0"));
  }

  // Calculates the result of the input expression setting it as the output and updates the input to include an equal sign
  const calculate = () => {
    setOutput(eval(input));
    setInput((prevValue) => prevValue + "=");
  };

  //Resets the input and output values to their default values
  const allclear = () => {
    setInput("");
    setOutput(0);
  };

  //Removes the last character from the input field and clears the output field
  const back = () => {
    setInput((prevValue) =>
      prevValue
        .split("")
        .slice(0, prevValue.length - 1)
        .join("")
    );
    setOutput(0);
  };

  /**
   * React component that renders a Calculator app.
   * The app has a display section for showing the input and the result of mathematical operations.
   * It includes buttons for numbers, operators, and a clear function.
   * The component includes a toggle button to switch between light and dark mode.
   * The calculator supports basic arithmetic operations such as addition, subtraction, multiplication, and division.
   * Within the footer there is link to the developer's profile page on freeCodeCamp website.
   * The component is designed to help users perform basic arithmetic operations.
   */
  return (
    <div className="calculator">
      <button className="btn float-end m-3 drkmdbtn" onClick={toggleDarkMode}>
        {darkMode ? (
          <i className="fa-solid fa-sun"></i>
        ) : (
          <i className="fa-solid fa-moon"></i>
        )}
      </button>
      <h1 className="title text-center p-5 ms-3">JavaScript Calculator</h1>
      <div className="grid cointainer p-5">
        <div className="dis display">
          <input className="pe-2" type="text" value={input} readOnly />
          <input
            className="total me-2"
            type="text"
            id="display"
            value={output}
            readOnly
          />
        </div>
        <button onClick={allclear} className="calcbtn AC" id="clear" value="AC">
          AC
        </button>
        <button onClick={back} className="calcbtn C" value="C">
          C
        </button>
        <button
          onClick={handleClick}
          className="calcbtn divid"
          id="divide"
          value="/"
        >
          /
        </button>
        <button
          onClick={handleClick}
          className="calcbtn multi"
          id="multiply"
          value="*"
        >
          *
        </button>
        <button
          onClick={handleClick}
          className="calcbtn seven"
          id="seven"
          value="7"
        >
          7
        </button>
        <button
          onClick={handleClick}
          className="calcbtn eight"
          id="eight"
          value="8"
        >
          8
        </button>
        <button
          onClick={handleClick}
          className="calcbtn nine"
          id="nine"
          value="9"
        >
          9
        </button>
        <button
          onClick={handleClick}
          className="calcbtn minus"
          id="subtract"
          value="-"
        >
          -
        </button>
        <button
          onClick={handleClick}
          className="calcbtn four"
          id="four"
          value="4"
        >
          4
        </button>
        <button
          onClick={handleClick}
          className="calcbtn five"
          id="five"
          value="5"
        >
          5
        </button>
        <button
          onClick={handleClick}
          className="calcbtn six"
          id="six"
          value="6"
        >
          6
        </button>
        <button
          onClick={handleClick}
          className="calcbtn plus"
          id="add"
          value="+"
        >
          +
        </button>
        <button
          onClick={handleClick}
          className="calcbtn one"
          id="one"
          value="1"
        >
          1
        </button>
        <button
          onClick={handleClick}
          className="calcbtn two"
          id="two"
          value="2"
        >
          2
        </button>
        <button
          onClick={handleClick}
          className="calcbtn three"
          id="three"
          value="3"
        >
          3
        </button>
        <button
          onClick={calculate}
          className="calcbtn equal"
          id="equals"
          value="="
        >
          =
        </button>
        <button
          onClick={handleClick}
          className="calcbtn zero"
          id="zero"
          value="0"
        >
          0
        </button>
        <button
          onClick={handleClick}
          className="calcbtn dot"
          id="decimal"
          value="."
        >
          .
        </button>
      </div>
      <div className="footer">
        Made with <i className="fa-regular fa-heart fa-xs"></i> by
        <a
          href="https://www.freecodecamp.org/NanaNiki"
          target="_blank"
          className="nana"
        >
          {" "}
          Nicol
        </a>
      </div>
    </div>
  );
}
/**
 * Renders the App component to the DOM.
 * @function
 * @name render
 * @param {ReactElement} App - The root component of the application.
 * @param {HTMLElement} root - The DOM element to which the App component should be rendered.
 */
ReactDOM.render(<App />, document.getElementById("root"));
