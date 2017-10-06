import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DayTemp from './DayTemp';

export default class App extends React.Component {
  getDays() {
    const days = ["Mon", "Tues", "Wed", "Thur", "Fri", "Sat", "Sun"];
    const temps = ["72", "70", "68", "71", "70", "72", "75"];
    return days.map(function(day, index) {
      return <DayTemp key={index} day={days[index]} temp={temps[index]} />
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.heading}>
          <Text style={styles.city}>San Francisco</Text>
          <Text style={styles.dateText}>Friday, October 6 </Text>
        </View>
        <Text style={styles.currentTemp}> 70˚ </Text>
        <View style={styles.daysContainer}>
          {this.getDays()}
        </View>
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
    fontWeight: 'bold'
  }
});
