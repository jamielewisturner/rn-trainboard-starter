import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { getEqualHitSlop } from '../helpers/hitSlopHelper';

type TopBarProps = StackHeaderProps;

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
  },
  topbar: {
    backgroundColor: '#fe4365',
  },
  backButton: {
    position: 'absolute',
  },
});

const TopBar: React.FC<TopBarProps> = ({ navigation, progress }) => (
  <Appbar.Header style={styles.topbar}>
    {progress.previous && (
      <Appbar.BackAction
        style={styles.backButton}
        hitSlop={getEqualHitSlop(30)}
        onPress={navigation.goBack}
      />
    )}
    <Appbar.Content titleStyle={styles.title} title="Train Board" />
  </Appbar.Header>
);

export default TopBar;
