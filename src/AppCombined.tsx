/**
 * 组合导航示例
 * Bottom Tabs + Material Top Tabs + Stack Navigator
 * 
 * 这个示例展示了如何将三种导航器组合使用：
 * - Bottom Tabs: 主要功能切换
 * - Top Tabs: 内容分类浏览
 * - Stack: 页面层级导航
 * - 支持深色模式
 */

import React, { useEffect } from 'react';
import { StatusBar, Appearance } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as JotaiProvider, useAtom, useSetAtom } from 'jotai';
import { themeColorsAtom, isDarkModeAtom, systemThemeAtom } from './store/themeAtoms';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import { TopTabsNavigator } from './navigation/TopTabsNavigator';
import { DrawerNavigatorExample } from './navigation/DrawerNavigatorExample';
import { TabBarIconSvg } from './components/TabBarIconSvg';
import type { HomeStackParamList } from './navigation/types';

// Stack Navigator for Home tab
const HomeStack = createNativeStackNavigator<HomeStackParamList>();

function HomeStackScreen() {
  const [colors] = useAtom(themeColorsAtom);

  return (
    <HomeStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
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

// Bottom Tab Navigator
const Tab = createBottomTabNavigator();

function AppNavigator() {
  const [colors] = useAtom(themeColorsAtom);
  const [isDark] = useAtom(isDarkModeAtom);
  const setSystemTheme = useSetAtom(systemThemeAtom);

  // 监听系统主题变化
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme === 'dark' ? 'dark' : 'light');
    });

    return () => subscription.remove();
  }, [setSystemTheme]);

  return (
    <>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} backgroundColor={colors.surface} />
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            tabBarActiveTintColor: colors.primary,
            tabBarInactiveTintColor: colors.textSecondary,
            tabBarStyle: {
              backgroundColor: colors.surface,
              borderTopColor: colors.border,
            },
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
    </>
  );
}

function AppCombined() {
  return (
    <JotaiProvider>
      <SafeAreaProvider>
        <AppNavigator />
      </SafeAreaProvider>
    </JotaiProvider>
  );
}

export default AppCombined;
