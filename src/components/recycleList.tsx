import React from 'react';
import { View, Text, Dimensions, StyleSheet } from 'react-native';
import {
  RecyclerListView,
  DataProvider,
  LayoutProvider,
} from 'recyclerlistview';
import { Journey } from '../models/trainInfo';
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

interface Props {
  journey: Journey[];
}

export default class RecycleTestComponent extends React.Component<Props> {
  private layoutProvider: LayoutProvider;
  private dataProvider: DataProvider;

  constructor(props: Props) {
    super(props);
    const { width } = Dimensions.get('window');
    this.dataProvider = new DataProvider((value1: Journey, value2: Journey) => {
      return value1 !== value2;
    });

    this.layoutProvider = new LayoutProvider(
      (index) => {
        return index;
      },
      (type, dim) => {
        dim.width = width / 2;
        dim.height = 160;
      },
    );

    this.rowRenderer = this.rowRenderer.bind(this);

    const journeys = this.props.journey;

    this.dataProvider.cloneWithRows(journeys);
  }

  rowRenderer(type, item: Journey) {
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

  render() {
    return (
      <RecyclerListView
        style={{ width: 200, height: 800 }}
        layoutProvider={this.layoutProvider}
        dataProvider={this.dataProvider}
        rowRenderer={this.rowRenderer}
      />
    );
  }
}
