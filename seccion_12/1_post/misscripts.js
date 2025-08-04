async function crearPost(titulo, contenido) {
    try{
        let respuesta = await fetch('https://api.restful-api.dev/objects',
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",

            },
            body: Json.stringify({
                name: titulo,
                data: contenido
            }),

        })
        if(!respuesta.ok){
            throw new Error("Error en la solicitud: "+ respuesta.statusText) 
        }
        let data = await respuesta.json();
        console.log("Registro creado", data)
    }catch(error){
        console.error("Algo salio mal al crear el registro :", error)
    }
    
}

crearPost("Mi titulo de ejemplo",
    {"contenido1": "mi contenido de ejemplo",
        "contenido2": "mi contend de ejemplo 2"})