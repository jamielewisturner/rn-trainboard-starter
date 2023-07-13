import React from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator } from 'react-native';
import { Text, Button, List } from 'react-native-paper';
import { TrainInfo, Journey } from '../models/trainInfo';
import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates';
import { ScreenNavigationProps } from '../routes';

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#c8c8a9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingBottom: 24,
    //paddingTop: 10,
    fontSize: 15,
  },
  headerText: {
    textAlign: 'center',
    // color: '#fe4365',
    //paddingLeft: 20,
    //paddingRight: 5,
    fontSize: 20,
    paddingBottom: 10,
    paddingTop: 10,
  },
  dropdown: {
    width: 150,
    alignItems: 'center',
    backgroundColor: '#83af9b',
    color: '#000',
    //borderRadius: 15,
    overflow: 'hidden',
    backfaceVisibility: 'hidden',
  },
  singleDropdown: {
    paddingLeft: 20,
    paddingRight: 20,
    color: '#c8c8a9',
  },
  dropdownContainer: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    paddingBottom: 10,
    color: '#c8c8a9',
  },
  singleTimeDate: {
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15,
  },
  timeDateContainer: {
    flexDirection: 'row',
  },
  item: {
    backgroundColor: '#fc9d9a', // '#fe4365',
    padding: 20,
    marginVertical: 8,
    width: 300,
    marginHorizontal: 16,
  },
  pickTimeButton: {
    marginBottom: 7,
    borderColor: '#83af9b',
    borderWidth: 2,
  },
  planJourneyButton: {
    marginBottom: 20,
    backgroundColor: '#fe4365',
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
});

type HomeScreenProps = ScreenNavigationProps<'Home'>;

function getUrl(origin: string, dest: string, depDate: Date): string {
  if (!process.env.API_URL) {
    throw 'Missing env variable for API_URL';
  }
  return `${
    process.env.API_URL
  }?originStation=${origin}&destinationStation=${dest}&numberOfAdults=1&numberOfChildren=0&outboundDateTime=${depDate.toJSON()}`;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [origin, setOrigin] = React.useState('RYS');
  const [dest, setDest] = React.useState('OXF');
  const [selectedDepartureDate, setSelDepartDate] = React.useState(() => {
    const dateNow: Date = new Date();
    dateNow.setMinutes(dateNow.getMinutes() + 1);
    return dateNow;
  });
  const [timePickerVisible, setTimePickerVisible] = React.useState(false);
  const [datePickerVisible, setDatePickerVisible] = React.useState(false);
  const [journeys, setJourneys] = React.useState<Journey[]>([]);
  const stations = ['SOU', 'RYS', 'OXF', 'RDG', 'WRW'];
  const [loading, setLoading] = React.useState(false);
  const getTrainInfo = async () => {
    setLoading(true);
    const res = await fetch(getUrl(origin, dest, selectedDepartureDate), {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.API_KEY,
      },
    });
    const trainInfo = (await res.json()) as TrainInfo;
    setLoading(false);
    setJourneys(trainInfo.outboundJourneys);
  };
  const onDismissTimePicker = () => {
    setTimePickerVisible(false);
  };

  const onConfirmTimePicker = ({ hours, minutes }) => {
    setSelDepartDate((currentState) => {
      currentState.setHours(hours, minutes);
      return currentState;
    });
    setTimePickerVisible(false);
  };
  const onDismissDatePicker = () => {
    setDatePickerVisible(false);
    console.log('dismissed');
  };

  const onConfirmDatePicker = (params) => {
    setSelDepartDate((currentState) => {
      currentState.setFullYear(
        params.date.getFullYear(),
        params.date.getMonth(),
        params.date.getDate(),
      );
      return currentState;
    });
    setDatePickerVisible(false);
  };

  return (
    <View style={styles.page}>
      <View style={styles.dropdownContainer}>
        <List.Section style={styles.singleDropdown}>
          <Text style={styles.headerText}>Origin</Text>
          <List.Accordion title={origin} style={styles.dropdown}>
            {stations.map((station) => {
              return (
                <List.Item
                  title={station}
                  key={station}
                  onPress={() => {
                    setOrigin(station);
                  }}
                />
              );
            })}
          </List.Accordion>
        </List.Section>
        <List.Section style={styles.singleDropdown}>
          <Text style={styles.headerText}>Destination</Text>
          <List.Accordion title={dest} style={styles.dropdown}>
            {stations.map((station) => {
              return (
                <List.Item
                  title={station}
                  key={station}
                  onPress={() => {
                    setDest(station);
                  }}
                />
              );
            })}
          </List.Accordion>
        </List.Section>
      </View>
      <View style={styles.timeDateContainer}>
        <View style={styles.singleTimeDate}>
          <Button
            style={styles.pickTimeButton}
            onPress={() => setTimePickerVisible(true)}
            mode="outlined"
            compact={true}
            color="#111"
          >
            Departure time
          </Button>
          <Text style={styles.text}>
            {selectedDepartureDate.toLocaleTimeString('en-GB', {
              timeStyle: 'short',
            })}
          </Text>
          <TimePickerModal
            visible={timePickerVisible}
            onDismiss={onDismissTimePicker}
            onConfirm={onConfirmTimePicker}
            hours={selectedDepartureDate.getHours()}
            minutes={selectedDepartureDate.getMinutes()}
          />
        </View>
        <View style={styles.singleTimeDate}>
          <Button
            style={styles.pickTimeButton}
            onPress={() => setDatePickerVisible(true)}
            mode="outlined"
            compact={true}
            color="#111"
          >
            Departure date
          </Button>
          <Text style={styles.text}>
            {selectedDepartureDate.toDateString()}
          </Text>
          <DatePickerModal
            locale="en"
            mode="single"
            visible={datePickerVisible}
            onDismiss={onDismissDatePicker}
            date={selectedDepartureDate}
            onConfirm={onConfirmDatePicker}
          />
        </View>
      </View>
      <Button
        style={styles.planJourneyButton}
        onPress={getTrainInfo}
        mode="contained"
      >
        Plan your journey
      </Button>
      {loading && (
        <ActivityIndicator size="large" color="#fe4365"></ActivityIndicator>
      )}
      {journeys && (
        <FlatList
          data={journeys}
          renderItem={({ item }) => (
            <Button
              style={styles.journeyBriefInfo}
              onPress={() => navigation.navigate('Details')}
              mode="contained"
            >
              <View style={styles.journeyBriefInfo}>
                <Text style={styles.journeyInfoText}>
                  Departs:{' '}
                  {new Date(item.departureTime).toLocaleTimeString('en-GB', {
                    timeStyle: 'short',
                  })}
                </Text>
                <Text style={styles.journeyInfoText}>
                  Arrives:{' '}
                  {new Date(item.arrivalTime).toLocaleTimeString('en-GB', {
                    timeStyle: 'short',
                  })}
                </Text>
                <Text style={styles.journeyInfoText}>
                  {item.journeyDurationInMinutes} Minutes
                </Text>
                {item.tickets.map((ticket) => {
                  return (
                    <Text key={ticket.name} style={styles.journeyInfoText}>
                      {ticket.name} £{ticket.priceInPennies / 100}
                    </Text>
                  );
                })}
              </View>
            </Button>
          )}
        ></FlatList>
      )}
    </View>
  );
};

export default HomeScreen;
