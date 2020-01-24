import { Meteor } from 'meteor/meteor';
Markers = new Mongo.Collection('markers');
citiesDB = new Mongo.Collection('cities');

Meteor.startup(() => {
    SyncedCron.start();
    updateWeatherStatus();
});

SyncedCron.add({
  name: 'Update Weather Status',
  schedule: function(parser) {
    return parser.text('every 30 minutes');
  },
  job: function() {
    updateWeatherStatus();
  }
});


/*
    For flexibility, added method "addCity"
    param:
      name : the name of the desired city to be added
      feedURL : the feed URL that can be obtained from the RSS feed from Env canada
      lat : is the latitude of the city's location
      long : is the longitude of the city's location
*/
addCity = function(name, feedURL, lat, long){
  try{
    citiesDB.insert({ "cityName" : name, "feedURL" : feedURL , "lat" : lat, "long" : long });
  }
  catch (err){
    throw err;
  }
}


/*
    Query and update weather status
*/
updateWeatherStatus = function(){
  var cities = citiesDB.find({});
  cities.forEach(function(city) {
      let feedData = Scrape.feed(city.feedURL);

      //simple check to verify we got the correct data from our URL
      if(feedData.items[1].title.startsWith('Current Conditions')){
        let title = city.cityName +": "+ feedData.items[1].title.substring(20);
        let description = feedData.items[1].description;
        let pubDate = feedData.items[1].pubDate;
        console.log(title);

        Markers.update( {cityName : city.cityName} , { $set: { title : title, description : description, pubDate : pubDate }});
      }
    });
}
