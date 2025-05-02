let notas = [7, 4, 8, 9, 6];

function listarNotas() {
    const lista = document.getElementById("listadeNotas");
    lista.innerHTML = ""; 
    notas.forEach(nota => {
        const li = document.createElement("li");
        li.textContent = nota;
        lista.appendChild(li);
    });
}
 

function calcularPromedio() {
    const suma = notas.reduce((a, b) => a + b, 0); 
    const promedio = (suma / notas.length).toFixed(2); 
    document.getElementById("promedio").textContent = promedio; 
}
function notaMasAlta() {
    const max = Math.max(...notas); 
    document.getElementById("nota").textContent = max; 
}
function hayAplazo() {
    const aplazo = notas.some(nota => nota < 6);
    document.getElementById("aplazo").textContent = aplazo ? "Sí" : "No"; 
}