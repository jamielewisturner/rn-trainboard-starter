import React from 'react';
import { StyleSheet, View, Linking } from 'react-native';
import { Text, Button, List } from 'react-native-paper';
import { TrainInfo, Journey } from '../trainInfo';
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
});

type OpenURLButtonProps = {
  url: string;
  children: string;
};
type HomeScreenProps = ScreenNavigationProps<'Home'>;

function getUrl(origin: string, dest: string): string {
  return `https://mobile-api-softwire2.lner.co.uk/v1/fares?originStation=${origin}&destinationStation=${dest}&numberOfAdults=2&numberOfChildren=0&outboundDateTime=2023-07-24T14%3A30%3A00.000%2B01%3A00`;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [origin, setOrigin] = React.useState('RYS');
  const [dest, setDest] = React.useState('OXF');
  const [deptTime, setDept] = React.useState('None');
  const [arrTime, setArr] = React.useState('None');
  const [duration, setDuration] = React.useState(0);
  const stations = ['SOU', 'RYS', 'OXF', 'RDG', 'WRW'];
  const getTrainInfo = async () => {
    const res = await fetch(getUrl(origin, dest), {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.API_KEY,
      },
    });
    const jsonRes: TrainInfo = (await res.json()) as TrainInfo;
    const journey: Journey = jsonRes.outboundJourneys[0];
    const deptTimeDate = new Date(journey.departureTime);
    setDept(deptTimeDate.toLocaleTimeString('en-GB', { timeStyle: 'short' }));
    const arrTimeDate = new Date(journey.arrivalTime);
    setArr(arrTimeDate.toLocaleTimeString('en-GB', { timeStyle: 'short' }));

    const duration = journey.journeyDurationInMinutes;
    setDuration(duration);
  };

  async function getLiveTimes() {
    const response = await fetch(getUrl(dest, origin));
    console.log(JSON.stringify(response));
  }
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
      <Text style={styles.text}>Departs: {deptTime}</Text>
      <Text style={styles.text}>Arrives: {arrTime}</Text>
      <Text style={styles.text}>{duration} Minutes</Text>
      <Button onPress={getTrainInfo}>Plan your journey</Button>
    </View>
  );
};

export default HomeScreen;
