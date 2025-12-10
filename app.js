const titulocancion = document.querySelector('.Reproductor-de-musica h1');
const nombreArtista = document.querySelector('.Reproductor-de-musica p');
const portada = document.getElementById('portada');

const progreso = document.getElementById('progreso');
const cancion = document.getElementById('cancion');

const iconoControl = document.getElementById('iconoControl');
const botonReproducirPausar = document.querySelector('.controles button.boton-reproducir-pausar');

const controlAtras = document.querySelector('.controles button.atras-control');
const botonAdelante = document.querySelector('.controles button.adelante-control');

const canciones = [
    {
        titulo:'PARIS',
        nombre:'Junior H',
        fuente:'https://www.dropbox.com/scl/fi/h4b1g56c9xtgktu0oh284/Junior-H-PARIS.mp3?rlkey=mzqjclf6r00w8yv03qu2vte93&st=3w9uz99h&dl=1',
        portada:'img/PARIS.jpg'
    },
    {
        titulo:'Mia',
        nombre:'Victor Mendivil',
        fuente:'https://www.dropbox.com/scl/fi/5m4zkgqau96wglmjrn5vv/Mia.mp3?rlkey=zm3skwiscdeszl8un8uh06w5r&st=hji10c72&dl=1',
        portada:'img/Mia.jpg'
    },
    {
        titulo:'Rosa',
        nombre:'Victor Mendivilxla joaquixluis R.',
        fuente:'https://www.dropbox.com/scl/fi/z5dps5sycbp7w7s6zfssw/Rosa.mp3?rlkey=ec3vixdwi6nhl0ffolanhxfdn&st=uecym90n&dl=1',
        portada:'img/Mia.jpg'
    },
    {
        titulo:'Cuillinan',
        nombre:'TOMBOCHIO',
        fuente:'https://www.dropbox.com/scl/fi/zh384top6hgzem0ts3fjs/Cullinan.mp3?rlkey=777xsrlrulc9t7hfqqwvukru1&st=mhjbydrs&dl=1',
        portada:'img/tombochio.jpg'
    },
    {
        titulo:'14-14',
        nombre:'Peso Pluma',
        fuente:'https://www.dropbox.com/scl/fi/qh94wtnbtg7z8ek7q8hn3/14-14.mp3?rlkey=xz814lye0h4szdlrf1yr0oa3j&st=94g9sty6&dl=1',
        portada:'img/EXODO.jpg'
    },
    {
        titulo:'ANSIEDAD',
        nombre:'Fuerza Regida',
        fuente:'https://www.dropbox.com/scl/fi/t80jrpk39cguhd4bash7m/ANSIEDAD.mp3?rlkey=tkfb7q6ih8kz69sq8vcz92y0r&st=g5229eob&dl=1',
        portada:'img/FUERZA-REGIDA.jpg'
    },
    {
        titulo:'CAPERUZA',
        nombre:'FUERZA REGIDA',
        fuente:'https://www.dropbox.com/scl/fi/igezv7hj8llx7c5k4uzxs/CAPERUZA.mp3?rlkey=e81hv2fuuna9047jkuwy9ogef&st=m7ioh7oe&dl=1',
        portada:'img/FUERZA-REGIDA.jpg'
    },
    {
        titulo:'AURORA',
        nombre:'Fuerza Regida x Grupo Frontera',
        fuente:'https://www.dropbox.com/scl/fi/hn7rs8myvwlql8uop7n81/AURORA.mp3?rlkey=sws24i9yzngj0e93ba48egb8y&st=i6w83cxf&dl=1',
        portada:'img/grupo_frontera.jpg'
    },
    {
        titulo:'TULUM',
        nombre:'PESO PLUMA',
        fuente:'https://www.dropbox.com/scl/fi/40npbh7c645nakdw1pa5t/TULUM.mp3?rlkey=s8ucibsjmma59vfie7i3ppdp8&st=qtwv27ev&dl=1',
        portada:'img/GENESIS.jpg'
    },
    {
        titulo:'INTRO',
        nombre:'Junior H',
        fuente:'https://www.dropbox.com/scl/fi/7t9hfdt3npy88a9rtgr6q/INTRO.mp3?rlkey=b9qz9e8hde9yz6sy6ibdquirw&st=rrgqi8a4&dl=1',
        portada:'img/SAD.jpg'
    }
];

let indiceCancionActual = 0;

function actualizarInfoCancion(){
    titulocancion.textContent = canciones[indiceCancionActual].titulo;
    nombreArtista.textContent = canciones[indiceCancionActual].nombre;
    cancion.src = canciones[indiceCancionActual].fuente;
    portada.src = canciones[indiceCancionActual].portada;

    // 👇 Actualiza el fondo difuminado con fade
    const reproductor = document.querySelector('.Reproductor-de-musica');
    reproductor.style.setProperty('--portada-fondo', `url(${canciones[indiceCancionActual].portada})`);

    reproductor.classList.remove('fondo-activo');
    void reproductor.offsetWidth; // truco para reiniciar transición
    reproductor.classList.add('fondo-activo');
}

cancion.addEventListener('loadedmetadata', function(){
    progreso.max = cancion.duration;
});

botonReproducirPausar.addEventListener('click', reproducirPausar);

function reproducirPausar(){
   if(cancion.paused){
        reproducirCancion();
        iconoControl.classList.add('bi-pause-fill');
        iconoControl.classList.remove('bi-play-fill');
   } else {
        pausarCancion();
        iconoControl.classList.add('bi-play-fill');
        iconoControl.classList.remove('bi-pause-fill');
   }
}

function reproducirCancion(){
    cancion.play();
}

function pausarCancion(){
    cancion.pause();
}

cancion.addEventListener('timeupdate', function(){
    if(!cancion.paused){
        progreso.value = cancion.currentTime;
    }
});

progreso.addEventListener('input', function(){
    cancion.currentTime = progreso.value;
});

progreso.addEventListener('change', function(){
    reproducirCancion();
});

botonAdelante.addEventListener('click', ()=>{
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

controlAtras.addEventListener('click', ()=>{
    indiceCancionActual = (indiceCancionActual - 1 + canciones.length) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

// Al terminar una canción, pasa automáticamente a la siguiente
cancion.addEventListener('ended', () => {
    indiceCancionActual = (indiceCancionActual + 1) % canciones.length;
    actualizarInfoCancion();
    reproducirCancion();
});

// Inicializa con la primera canción
actualizarInfoCancion();





