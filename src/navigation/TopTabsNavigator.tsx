/**
 * Material Top Tabs Navigator 组件
 * 可以嵌套在 Bottom Tabs 中使用
 */

import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeedScreen from '../screens/FeedScreen';
import ExploreScreen from '../screens/ExploreScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import type { TopTabParamList } from './types';

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

export function TopTabsNavigator() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <TopTab.Navigator
        initialLayout={{ width: Dimensions.get('window').width }}
        screenOptions={{
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarStyle: {
            backgroundColor: '#ffffff',
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarIndicatorStyle: {
            backgroundColor: '#007AFF',
            height: 3,
          },
          tabBarPressColor: 'rgba(0, 122, 255, 0.1)',
          swipeEnabled: true,
          lazy: true,
          lazyPreloadDistance: 1,
        }}
      >
        <TopTab.Screen
          name="Feed"
          component={FeedScreen}
          options={{
            tabBarLabel: 'Feed',
          }}
        />
        <TopTab.Screen
          name="Explore"
          component={ExploreScreen}
          options={{
            tabBarLabel: 'Explore',
          }}
        />
        <TopTab.Screen
          name="Notifications"
          component={NotificationsScreen}
          options={{
            tabBarLabel: 'Notifications',
          }}
        />
      </TopTab.Navigator>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
