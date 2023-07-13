import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';
import { Journey } from '../models/trainInfo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
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
  },
  overview: {
    paddingBottom: 20,
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
        <Text style={styles.journeyInfoText}>
          {journey.originStation.crs} ------- {journey.destinationStation.crs}
        </Text>
        <Text style={styles.journeyInfoText}>
          {new Date(journey.departureTime).toLocaleTimeString('en-GB', {
            timeStyle: 'short',
          })}{' '}
          --{journey.journeyDurationInMinutes}--{' '}
          {new Date(journey.arrivalTime).toLocaleTimeString('en-GB', {
            timeStyle: 'short',
          })}
        </Text>
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
                <View>
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

                <View>
                  <Text>{leg.durationInMinutes}</Text>
                  <Text>{leg.trainOperator.name}</Text>
                </View>

                <View>
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
                <View>
                  <Text> {leg.origin.displayName} </Text>
                </View>
                <View>
                  <Text>{leg.mode}</Text>
                  <Text>{leg.durationInMinutes}</Text>
                </View>
                <View>
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
