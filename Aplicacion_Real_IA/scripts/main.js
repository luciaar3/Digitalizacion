const { from, fromEvent } = rxjs;
const { map, filter, switchMap, tap } = rxjs.operators;

// Referencias al DOM
const selectElement = document.getElementById('sectionSelect');
const buttonElement = document.getElementById('showButton');
const contentTitle = document.getElementById('contentTitle');
const contentImage = document.getElementById('contentImage');
const contentText = document.getElementById('contentText');

// 1. Carga el JSON como un Observable
const dataObservable = from(
    fetch('data/data.json').then(response => response.json())
);

// 2. Obtener la lista de títulos y mostrarlos en el desplegable
dataObservable.subscribe(data => {
    data.forEach(item => {
        const option = document.createElement('option');
        option.value = item.id;
        option.textContent = item.titulo;
        selectElement.appendChild(option);
    });
});

// 3. Escuchar de forma reactiva la selección y el botón
const buttonClick$ = fromEvent(buttonElement, 'click');

const selection$ = buttonClick$.pipe(
    // Obtenemos el valor actual del select al pulsar el botón
    map(() => selectElement.value),
    // Filtramos si no hay nada seleccionado
    filter(id => id !== ""),
    // Buscamos el elemento correspondiente en los datos
    switchMap(id => dataObservable.pipe(
        map(data => data.find(item => item.id == id))
    ))
);

// 4. Al recibir la emisión, mostrar dinámicamente el contenido
selection$.subscribe(section => {
    if (section) {
        contentTitle.textContent = section.titulo;
        contentImage.src = section.imagen;
        contentImage.alt = section.titulo;
        contentImage.style.display = 'block';
        contentText.textContent = section.contenido;
    }
});
