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
import {
  HomeIcon,
  ProfileIcon,
  SettingsIcon,
  NotificationIcon,
  HelpIcon,
  LogoutIcon,
} from '../components/icons';
import {
  DrawerHomeScreen,
  DrawerProfileScreen,
  DrawerSettingsScreen,
  DrawerNotificationsScreen,
  DrawerHelpScreen,
} from '../screens/DrawerExampleScreen';
import SettingsScreen from '../screens/SettingsScreen';

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
