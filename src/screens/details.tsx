import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { ScreenNavigationProps } from '../routes';

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
});

type DetailScreenProps = ScreenNavigationProps<'Details'>

const DetailsScreen: React.FC<DetailScreenProps> = ({ navigation }) => (
  <View style={styles.container}>
    <Text>Details Screen</Text>
    <Button
      style={styles.backButton}
      onPress={() => navigation.navigate('Home')}
      mode="contained"
    ></Button>
  </View>
);

export default DetailsScreen;
