import { StackHeaderProps } from '@react-navigation/stack';
import React from 'react';
import { StyleSheet, Pressable } from 'react-native';
import { Appbar } from 'react-native-paper';

type TopBarProps = StackHeaderProps;

const styles = StyleSheet.create({
  title: {
    alignSelf: 'center',
  },
  backButton: {
    position: 'absolute',
  },
});

const TopBar: React.FC<TopBarProps> = ({ navigation, progress }) => (
  <Pressable
    onPress={() => {
      navigation.navigate('Home');
    }}
  >
    <Appbar.Header>
      {progress.previous && (
        <Appbar.BackAction
          style={styles.backButton}
          onPress={navigation.goBack}
        />
      )}
      <Appbar.Content titleStyle={styles.title} title="Train Board" />
    </Appbar.Header>
  </Pressable>
);

export default TopBar;
