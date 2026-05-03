import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import type { HomeStackParamList } from '../navigation/types';
import { useAtom } from 'jotai';
import { themeColorsAtom } from '../store/themeAtoms';

type ProfileScreenNavigationProp = NativeStackNavigationProp<
  HomeStackParamList,
  'Profile'
>;

type ProfileScreenRouteProp = RouteProp<HomeStackParamList, 'Profile'>;

function ProfileScreen() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const route = useRoute<ProfileScreenRouteProp>();
  const { name } = route.params;
  const [colors] = useAtom(themeColorsAtom);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Text style={[styles.title, { color: colors.text }]}>Profile Screen</Text>
      <Text style={[styles.profileText, { color: colors.textSecondary }]}>This is {name}'s profile</Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.goBack()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileText: {
    fontSize: 18,
    marginBottom: 30,
  },
});

export default ProfileScreen;
