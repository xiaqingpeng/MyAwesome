/**
 * Drawer Navigator 示例
 * 展示如何使用 @react-navigation/drawer 创建抽屉导航
 * 支持深色模式
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
import { useAtom } from 'jotai';
import { themeColorsAtom } from '../store/themeAtoms';
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
  const [colors] = useAtom(themeColorsAtom);

  return (
    <DrawerContentScrollView {...props} style={[styles.drawerContainer, { backgroundColor: colors.surface }]}>
      {/* 用户信息头部 */}
      <View style={[styles.userInfoSection, { backgroundColor: colors.primary }]}>
        <View style={[styles.userAvatar, { backgroundColor: '#ffffff' }]}>
          <Text style={[styles.userAvatarText, { color: colors.primary }]}>JD</Text>
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>John Doe</Text>
          <Text style={[styles.userEmail, { color: '#ffffff' }]}>john.doe@example.com</Text>
        </View>
      </View>

      {/* 分隔线 */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* 导航菜单项 */}
      <View style={styles.menuSection}>
        <DrawerItemList {...props} />
      </View>

      {/* 分隔线 */}
      <View style={[styles.divider, { backgroundColor: colors.border }]} />

      {/* 额外的菜单项 */}
      <View style={styles.extraSection}>
        <DrawerItem
          label="帮助中心"
          icon={({ color, size }) => <HelpIcon color={color} size={size} />}
          onPress={() => props.navigation.navigate('Help')}
          activeTintColor={colors.primary}
          inactiveTintColor={colors.textSecondary}
        />
        <DrawerItem
          label="退出登录"
          icon={({ color, size }) => <LogoutIcon color={color} size={size} />}
          onPress={() => {
            // 这里可以添加退出登录逻辑
            console.log('退出登录');
          }}
          activeTintColor={colors.error}
          inactiveTintColor={colors.textSecondary}
          labelStyle={{ color: colors.error }}
        />
      </View>

      {/* 版本信息 */}
      <View style={styles.versionSection}>
        <Text style={[styles.versionText, { color: colors.textTertiary }]}>版本 1.0.0</Text>
      </View>
    </DrawerContentScrollView>
  );
}

// 创建 Drawer Navigator
const Drawer = createDrawerNavigator();

export function DrawerNavigatorExample() {
  const [colors] = useAtom(themeColorsAtom);

  return (
    <Drawer.Navigator
      // 自定义抽屉内容
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        // 抽屉位置：从右侧打开
        drawerPosition: 'right',
        // 抽屉样式
        drawerStyle: {
          backgroundColor: colors.surface,
          width: 280,
        },
        // 激活状态颜色
        drawerActiveTintColor: colors.primary,
        drawerActiveBackgroundColor: colors.primary + '20',
        // 非激活状态颜色
        drawerInactiveTintColor: colors.textSecondary,
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
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
          color: colors.text,
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
    flexDirection: 'row',
    alignItems: 'center',
  },
  userAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  userAvatarText: {
    fontSize: 24,
    fontWeight: 'bold',
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
  },
  divider: {
    height: 1,
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
  },
});
