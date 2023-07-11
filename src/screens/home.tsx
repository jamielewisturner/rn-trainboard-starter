import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Text, Button, List } from 'react-native-paper';

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

type HomeScreenProps = ScreenNavigationProps<'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [origin, setOrigin] = React.useState('LDN');
  const [dest, setDest] = React.useState('LDN');
  const stations = ['SOU', 'RYS', 'OXF', 'RDG', 'WRW'];
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
      <Text style={styles.text}></Text>
      <Button mode="contained" onPress={() => navigation.navigate('Details')}>
        Go to details
      </Button>
    </View>
  );
};

export default HomeScreen;
