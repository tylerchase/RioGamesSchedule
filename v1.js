var jsonData = {}
$(document).ready(function(){
  var getData = {
    "async": true,
    "crossDomain": true,
    "url": "https://cors-anywhere.herokuapp.com/https://api.sportradar.us/oly-testing2/2016/schedule.xml?api_key=4kuy7nwga5d9cv95v3wphrrr",
    "method": "GET"
  }
  $.ajax(getData).done(function (xmlData) {
    var x2js = new X2JS()
    var jsonData = x2js.xml_str2json(xmlData)
    console.log(jsonData)
  })
})

  $('.my-tag').click(function(event){
    var bigDataArray = [];
    var bigDataObjects = [];

    var image = $(this).children("embed").attr('src')
    console.log(image)
    $('.demo-card-wide > .mdl-card__title').empty()


    $("#events").empty()
    $("#dates").empty()
    $(".mdl-card__title-text").empty()
    var sportsArray = $(this);
    $('.mdl-card__title-text').append(this.text)
    var sport = sportsArray['0'].classList['2'].replace(/-/g, ' ')
    // console.log(sport)
    for (var newEvent of jsonData.olympics["season-schedule"].sports.sport){
      var sportInDataOBJ = newEvent['_description'].toLowerCase()
      // match up the selected sport to the sport in the data.js
      if (sport == sportInDataOBJ){
        if(sport == "volleyball"|| sport == "gymnastics"|| sport == "cycling" || sport == "canoe"|| sport == "aquatics"){
          for (var unusualEvents of newEvent.disciplines.discipline){
            for (var multiSport of unusualEvents.events['event']){
              for (var normalSportEvent in multiSport.units.unit){
                if (multiSport.units.unit[normalSportEvent]['_start_date'] !== undefined){
                  bigDataArray.push(multiSport.units.unit[normalSportEvent]['_start_date'])
                  bigDataObjects.push(multiSport.units.unit[normalSportEvent])
                }
              }
            }
          }
        } else {
          for (var sportEvent of newEvent.disciplines.discipline.events['event']){
            for (var normalSportEvent in sportEvent.units.unit){
              if (sportEvent.units.unit[normalSportEvent]['_start_date'] !== undefined){
                bigDataArray.push(sportEvent.units.unit[normalSportEvent]['_start_date'])
                bigDataObjects.push(sportEvent.units.unit[normalSportEvent])
              }
            }
          }
        }
      }
  }
  // console.log(bigDataArray)
  // console.log("bigdataobj", bigDataObjects)
  var sortedBigDataObject = _.sortBy(bigDataObjects, "_start_date")
  // console.log("sortedBigDataObject ", sortedBigDataObject)




    for (sportsObject of sortedBigDataObject) {
      if(sportsObject['_name']=== "" ||sportsObject['_start_date'] === undefined){
        var normalSportEventDetails = $("<div>")
        normalSportEventDetails.text("Data unavailable")
        normalSportEventDetails.attr('data-startDate', normalSportEvent['_start_date'])
        normalSportEventDetails.addClass('mdl-card content-column mdl-cell--6-col')
        $('#events').append(normalSportEventDetails)
        var normalSportEventDate = $("<div>")
        normalSportEventDate.text("Data unavailable")
        normalSportEventDate.addClass('mdl-card content-column mdl-cell--6-col')
        $('#dates').append(normalSportEventDate)
      } else {
        var normalSportEventDetails = $("<div>")
        normalSportEventDetails.text(sportsObject['_name'])
        normalSportEventDetails.attr('data-startDate', normalSportEvent['_start_date'])
        normalSportEventDetails.addClass('mdl-card content-column mdl-cell--6-col')
        $('#events').append(normalSportEventDetails)
        var normalSportEventDate = $("<div>")
        var date = (sportsObject["_start_date"])
        var startTime = new Date(date)
        normalSportEventDate.text(startTime.toLocaleString())
        normalSportEventDate.addClass('mdl-card content-column mdl-cell--6-col')
        $('#dates').append(normalSportEventDate)
      }
     }
})
