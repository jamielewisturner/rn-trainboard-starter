import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, List } from 'react-native-paper';
import { TrainInfo } from '../models/trainInfo';
import { ScreenNavigationProps } from '../routes';
import RecycleTestComponent from '../components/recycleList';
//import { DataProvider, LayoutProvider} from 'recyclerlistview';

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
  return `${process.env.API_URL}?originStation=${origin}&destinationStation=${dest}&numberOfAdults=2&numberOfChildren=0&outboundDateTime=2023-07-24T14%3A30%3A00.000%2B01%3A00`;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [origin, setOrigin] = React.useState('RYS');
  const [dest, setDest] = React.useState('OXF');
  const [journeys, setJourneys] = React.useState([] as Journey[]);
  const stations = ['SOU', 'RYS', 'OXF', 'RDG', 'WRW'];
  const getTrainInfo = async () => {
    const res = await fetch(getUrl(origin, dest), {
      method: 'GET',
      headers: {
        'X-API-KEY': process.env.API_KEY,
      },
    });
    const trainInfo = await res.json() as TrainInfo;
    setJourneys(trainInfo.outboundJourneys);
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

      <RecycleTestComponent journey={journeys}></RecycleTestComponent>

      <Button style={styles.button} onPress={getTrainInfo}>Plan your journey</Button>
    </View>
  );
};

export default HomeScreen;
