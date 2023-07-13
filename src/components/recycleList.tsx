import React, { Component } from 'react';
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

interface RecycleListState {
  dataProvider: DataProvider;
}

class RecycleList extends Component<RecycleListProps, RecycleListState> {
  constructor(props: RecycleListProps) {
    super(props);
    this.state = {
      dataProvider: new DataProvider((r1, r2) => r1 !== r2).cloneWithRows(
        props.journeys,
      ),
    };
  }

  componentDidUpdate(prevProps: RecycleListProps) {
    if (prevProps.journeys !== this.props.journeys) {
      this.updateDataProvider();
    }
  }

  updateDataProvider() {
    const { journeys: data } = this.props;
    const { dataProvider } = this.state;
    const newDataProvider = dataProvider.cloneWithRows(data);
    this.setState({ dataProvider: newDataProvider });
  }

  render() {
    const { dataProvider } = this.state;

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
      );
    }

    return (
      <RecyclerListView
        layoutProvider={layoutProvider}
        dataProvider={dataProvider}
        style={{ width: 300, height: 200 }}
        rowRenderer={rowRenderer}
      />
    );
  }
}

export default RecycleList;
