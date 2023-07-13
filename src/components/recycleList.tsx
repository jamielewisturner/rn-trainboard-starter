import React, { useEffect, useState } from 'react';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';
import { Journey } from '../models/trainInfo';

import { View, Text, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 0,
    width: 300,
    marginHorizontal: 16,
  },
  text: {
    paddingBottom: 24,
  },
});

interface RecycleListProps {
  journeys: Journey[];
}

function RecycleList(props: RecycleListProps) {
  const [dataProvider, setDataProvider] = useState<DataProvider>(
    new DataProvider((r1: any, r2: any) => r1 !== r2),
  );
  dataProvider.cloneWithRows(props.journeys);

  const layoutProvider = new LayoutProvider(
    (index) => {
      return 'Default';
    },
    (type, dim) => {
      dim.width = window.innerWidth;
      dim.height = 300;
    },
  );

  function rowRenderer(type, item: Journey) {
    return (
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
        <Text style={styles.text}>{item.journeyDurationInMinutes} Minutes</Text>
        {item.tickets.map((ticket) => {
          return (
            <Text key={ticket.name} style={styles.text}>
              {ticket.name} £{ticket.priceInPennies / 100}
            </Text>
          );
        })}
      </View>
    );
  }

  useEffect(() => {
    setDataProvider((currentState) =>
      currentState.cloneWithRows(props.journeys),
    );
  }, [props.journeys]);

  return (
    <RecyclerListView
      layoutProvider={layoutProvider}
      dataProvider={dataProvider}
      style={{ width: 300, height: 200 }}
      rowRenderer={rowRenderer}
    />
  );
}

export default RecycleList;
