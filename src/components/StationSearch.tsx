import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { List, Searchbar } from 'react-native-paper';
import stationJson from '../data/stations.json';
import { Station } from '../models/trainInfo';

const StationSearch = ({ title }) => {
  const [searchQuery, setSearchQuery] = React.useState('');
  const [stations, setStations] = React.useState([] as Station[]);
  const [isSearching, setIsSearching] = React.useState(false);
  const onChangeSearch = (query: string) => {
    let possibleStations = stationJson.stations.filter((station) =>
      station.name.toLowerCase().startsWith(query.toLocaleLowerCase()),
    );
    possibleStations = possibleStations.slice(
      0,
      Math.min(possibleStations.length, 5),
    );
    if (query === '') {
      possibleStations = [];
    }
    setSearchQuery(query);
    setStations(possibleStations);
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={title}
        onChangeText={onChangeSearch}
        value={searchQuery}
        onFocus={() => setIsSearching(true)}
      ></Searchbar>
      <List.Section style={styles.list}>
        {isSearching &&
          stations.map((station) => {
            return (
              <List.Item
                title={station.name}
                key={station.crs}
                titleStyle={styles.item}
                onPress={() => {
                  setSearchQuery(station.name);
                  setIsSearching(false);
                }}
              />
            );
          })}
        {isSearching && stations.length == 0 && searchQuery.length > 0 && (
          <List.Item title="No stations found" key="NoStations" />
        )}
      </List.Section>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
  },
  item: {
    textAlign: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default StationSearch;
