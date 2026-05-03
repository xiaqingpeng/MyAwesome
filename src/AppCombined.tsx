/**
 * 组合导航示例
 * Bottom Tabs + Material Top Tabs + Stack Navigator
 * 
 * 这个示例展示了如何将三种导航器组合使用：
 * - Bottom Tabs: 主要功能切换
 * - Top Tabs: 内容分类浏览
 * - Stack: 页面层级导航
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as JotaiProvider } from 'jotai';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { TopTabsNavigator } from './navigation/TopTabsNavigator';
import { DrawerNavigatorExample } from './navigation/DrawerNavigatorExample';
import { TabBarIconSvg } from './components/TabBarIconSvg';
import type { HomeStackParamList } from './navigation/types';

// Stack Navigator for Home tab
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="HomeMain"
        component={HomeScreen}
        options={{ title: 'Welcome' }}
      />
      <HomeStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </HomeStack.Navigator>
  );
}

// Settings tab now directly uses Drawer Navigator
// No need for SettingsStackScreen anymore

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function AppCombined() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <JotaiProvider>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              tabBarActiveTintColor: '#007AFF',
              tabBarInactiveTintColor: 'gray',
              headerShown: false,
            }}
          >
          <Tab.Screen
            name="HomeTab"
            component={HomeStackScreen}
            options={{
              title: 'Home',
              tabBarIcon: ({ color, size, focused }) => (
                <TabBarIconSvg name="home" color={color} size={size} focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Discover"
            component={TopTabsNavigator}
            options={{
              title: 'Discover',
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <TabBarIconSvg name="discover" color={color} size={size} focused={focused} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={DrawerNavigatorExample}
            options={{
              title: 'Settings',
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <TabBarIconSvg name="settings" color={color} size={size} focused={focused} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
    </JotaiProvider>
  );
}

export default AppCombined;
