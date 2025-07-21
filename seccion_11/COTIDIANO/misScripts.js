function cargarContenido() {
    cargarCotizaciones(mostrarCotizacion);
    cargarElementos();
}

function cargarCotizaciones(callback) {
    const bitcoinUrl = "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd";
    const euroUrl = "https://api.exchangerate-api.com/v4/latest/EUR";
    const usdUrl = "https://api.exchangerate-api.com/v4/latest/USD";

    Promise.all([
        fetch(bitcoinUrl).then(response => {
            if (!response.ok) throw new Error('Error en la API de Bitcoin');
            return response.json();
        }),
        fetch(euroUrl).then(response => {
            if (!response.ok) throw new Error('Error en la API de Euro');
            return response.json();
        }),
        fetch(usdUrl).then(response => {
            if (!response.ok) throw new Error('Error en la API de USD');
            return response.json();
        })
    ]).then(data => {
        const bitcoinValue = data[0].bitcoin.usd;
        const euroToUsd = data[1].rates.USD;
        const crcToUsd = data[2].rates.CRC;

        callback(bitcoinValue, euroToUsd, crcToUsd);
    }).catch(error => {
        console.error("Error al cargar las cotizaciones:", error);
        document.getElementById('BitcoinUsd').innerHTML = "Error al cargar Bitcoin";
        document.getElementById('EurUsd').innerHTML = "Error al cargar Euro";
        document.getElementById('CrcUsd').innerHTML = "Error al cargar Colones";
    });
}

function mostrarCotizacion(bitcoinValue, euroToUsd, crcToUsd) {
    document.getElementById('BitcoinUsd').innerHTML = "Bitcoin a USD: " + bitcoinValue;
    document.getElementById('EurUsd').innerHTML = "Euro a Dólares: " + euroToUsd;
    document.getElementById('CrcUsd').innerHTML = "Colones a Dólares: " + crcToUsd;
}

function cargarElementos() {
    document.getElementById('titulo').innerHTML = "Cotizaciones Online";
}
