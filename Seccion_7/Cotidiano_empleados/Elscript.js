function Empleado(expediente, nombre, apellido, nacimiento, cargo) {
    this.expediente = expediente;
    this.nombre = nombre;
    this.apellido = apellido;
    this.nacimiento = nacimiento;
    this.cargo = cargo;
}
let empleados = [];

function agregarEmpleado() {
    let expediente = document.getElementById("txtExpediente").value;
    let nombre = document.getElementById("txtNombre").value;
    let apellido = document.getElementById("txtApellido").value;
    let nacimiento = document.getElementById("txtNacimiento").value;
    let cargo = document.getElementById("txtCargo").value;

    let nuevoEmpleado = new Empleado(expediente, nombre, apellido, nacimiento, cargo);
    empleados.push(nuevoEmpleado);
    limpiarCampos();
}

function mostrarEmpleados() {
    let mensaje = "";
    for (let i = 0; i < empleados.length; i++) {
        let e = empleados[i];
        mensaje += `Expediente: ${e.expediente}\nNombre: ${e.nombre}\nApellido: ${e.apellido}\nNacimiento: ${e.nacimiento}\nCargo: ${e.cargo}\n\n`;
    }
    alert(mensaje);
}

function limpiarCampos() {
    document.getElementById("txtExpediente").value = "";
    document.getElementById("txtNombre").value = "";
    document.getElementById("txtApellido").value = "";
    document.getElementById("txtNacimiento").value = "";
    document.getElementById("txtCargo").value = "";
}