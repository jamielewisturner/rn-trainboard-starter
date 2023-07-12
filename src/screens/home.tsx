import React, {useCallback} from 'react';
import { StyleSheet, View, Linking } from 'react-native';
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
type OpenURLButtonProps = {
  url: string;
  children: string;
};
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
      <Button onPress={async () => await Linking.openURL(getUrl(dest, origin))}>Plan your journey</Button>
    </View>
  );
};
function getUrl(dest:string, origin:string):string{
  return `https://www.lner.co.uk/travel-information/travelling-now/live-train-times/depart/${origin}/${dest}/#LiveDepResults`;
}

export default HomeScreen;
