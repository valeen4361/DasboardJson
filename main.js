let bgColors = [
  'hsl(15, 100%, 70%)',
  'hsl(195, 74%, 62%)',
  'hsl(348, 100%, 68%)',
  'hsl(145, 58%, 55%)',
  'hsl(264, 64%, 52%)',
  'hsl(43, 84%, 65%)',
];

let data; // Declara la variable globalmente para que sea accesible en otros lugares.

fetch('./data.json')
  .then(response => response.json())
  .then(jsonData => {
    data = jsonData; // Asigna el valor a la variable global 'data'
    
    // Crea el array con los valores de 'timeframes.daily'
    let dailyArray = data.map(item => item.timeframes.daily);
    console.log(dailyArray); // Esto debería mostrar un array con los objetos "daily"
  })
  .catch(error => {
    console.error('Error al cargar los datos:', error);
  });

let dailyBtn = document.querySelector('#daily');
let weeklyBtn = document.querySelector('#weekly');
let monthlyBtn = document.querySelector('#monthly');

let secondSection = document.querySelector('.second-section');


// Agregar eventos para los botones
dailyBtn.addEventListener('click', () => {
  drawElement('daily');
});

weeklyBtn.addEventListener('click', () => {
  drawElement('weekly');
});

monthlyBtn.addEventListener('click', () => {
  drawElement('monthly');
});

function drawElement(timeframe) {
  if (data) { // Asegúrate de que 'data' esté definido antes de usarlo.
    secondSection.innerHTML = ''; // Limpiar la sección

    data.forEach((datos, index) => {
      let timeframeData = datos.timeframes[timeframe]; // Selecciona el intervalo de tiempo correspondiente
      
      // Obtener el color de fondo correspondiente al índice (usar % para evitar desbordamiento del array)
      let bgColor = bgColors[index % bgColors.length];

      let title = data[index].title;
      let titleLowerCase = title.toLowerCase();

      if(titleLowerCase == 'self care'){
        titleLowerCase = 'self-care'
      }

      secondSection.innerHTML += `
        <div class="card">
          <div class="card__background" style="background-color: ${bgColor};">
            <img class="card__image" src="images/icon-${titleLowerCase}.svg" alt="maletin-icono">
          </div>
          <div class="card__details">
            <div class="card__activity">
              <p class="card__title">${datos.title}</p>
              <img class="three_dots" src="images/icon-ellipsis.svg" alt="three dots">
            </div>
            <div class="card__time">
              <p class="card__hours">${timeframeData.current}hrs</p>
              <p class="card__previous">Previous - ${timeframeData.previous}hrs</p>
            </div>
          </div>
        </div>
      `;
    });
  } else {
    console.log('Datos aún no cargados.');
  }
}
