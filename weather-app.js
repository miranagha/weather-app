function runData() {
  var x = document.getElementById('city').value
  getData(x);
}
function removeBtn() {
  var btn = document.getElementById("btnn")
  btn.removeEventListener('click', runData)
  btn.remove()
}
function getData(query) {
  const url = 'http://api.openweathermap.org/data/2.5/forecast?'
  const mode = 'json'
  const appid = '1d55a1e6c334b5926a8d8be2d8facc14'
  fetch(url + 'q=' + query + '&mode=' + mode + '&appid=' + appid + '&units=metric').then(response => response.json()).then(function(data){
      var object = JSON.parse(JSON.stringify(data))
      console.log(object)
      var ul = document.getElementById("data-list")
      var h2 = document.createElement('h2')
      h2.setAttribute('id', 'h2')
      h2.innerHTML = query
      ul.appendChild(h2)
      for (var i = 0; i < 34; i += 8) {
          var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          var date = new Date(JSON.stringify(object.list[i].dt_txt).replace(/[""]/g, ''))
          var dayName = dayNames[date.getDay()];
          if (JSON.stringify(object.list[i].dt_txt).replace(/[""]/g, '') === JSON.stringify(object.list[0].dt_txt).replace(/[""]/g, '')) {
              dayName = 'Today'
          }
          if (JSON.stringify(object.list[i].dt_txt).replace(/[""]/g, '') === JSON.stringify(object.list[8].dt_txt).replace(/[""]/g, '')) {
              dayName = 'Tomorrow'
          }
          var list = document.createElement('li')
          list.setAttribute('id', 'list' + i)
          list.innerHTML = `${dayName}s weather: ${JSON.stringify(object.list[i].weather[0].main)}    ${JSON.stringify(object.list[i].main.temp_max.toFixed())}°c`
          list.innerHTML = list.innerHTML.replace(/[""]/g, '')
          ul.appendChild(list)
      }5
  }).then(removeBtn)
}
// ${JSON.stringify(object.list[i].weather[0].icon)}
