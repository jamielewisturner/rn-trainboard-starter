import React, { Component } from 'react';
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
  private _layoutProvider: LayoutProvider;
  constructor(props: Props) {
    super(props);

    const { width } = Dimensions.get('window');
    const dataProvider = new DataProvider((r1, r2) => {
      return r1 !== r2;
    });

    this._layoutProvider = new LayoutProvider(
      (index) => {
        return index;
      },
      (type, dim) => {
        dim.width = width / 2;
        dim.height = 160;
      },
    );

    this._rowRenderer = this._rowRenderer.bind(this);

    const journeys = this.props.journey;

    //Since component should always render once data has changed, make data provider part of the state
    this.state = {
      dataProvider: dataProvider.cloneWithRows(journeys),
    };
  }

  //Given type and data return the view component
  _rowRenderer(type, item: Journey) {
    //You can return any view here, CellContainer has no special significance
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
            <Text style={styles.text}>
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
        layoutProvider={this._layoutProvider}
        dataProvider={this.state.dataProvider}
        rowRenderer={this._rowRenderer}
      />
    );
  }
}
