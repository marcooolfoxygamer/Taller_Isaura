document.addEventListener('DOMContentLoaded', function () {
    //carta options
    let arregloCartas = [
        {
            nombre: 'P&R_1',
            img: 'images/P1.jpg'
        },
        {
            nombre: 'P&R_2',
            img: 'images/P2.jpg'
        },
        {
            nombre: 'P&R_3',
            img: 'images/P3.jpg'
        },
        {
            nombre: 'P&R_4',
            img: 'images/P4.jpg'
        },
        {
            nombre: 'P&R_5',
            img: 'images/P5.jpg'
        },
        {
            nombre: 'P&R_6',
            img: 'images/P6.jpg'
        },
        {
            nombre: 'P&R_1',
            img: 'images/R1.jpg'
        },
        {
            nombre: 'P&R_2',
            img: 'images/R2.jpg'
        },
        {
            nombre: 'P&R_3',
            img: 'images/R3.jpg'
        },
        {
            nombre: 'P&R_4',
            img: 'images/R4.jpg'
        },
        {
            nombre: 'P&R_5',
            img: 'images/R5.jpg'
        },
        {
            nombre: 'P&R_6',
            img: 'images/R6.jpg'
        }
    ]

    // Mezcla las cartas en el arreglo como el mesero
    arregloCartas.sort(function () {
        return 0.5 - Math.random();
    });

    // variables de DOM
    let areaJuego = document.querySelector('.area-Juego')
    let resultadoPantalla = document.querySelector('#resultado')
    let TituloH3 = document.querySelector('#Puntuacion')
    let patricio = document.createElement('img')

    //variables de sonido
    let sonidoEmparejamiento = new Audio('sonidos/Emparejamiento.wav');
    let sonidoCArta = new Audio('sonidos/Carta.wav');
    let sonidoGanar = new Audio('sonidos/Ganar.mp3');

    // Variables para hacer un seguimiento del juego
    let cartasElegidas = []
    let cartasElegidasId = []
    let cartasGanadas = []

    // Crea el tablero del juego con las cartas
    function crearTablero() {
        for (let i = 0; i < arregloCartas.length; i++) {
            let carta = document.createElement('img')
            carta.setAttribute('src', 'images/blank.png')
            carta.setAttribute('data-id', i)
            carta.addEventListener('click', voltearCarta)
            areaJuego.appendChild(carta)
        }
    }

    // Verifica si las cartas elegidas coinciden
    function checkForMatch() {
        sonidoCArta.pause();
        let cartas = document.querySelectorAll('img')
        let idOpcionUno = cartasElegidasId[0]
        let idOpcionDos = cartasElegidasId[1]

        if (idOpcionUno == idOpcionDos) {
            cartas[idOpcionUno].setAttribute('src', 'images/blank.png')
            cartas[idOpcionDos].setAttribute('src', 'images/blank.png')
            alert('¡Has seleccionado la misma carta!!')
        }
        else if (cartasElegidas[0] === cartasElegidas[1]) {
            sonidoCArta.pause();
            sonidoEmparejamiento.play();
            cartas[idOpcionUno].setAttribute('src', 'images/white.png')
            cartas[idOpcionDos].setAttribute('src', 'images/white.png')
            cartas[idOpcionUno].removeEventListener('click', voltearCarta)
            cartas[idOpcionDos].removeEventListener('click', voltearCarta)
            cartasGanadas.push(cartasElegidas)

        } else {
            cartas[idOpcionUno].setAttribute('src', 'images/blank.png')
            cartas[idOpcionDos].setAttribute('src', 'images/blank.png')
        }

        cartasElegidas = []
        cartasElegidasId = []
        resultadoPantalla.textContent = cartasGanadas.length

        // se verifica si ya estan todas las cartas para darte las felicitaciones
        if (cartasGanadas.length === arregloCartas.length / 2) {
            TituloH3.textContent = ''
            patricio.setAttribute('src', 'images/ganaste.gif')
            patricio.setAttribute('id', "gano")
            resultadoPantalla.textContent = ''
            resultadoPantalla.appendChild(patricio)
            sonidoGanar.play();
            sonidoCArta.pause();
            sonidoEmparejamiento.pause();
        }
    }

    // Voltea la carta al hacer clic en ella
    function voltearCarta() {
        sonidoCArta.play();
        let cardId = this.getAttribute('data-id')
        cartasElegidas.push(arregloCartas[cardId].nombre)
        cartasElegidasId.push(cardId)
        this.setAttribute('src', arregloCartas[cardId].img)
        if (cartasElegidas.length === 2) {
            setTimeout(checkForMatch, 1000)
        }
    }
    //inicio del juego
    crearTablero()
})
