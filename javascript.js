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

  // Estado inicial del display es "0"
  const [displayText, setDisplayText] = React.useState("0");

  // Función para manejar el clic en los botones
  const handleClick = (key) => {
    if (key === "c") {
      // Si es el botón de "clear", restablece el display a "0"
      setDisplayText("0");
    } else if (key === "=") {
      // Si es el botón de "equals", evalúa la expresión
      try {
        const result = eval(displayText); // Evalúa la expresión matemática
        setDisplayText(result.toString()); // Muestra el resultado
      } catch (error) {
        setDisplayText("Error"); // Maneja errores de evaluación
      }
    } else if (key === ".") {
      // Lógica para el punto decimal
      const lastNumber = displayText.split(/[\+\-\*\/]/).pop(); // Obtiene el último número ingresado
      if (lastNumber.includes(".")) return; // Si ese número ya tiene un punto decimal, no hace nada
      setDisplayText((prevText) => prevText + key);
    } else {
      // Control para evitar números que empiecen con múltiples ceros
      if (displayText === "0" && key === "0") {
        return; // No hace nada si se intenta poner otro "0" al inicio
      } else if (displayText === "0" && key !== ".") {
        // Reemplaza el "0" inicial si se ingresa un número diferente de "."
        setDisplayText(key);
      } else {
        // Concatena el valor del botón al display
        setDisplayText((prevText) => prevText + key);
      }
    }
  };

  return (
    <div>
      {/* Display para mostrar el texto */}
      <div id="display">{displayText}</div>
      {/* Renderizar los botones */}
      {pads.map((pad, index) => (
        <button
          key={index} // Usamos el índice como clave única
          id={pad.id} // Accedemos a la propiedad `id` del objeto `pad`
          onClick={() => handleClick(pad.key)} // Manejador de clic
        >
          {pad.key} {/* Accedemos a la propiedad `key` del objeto `pad` */}
        </button>
      ))}
    </div>
  );
}

// Renderizar el componente en el DOM
ReactDOM.render(<App />, document.getElementById("root"));


 