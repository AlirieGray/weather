import React, { Component } from 'react';
import { StyleSheet, Image, Text, View, TextInput, ScrollView } from 'react-native';
import DayTemp from './DayTemp';
import Geocoder from 'react-native-geocoding';
import { SECRET } from 'react-native-dotenv'
import { GOOGLE_KEY } from 'react-native-dotenv'

Geocoder.setApiKey(GOOGLE_KEY);

class WeatherCard extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <View>
        <Text> Date </Text>
        <Text> Sunrise: {this.props.sunriseTime} </Text>
        <Text> Sunset: {this.props.sunsetTime} </Text>
        <Text> High: {this.props.high} </Text>
        <Text> Low: {this.props.low} </Text>
        <Text> Summary: {this.props.summary} </Text>
      </View>
    );
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: [],
      currentTemp: "",
      location: ""
    }
  }

  getDays() {
    //this.getWeather();
    const days = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
    const highs = ["72", "70", "68", "71", "70", "72", "75"];
    const lows = ["72", "70", "68", "71", "70", "72", "75"];
    return days.map((day, index) => {
      return <DayTemp key={index} day={days[index]} high={highs[index]} low={lows[index]} />
    })
  }

  getLocation(locationString) {
    Geocoder.getFromLocation(locationString).then(
      json => {
        var location = json.results[0].geometry.location;
        return(location.lat + ", " + location.lng);
      },
      error => {
        alert(error);
      }
    );
  }

  getWeather(latlong) {
    var url = "https://api.darksky.net/forecast/" + SECRET + "/" + latlong
    fetch(url).then((res) => {
      console.log("fetched!");
      return res.json();
    }).then((json) => {
      //console.log(json);
      var dailyWeatherArr = json.daily.data;
      this.setState({weather: dailyWeatherArr})
      var currently = json.currently.temperature;
      this.setState({currentTemp: currently});
    }).catch((err) => {
      console.error(err);
    });
  }

  getDailyWeather(weatherData) {
    return weatherData.map((day, index) => {
      return <WeatherCard key={index} high={day.temperatureHigh} low={day.temperatureLow} sunsetTime={day.sunsetTime} sunriseTime={day.sunriseTime} summary={day.summary}/>
    })
  }

  render() {
    // get array of JSX objects from state
    if (this.state.weather.length == 0) {
      Geocoder.getFromLocation("Colosseum").then(
      json => {
        var location = json.results[0].geometry.location;
        this.getWeather(location.lat + ", " + location.lng);
      },
      error => {
        console.error(error);
      }
    );
    }
    var weatherArr = this.getDailyWeather(this.state.weather);
    return (
      <View>
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.city}>San Francisco</Text>
          <Text style={styles.dateText}>Sunday, October 8 </Text>
        </View>
        <Text style={styles.currentTemp}> {Math.floor(this.state.currentTemp)}˚ </Text>
        <View style={styles.daysContainer}>
          {this.getDays()}
        </View>
      </View>

      <View style={styles.locationInputContainer} >
      <View style={styles.locationInput}>
        <TextInput
          style={{padding: 6, height: 40, borderTopLeftRadius: 10, borderBottomLeftRadius: 10, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({location: text})}
          value={this.state.location}
        />
        </View>
        <View style={styles.locIconContainer}>
        <Image
          source={require('./loc_icon.png')}
        />
        </View>
      </View>


      <Text> Upcoming Week: </Text>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {weatherArr}
      </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection:'column',
  },
  heading: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  city: {
    fontSize: 40
  },
  dateText: {
    fontSize: 24
  },
  daysContainer: {
    display: 'flex',
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  currentTemp: {
    fontSize: 100,
    fontWeight: 'bold',
    paddingLeft: 25
  },
  scrollContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationInput: {
    marginRight: 10,
    width: '50%',
  },
  locationInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  locIconContainer: {
    height: 40,
    display: 'flex',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 5
  }
});
