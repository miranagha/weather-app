
 function runData() {
  var x = document.getElementById('city').value
  getData(x);
}
function getData(query) {
    document.getElementById("data-list").innerHTML="";
  const url = 'http://api.openweathermap.org/data/2.5/forecast?'
  const mode = 'json'
  const appid = '1d55a1e6c334b5926a8d8be2d8facc14'
  fetch(url + 'q=' + query + '&mode=' + mode + '&appid=' + appid + '&units=metric')
    .then(response => response.json())
    .then(function(data) {  
    var object = JSON.parse(JSON.stringify(data))
      console.log(object)
      var ul = document.getElementById("data-list")
      var h2 = document.createElement('h2')
      h2.setAttribute('id', 'h2')
      h2.innerHTML = query
      ul.appendChild(h2)
      for (var i = 1; i < 39; i += 8) {
          var dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
          var date = new Date(JSON.stringify(object.list[i].dt_txt).replace(/[""]/g, ''))
          var dayName = dayNames[date.getDay()];
          if (JSON.stringify(object.list[i].dt_txt).replace(/[""]/g, '') === JSON.stringify(object.list[1].dt_txt).replace(/[""]/g, '')) {
              dayName = 'Today'
          }
          if (JSON.stringify(object.list[i].dt_txt).replace(/[""]/g, '') === JSON.stringify(object.list[9].dt_txt).replace(/[""]/g, '')) {
              dayName = 'Tomorrow'
          }
          var list = document.createElement('li')
          list.setAttribute('id', 'list' )
          list.innerHTML = `${dayName}: ${JSON.stringify(object.list[i].weather[0].main)}    ${JSON.stringify(object.list[i].main.temp.toFixed())}°c`
          list.innerHTML = list.innerHTML.replace(/[""]/g, '')
          ul.appendChild(list)
      }
  })
}

