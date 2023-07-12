import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, List } from 'react-native-paper';
import { TrainInfo } from '../models/trainInfo';
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
});

type HomeScreenProps = ScreenNavigationProps<'Home'>;

function getUrl(origin: string, dest: string): string {
  if (!process.env.API_URL) {
    throw 'Missing env variable for API_URL';
  }
  return `${process.env.API_URL}?originStation=${origin}&destinationStation=${dest}&numberOfAdults=2&numberOfChildren=0&outboundDateTime=2023-07-24T14%3A30%3A00.000%2B01%3A00`;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [origin, setOrigin] = React.useState('RYS');
  const [dest, setDest] = React.useState('OXF');
  const [deptTime, setDept] = React.useState('None');
  const [arrTime, setArr] = React.useState('None');
  const [duration, setDuration] = React.useState(0);
  const [selectedDeptTime, setSelDeptTime] = React.useState(
    new Date().toTimeString(),
  );
  const [selectedDeptDate, setSelDeptDate] = React.useState(new Date());
  const [timePickerVisible, setTimePickerVisible] = React.useState(false);
  const [datePickerVisible, setDatePickerVisible] = React.useState(false);
  const stations = ['SOU', 'RYS', 'OXF', 'RDG', 'WRW'];
  const getTrainInfo = async () => {
    const res = await fetch(getUrl(origin, dest), {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.API_KEY,
      },
    });
    const jsonRes = (await res.json()) as TrainInfo;
    const journey = jsonRes.outboundJourneys[0];
    const deptTimeDate = new Date(journey.departureTime);
    setDept(deptTimeDate.toLocaleTimeString('en-GB', { timeStyle: 'short' }));
    const arrTimeDate = new Date(journey.arrivalTime);
    setArr(arrTimeDate.toLocaleTimeString('en-GB', { timeStyle: 'short' }));

    const duration = journey.journeyDurationInMinutes;
    setDuration(duration);
  };
  const onDismissTimePicker = React.useCallback(() => {
    setTimePickerVisible(false);
  }, [setTimePickerVisible]);

  const onConfirmTimePicker = React.useCallback(
    ({ hours, minutes }) => {
      setTimePickerVisible(false);
      setSelDeptTime(`${hours}:${minutes}`);
    },
    [setTimePickerVisible, setSelDeptTime],
  );
  const onDismissDatePicker = React.useCallback(() => {
    setDatePickerVisible(false);
  }, [setDatePickerVisible]);

  const onConfirmDatePicker = React.useCallback(
    (params) => {
      setSelDeptDate(params.date);
      setDatePickerVisible(false);
    },
    [setDatePickerVisible, setSelDeptDate],
  );

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
          hours={12} // TODO: replace with current time
          minutes={14}
        />
        <Button onPress={() => setDatePickerVisible(true)}>
          Pick departure date
        </Button>
        <DatePickerModal
          locale="en"
          mode="single"
          visible={datePickerVisible}
          onDismiss={onDismissDatePicker}
          date={selectedDeptDate}
          onConfirm={onConfirmDatePicker}
        />
      </View>
      <View style={styles.timeDatePicker}>
        <Text style={styles.text}>Departure time: {selectedDeptTime}</Text>
        <Text style={styles.text}>
          Departure date: {selectedDeptDate.toDateString()}
        </Text>
      </View>
      <Text style={styles.text}>Departs: {deptTime}</Text>
      <Text style={styles.text}>Arrives: {arrTime}</Text>
      <Text style={styles.text}>{duration} Minutes</Text>
      <Button onPress={getTrainInfo}>Plan your journey</Button>
    </View>
  );
};

export default HomeScreen;
