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
  dropdown : {
    width : '80%',
    alignItems: 'center'
  }
});

type HomeScreenProps = ScreenNavigationProps<'Home'>;

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [location, setLocation] = React.useState("LDN");

  const stations = ["SOU", "RYS", "OXF", "RDG", "WRW"]
  return (<View style={styles.container}>
    <List.Section style={styles.dropdown}>
      <List.Accordion
      title="Dropdown"
      >
        {
          stations.map(station => {
            return <List.Item title={station} onPress={()=>{setLocation(station)}}/>
          })
        }
      </List.Accordion>
    </List.Section>
    <Text style={styles.text}>{location}</Text>
    <Button mode="contained" onPress={() => navigation.navigate('Details')}>
      Go to details
    </Button>
  </View>);
}
  

export default HomeScreen;
