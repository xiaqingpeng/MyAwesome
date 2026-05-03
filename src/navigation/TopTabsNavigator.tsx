/**
 * Material Top Tabs Navigator 组件
 * 可以嵌套在 Bottom Tabs 中使用
 * 
 * 特性：
 * - 支持标签栏滚动（tabBarScrollEnabled）
 * - 自动调整标签宽度（width: 'auto'）
 * - 可以容纳更多标签而不会拥挤
 * - 支持左右滑动切换页面
 * - 支持深色模式
 */

import React from 'react';
import { Dimensions, View, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { useAtom } from 'jotai';
import { themeColorsAtom } from '../store/themeAtoms';
import FeedScreen from '../screens/FeedScreen';
import ExploreScreen from '../screens/ExploreScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import NetworkDemoScreen from '../screens/NetworkDemoScreen';
import CodegenDemoScreen from '../screens/CodegenDemoScreen';
import type { TopTabParamList } from './types';

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

export function TopTabsNavigator() {
  const insets = useSafeAreaInsets();
  const [colors] = useAtom(themeColorsAtom);

  return (
    <View style={[styles.container, { paddingTop: insets.top, backgroundColor: colors.background }]}>
      <TopTab.Navigator
        initialLayout={{ width: Dimensions.get('window').width }}
        screenOptions={{
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textSecondary,
          tabBarLabelStyle: {
            fontSize: 14,
            fontWeight: '600',
            textTransform: 'none',
          },
          tabBarStyle: {
            backgroundColor: colors.surface,
            elevation: 4,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.primary,
            height: 3,
          },
          tabBarPressColor: colors.primary + '20',
          tabBarScrollEnabled: true,  // ✅ 启用标签栏滚动
          tabBarItemStyle: {
            width: 'auto',  // ✅ 自动宽度，根据内容调整
            minWidth: 90,   // ✅ 最小宽度
            paddingHorizontal: 12,  // ✅ 水平内边距
          },
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
          name="Network"
          component={NetworkDemoScreen}
          options={{
            tabBarLabel: 'Network',
          }}
        />
        <TopTab.Screen
          name="Codegen"
          component={CodegenDemoScreen}
          options={{
            tabBarLabel: 'Codegen',
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
  },
});
