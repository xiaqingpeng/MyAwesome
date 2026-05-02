/**
 * 这是一个使用图标库的 Bottom Tab Navigator 示例
 * 
 * 要使用此示例，需要先安装图标库：
 * npm install react-native-vector-icons
 * 
 * 然后在 App.tsx 中导入并使用此组件替代当前的 Tab.Navigator
 */

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import Icon from 'react-native-vector-icons/Ionicons'; // 取消注释以使用
import type { RootTabParamList } from './types';

const Tab = createBottomTabNavigator<RootTabParamList>();

// 示例：使用 react-native-vector-icons
export function TabNavigatorWithIcons() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '600',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" size={size} color={color} />
            // 取消上面的注释并删除下面的 emoji
            <span>{color === '#007AFF' ? '🏠' : '🏚️'}</span>
          ),
          tabBarBadge: 3, // 可选：显示徽章
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            // <Icon name="settings" size={size} color={color} />
            // 取消上面的注释并删除下面的 emoji
            <span>{color === '#007AFF' ? '⚙️' : '⚙'}</span>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 示例：使用 Material Design Icons
export function TabNavigatorWithMaterialIcons() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#6200EE',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          elevation: 8, // Android 阴影
          shadowOpacity: 0.1, // iOS 阴影
          shadowRadius: 4,
          shadowOffset: { width: 0, height: -2 },
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            // <Icon name="home" size={size} color={color} />
            <span>🏠</span>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: true,
          tabBarIcon: ({ color, size }) => (
            // <Icon name="settings" size={size} color={color} />
            <span>⚙️</span>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// 示例：自定义标签栏样式
export function TabNavigatorCustomStyle() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6B6B',
        tabBarInactiveTintColor: '#95A5A6',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#2C3E50',
          borderTopWidth: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          fontSize: 14,
          fontWeight: 'bold',
        },
        tabBarItemStyle: {
          marginHorizontal: 10,
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeStackScreen}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => <span>🏠</span>,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: 'Settings',
          headerShown: true,
          tabBarIcon: ({ color, size }) => <span>⚙️</span>,
        }}
      />
    </Tab.Navigator>
  );
}

// 注意：需要导入这些组件
// import HomeStackScreen from '../screens/HomeStackScreen';
// import SettingsScreen from '../screens/SettingsScreen';
