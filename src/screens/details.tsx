import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';
import { Journey } from '../models/trainInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#c8c8a9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButton: {
    borderColor: '#83af9b',
  },
  journeyBriefInfo: {
    backgroundColor: '#fc9d9a',
    width: 300,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    //paddingLeft: 0,
  },
  overviewLineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  overviewText: {
    fontSize: 30,
    paddingLeft: 5,
    paddingRight: 5,
  },
  journeyInfoText: {
    paddingBottom: 8,
    //paddingTop: 10,
    fontSize: 12,
  },
  ticketInfo: {
    backgroundColor: '#fc9d9a',
    width: 300,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
  },
  legInfo: {
    backgroundColor: '#fc9d9a',
    width: 300,
    marginBottom: 10,
    marginTop: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  overview: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#83af9b',
    borderRadius: 10,
    marginBottom: 20,
    padding: 5,
  },
  locationAndTime: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 2,
    paddingTop: 2,
  },
  arrowTimeMode: {
    flexDirection: 'row',
    paddingBottom: 2,
    paddingTop: 2,
    width: 300,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  arrow: {
    width: 20,
    height: 50,
  },
  arrowText: {

  },
});

type DetailScreenProps = ScreenNavigationProps<'Details'>;

const DetailsScreen: React.FC<DetailScreenProps> = ({ navigation, route }) => {
  const [journey, setJourney] = React.useState<Journey>(route.params.journey);
  return (
    <View style={styles.container}>
      <Text>Details Screen</Text>
      <Button
        style={styles.backButton}
        onPress={() => navigation.navigate('Home')}
        mode="contained"
      ></Button>
      <View style={styles.overview}>
        <View style={styles.overviewLineContainer}>
          <Text style={styles.overviewText}>{journey.originStation.crs}</Text>
          <Text style={styles.overviewText}> &#10142; </Text>
          <Text style={styles.overviewText}>
            {journey.destinationStation.crs}
          </Text>
        </View>
        <View style={styles.overviewLineContainer}>
          <Text style={styles.overviewText}>
            {new Date(journey.departureTime).toLocaleTimeString('en-GB', {
              timeStyle: 'short',
            })}
          </Text>
          <Text> {journey.journeyDurationInMinutes} </Text>
          <Text style={styles.overviewText}>
            {new Date(journey.arrivalTime).toLocaleTimeString('en-GB', {
              timeStyle: 'short',
            })}
          </Text>
        </View>
      </View>

      <View style={styles.ticketInfo}>
        {journey.tickets.map((ticket) => {
          return (
            <Text key={ticket.name} style={styles.journeyInfoText}>
              {ticket.name} £{ticket.priceInPennies / 100}
            </Text>
          );
        })}
      </View>

      <View>
        {journey.legs.map((leg) => {
          if (leg.mode == 'TRAIN') {
            return (
              <View style={styles.legInfo} key={leg.origin.crs}>
                <View style={styles.locationAndTime}>
                  <Text> {leg.origin.displayName} </Text>
                  <Text>
                    {new Date(leg.departureDateTime).toLocaleTimeString(
                      'en-GB',
                      {
                        timeStyle: 'short',
                      },
                    )}
                  </Text>
                </View>
                <View style={styles.arrowTimeMode}>
                  <Text style={styles.arrowText}>{leg.trainOperator.code}</Text>
                  <Image
                    source={require('./arrow.png')}
                    style={styles.arrow}
                    resizeMode="cover"
                  />
                  <Text style={styles.arrowText}>{leg.durationInMinutes}</Text>
                </View>

                <View style={styles.locationAndTime}>
                  <Text> {leg.destination.displayName} </Text>
                  <Text>
                    {new Date(leg.arrivalDateTime).toLocaleTimeString('en-GB', {
                      timeStyle: 'short',
                    })}
                  </Text>
                </View>
              </View>
            );
          } else {
            return (
              <View style={styles.legInfo} key={leg.origin.crs}>
                <View style={styles.locationAndTime}>
                  <Text> {leg.origin.displayName} </Text>
                </View>
                <View style={styles.arrowTimeMode}>
                  <Text style={styles.arrowText}>{leg.mode}</Text>
                  <Image
                    source={require('./arrow.png')}
                    style={styles.arrow}
                    resizeMode="cover"
                  />
                  <Text style={styles.arrowText}>{leg.durationInMinutes}</Text>
                </View>
                <View style={styles.locationAndTime}>
                  <Text> {leg.destination.displayName} </Text>
                </View>
              </View>
            );}
        })}
      </View>
    </View>
  );
};

export default DetailsScreen;
