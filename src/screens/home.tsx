import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import { Text, Button, List } from 'react-native-paper';
import { TrainInfo, Journey } from '../models/trainInfo';
import { TimePickerModal, DatePickerModal } from 'react-native-paper-dates';
import { ScreenNavigationProps } from '../routes';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingBottom: 24,
  },
  dropdown: {
    width: 200,
    alignItems: 'center',
  },
  dropdownContainer: {
    flexDirection: 'row',
  },
  timeDatePicker: {
    flexDirection: 'row',
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    width: 300,
    marginHorizontal: 16,
  },
  button: {
    marginBottom: 30,
  },
});

type HomeScreenProps = ScreenNavigationProps<'Home'>;

function getUrl(origin: string, dest: string): string {
  if (!process.env.API_URL) {
    throw 'Missing env variable for API_URL';
  }
  return `${process.env.API_URL}?originStation=${origin}&destinationStation=${dest}&numberOfAdults=1&numberOfChildren=0&outboundDateTime=2023-07-24T14%3A30%3A00.000%2B01%3A00`;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [origin, setOrigin] = React.useState('RYS');
  const [dest, setDest] = React.useState('OXF');
  const [selectedDepartureDate, setSelDepartDate] = React.useState(new Date());
  const [timePickerVisible, setTimePickerVisible] = React.useState(false);
  const [datePickerVisible, setDatePickerVisible] = React.useState(false);
  const [journeys, setJourneys] = React.useState<Journey[]>([]);
  const stations = ['SOU', 'RYS', 'OXF', 'RDG', 'WRW'];
  const getTrainInfo = async () => {
    const res = await fetch(getUrl(origin, dest), {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.API_KEY,
      },
    });
    const trainInfo = (await res.json()) as TrainInfo;

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
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <List.Section title="Origin">
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
        <List.Section title="Destination">
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
      <View style={styles.timeDatePicker}>
        <Button onPress={() => setTimePickerVisible(true)}>
          Pick departure time
        </Button>
        <TimePickerModal
          visible={timePickerVisible}
          onDismiss={onDismissTimePicker}
          onConfirm={onConfirmTimePicker}
          hours={selectedDepartureDate.getHours()} // TODO: replace with current time
          minutes={selectedDepartureDate.getMinutes()}
        />
        <Button onPress={() => setDatePickerVisible(true)}>
          Pick departure date
        </Button>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={datePickerVisible}
          onDismiss={onDismissDatePicker}
          date={selectedDepartureDate}
          onConfirm={onConfirmDatePicker}
        />
      </View>
      <View style={styles.timeDatePicker}>
        <Text style={styles.text}>
          Departure time:{' '}
          {selectedDepartureDate.toLocaleTimeString('en-GB', {
            timeStyle: 'short',
          })}
        </Text>
        <Text style={styles.text}>
          Departure date: {selectedDepartureDate.toDateString()}
        </Text>
      </View>
      {journeys && (
        <FlatList
          data={journeys}
          renderItem={({ item }) => (
            <View style={styles.item}>
              <Text style={styles.text}>
                Departs:{' '}
                {new Date(item.departureTime).toLocaleTimeString('en-GB', {
                  timeStyle: 'short',
                })}
              </Text>
              <Text style={styles.text}>
                Arrives:{' '}
                {new Date(item.arrivalTime).toLocaleTimeString('en-GB', {
                  timeStyle: 'short',
                })}
              </Text>
              <Text style={styles.text}>
                {item.journeyDurationInMinutes} Minutes
              </Text>
              {item.tickets.map((ticket) => {
                return (
                  <Text key={ticket.name} style={styles.text}>
                    {ticket.name} £{ticket.priceInPennies / 100}
                  </Text>
                );
              })}
            </View>
          )}
        ></FlatList>
      )}
      <Button style={styles.button} onPress={getTrainInfo}>
        Plan your journey
      </Button>
    </View>
  );
};

export default HomeScreen;
