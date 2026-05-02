/**
 * Drawer Navigator 示例
 * 展示如何使用 @react-navigation/drawer 创建抽屉导航
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Svg, { Path } from 'react-native-svg';
import {
  DrawerHomeScreen,
  DrawerProfileScreen,
  DrawerSettingsScreen,
  DrawerNotificationsScreen,
  DrawerHelpScreen,
} from '../screens/DrawerExampleScreen';
import SettingsScreen from '../screens/SettingsScreen';

// SVG Icons
function HomeIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </Svg>
  );
}

function ProfileIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
    </Svg>
  );
}

function SettingsIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z" />
    </Svg>
  );
}

function NotificationIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.9 2 2 2zm6-6v-5c0-3.07-1.63-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.64 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2zm-2 1H8v-6c0-2.48 1.51-4.5 4-4.5s4 2.02 4 4.5v6z" />
    </Svg>
  );
}

function HelpIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z" />
    </Svg>
  );
}

function LogoutIcon({ color, size = 24 }: { color: string; size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <Path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
    </Svg>
  );
}

// 自定义抽屉内容
function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props} style={styles.drawerContainer}>
      {/* 用户信息头部 */}
      <View style={styles.userInfoSection}>
        <View style={styles.userAvatar}>
          <Text style={styles.userAvatarText}>JD</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={styles.userEmail}>john.doe@example.com</Text>
        </View>
      </View>

      {/* 分隔线 */}
      <View style={styles.divider} />

      {/* 导航菜单项 */}
      <View style={styles.menuSection}>
        <DrawerItemList {...props} />
      </View>

      {/* 分隔线 */}
      <View style={styles.divider} />

      {/* 额外的菜单项 */}
      <View style={styles.extraSection}>
        <DrawerItem
          label="帮助中心"
          icon={({ color, size }) => <HelpIcon color={color} size={size} />}
          onPress={() => props.navigation.navigate('Help')}
          activeTintColor="#007AFF"
          inactiveTintColor="#666"
        />
        <DrawerItem
          label="退出登录"
          icon={({ color, size }) => <LogoutIcon color={color} size={size} />}
          onPress={() => {
            // 这里可以添加退出登录逻辑
            console.log('退出登录');
          }}
          activeTintColor="#FF3B30"
          inactiveTintColor="#666"
          labelStyle={{ color: '#FF3B30' }}
        />
      </View>

      {/* 版本信息 */}
      <View style={styles.versionSection}>
        <Text style={styles.versionText}>版本 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

// 创建 Drawer Navigator
const Drawer = createDrawerNavigator();

export function DrawerNavigatorExample() {
  return (
    <Drawer.Navigator
      // 自定义抽屉内容
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        // 抽屉位置：从右侧打开
        drawerPosition: 'right',
        // 抽屉样式
        drawerStyle: {
          backgroundColor: '#fff',
          width: 280,
        },
        // 激活状态颜色
        drawerActiveTintColor: '#007AFF',
        drawerActiveBackgroundColor: '#E3F2FD',
        // 非激活状态颜色
        drawerInactiveTintColor: '#666',
        drawerInactiveBackgroundColor: 'transparent',
        // 标签样式
        drawerLabelStyle: {
          fontSize: 16,
          fontWeight: '500',
        },
        // 菜单项样式
        drawerItemStyle: {
          borderRadius: 8,
          marginHorizontal: 8,
          marginVertical: 2,
        },
        // 头部样式
        headerStyle: {
          backgroundColor: '#007AFF',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Drawer.Screen
        name="DrawerHome"
        component={DrawerHomeScreen}
        options={{
          title: '我的',
          drawerLabel: '我的',
          drawerIcon: ({ color, size }) => <HomeIcon color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="DrawerProfile"
        component={DrawerProfileScreen}
        options={{
          title: '个人资料',
          drawerLabel: '个人资料',
          drawerIcon: ({ color, size }) => <ProfileIcon color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="DrawerNotifications"
        component={DrawerNotificationsScreen}
        options={{
          title: '通知',
          drawerLabel: '通知',
          drawerIcon: ({ color, size }) => <NotificationIcon color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="DrawerSettings"
        component={DrawerSettingsScreen}
        options={{
          title: '设置',
          drawerLabel: '设置',
          drawerIcon: ({ color, size }) => <SettingsIcon color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="About"
        component={SettingsScreen}
        options={{
          title: '关于',
          drawerLabel: '关于',
          drawerIcon: ({ color, size }) => <HelpIcon color={color} size={size} />,
        }}
      />
      <Drawer.Screen
        name="Help"
        component={DrawerHelpScreen}
        options={{
          title: '帮助',
          // 不在抽屉菜单中显示（通过 CustomDrawerContent 手动添加）
          drawerItemStyle: { display: 'none' },
        }}
      />
    </Drawer.Navigator>
  );
}

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
  },
  userInfoSection: {
    padding: 20,
    backgroundColor: '#007AFF',
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#E3F2FD',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  menuSection: {
    paddingVertical: 8,
  },
  extraSection: {
    paddingVertical: 8,
  },
  versionSection: {
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    fontSize: 12,
    color: '#999',
  },
});
