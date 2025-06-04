var expresion = "";

function agregar(valor) {
  expresion += valor;
  actualizarPantalla();
}

function calcular() {
  try {
    var resultado = eval(expresion);
    var operacion = expresion + " = " + resultado;
    guardarHistorial(operacion);
    expresion = resultado.toString();
    actualizarPantalla();
  } catch (e) {
    expresion = "";
    document.getElementById("pantalla").innerText = "Error";
  }
}


function actualizarPantalla() {
  document.getElementById("pantalla").innerText = expresion || "0";
}

function guardarHistorial(operacion) {
  var historial = JSON.parse(localStorage.getItem("historial")) || [];
  historial.unshift(operacion);
  localStorage.setItem("historial", JSON.stringify(historial));
  mostrarHistorial();
}

function mostrarHistorial() {
  var historial = JSON.parse(localStorage.getItem("historial")) || [];
  var contenido = "<strong>Historial:</strong><br>";
  for (var i = 0; i < historial.length; i++) {
    contenido += "<div>" + historial[i] + "</div>";
  }
  document.getElementById("historial").innerHTML = contenido;
}

function limpiarHistorial() {
  localStorage.removeItem("historial");
  mostrarHistorial();
}

function toggleModo() {
  document.body.classList.toggle("oscuro");
}

// Soporte para teclado físico
document.addEventListener("keydown", function(e) {
  var k = e.key;
  if ((k >= '0' && k <= '9') || k === '.' || k === '+' || k === '-' || k === '*' || k === '/') {
    agregar(k);
  } else if (k === 'Enter') {
    calcular();
  } else if (k === 'Backspace') {
    expresion = expresion.slice(0, -1);
    actualizarPantalla();
  } else if (k === 'Escape') {
    borrar();
  }
});

// Cargar historial al iniciar
mostrarHistorial();

