const cityForm = document.querySelector('form');
const card = document.querySelector('.card');
const details = document.querySelector('.details');
const time = document.querySelector('img.time');
const icon = document.querySelector('.icon img');

cityForm.addEventListener('submit', e => {

  e.preventDefault();

  const city = cityForm.city.value.trim();
  cityForm.reset();

  updateCity(city)
    .then(data => updateUI(data))
    .catch(err => console.log(err));

  localStorage.setItem('city', city);

});

const updateCity = async (city) => {

  const jsonCity = await getCity(city);
  const weatherCity = await getWeather(jsonCity.Key);

  return {jsonCity, weatherCity};

};

const updateUI = (data) => {

  const cityDets = data.jsonCity;
  const weather = data.weatherCity;

  details.innerHTML = `
    <h5 class="my-3">${cityDets.EnglishName}, ${cityDets.AdministrativeArea.CountryID}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
      <span>${weather.Temperature.Metric.Value}</span>
      <span>&deg;C</span>
  `;

  const iconSrc = `/assets/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute('src', iconSrc);
  
  let timeSrc = weather.IsDayTime ? '/assets/img/day.svg' : '/assets/img/night.svg';
  time.setAttribute('src', timeSrc);

  if (card.classList.contains('d-none')) {
    card.classList.remove('d-none');
  }

};

if (localStorage.getItem('city')) {
  updateCity(localStorage.getItem('city'))
    .then(data => updateUI(data))
    .catch(err => console.log(err));
}