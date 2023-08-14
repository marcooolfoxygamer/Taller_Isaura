document.addEventListener('DOMContentLoaded', function () {
    //carta options
    let arregloCartas = [
        {
            nombre: 'fries',
            img: 'images/fries.png'
        },
        {
            nombre: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            nombre: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            nombre: 'pizza',
            img: 'images/pizza.png'
        },
        {
            nombre: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            nombre: 'hotdog',
            img: 'images/hotdog.png'
        },
        {
            nombre: 'fries',
            img: 'images/fries.png'
        },
        {
            nombre: 'cheeseburger',
            img: 'images/cheeseburger.png'
        },
        {
            nombre: 'ice-cream',
            img: 'images/ice-cream.png'
        },
        {
            nombre: 'pizza',
            img: 'images/pizza.png'
        },
        {
            nombre: 'milkshake',
            img: 'images/milkshake.png'
        },
        {
            nombre: 'hotdog',
            img: 'images/hotdog.png'
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
            setTimeout(checkForMatch, 500)
        }
    }
    //inicio del juego
    crearTablero()
})
