function App() {
  const pads = [
    { key: "=", id: "equals" },
    { key: "0", id: "zero" },
    { key: "1", id: "one" },
    { key: "2", id: "two" },
    { key: "3", id: "three" },
    { key: "4", id: "four" },
    { key: "5", id: "five" },
    { key: "6", id: "six" },
    { key: "7", id: "seven" },
    { key: "8", id: "eight" },
    { key: "9", id: "nine" },
    { key: "+", id: "add" },
    { key: "-", id: "subtract" },
    { key: "*", id: "multiply" },
    { key: "/", id: "divide" },
    { key: ".", id: "decimal" },
    { key: "c", id: "clear" },
  ];

  
  const [displayText, setDisplayText] = React.useState("0");
 const [isSoundOn] = React.useState(true);

  React.useEffect(() => {
    const handleKeyPress = (event) => {
      const pad = pads.find((p) => p.key === event.key.toUpperCase());
      if (pad) handleClick(pad.key, pad.id);
    };
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [isSoundOn]);
  
  const cambiarColorFondo = () => {
    const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    document.body.style.backgroundColor = randomColor;
  };
  
  
  
  
  
  
  const handleClick = (key) => {
    if (key === "c") {
     
      setDisplayText("0");
    } else if (key === "=") {
     
      try {
        const result = eval(displayText);
        const roundedResult = parseFloat(result.toFixed(5)); 
        setDisplayText(roundedResult.toString()); 
      } catch (error) {
        setDisplayText("Error"); 
      }
    } else if (key === ".") {
     
      const lastNumber = displayText.split(/[^0-9.]/).pop(); 
      if (lastNumber.includes(".")) return; 
      setDisplayText((prevText) => prevText + key);
    } else if (["+", "-", "*", "/"].includes(key)) {
      
      setDisplayText((prevText) => {
        if (/[+\-*/]$/.test(prevText)) {
          if (key === "-") {
           
            return prevText + key;
          } else {
           
            return prevText.replace(/[+\-*/]+$/, key);
          }
        } else {
          return prevText + key;
        }
      });
    } else {
      
      if (displayText === "0" && key === "0") {
        return; 
      } else if (displayText === "0" && key !== ".") {
       
        setDisplayText(key);
      } else {
        
        setDisplayText((prevText) => prevText + key);
      }
    }
  };

  return (
    <div id="mical">
      <label class="switch">
     <input type="checkbox"
       onClick={() => {
          cambiarColorFondo();
        }}
       /> 
      <div class="slider round">  </div>
      </label>
       <h2>色変更</h2> 
      
      {}
      <div id="display">{displayText}</div>
      {}
      {pads.map((pad, index) => (
        <button
          key={index} 
          id={pad.id} 
          onClick={() => handleClick(pad.key)}
        >
          {pad.key} {}
        </button>
      ))}
    </div>
  );
}


ReactDOM.render(<App />, document.getElementById("root"));


 