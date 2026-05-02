import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

// SVG Icons for drawer example screens
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

// Example screens for the drawer
export function DrawerHomeScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <HomeIcon color="#007AFF" size={64} />
        </View>
        <Text style={styles.title}>Drawer Home</Text>
        <Text style={styles.description}>
          这是抽屉导航的我的示例。抽屉导航适合用于：
        </Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Circle cx="4" cy="4" r="3" fill="#007AFF" />
            <Text style={styles.featureText}>应用的主要导航结构</Text>
          </View>
          <View style={styles.featureItem}>
            <Circle cx="4" cy="4" r="3" fill="#007AFF" />
            <Text style={styles.featureText}>多个顶级页面的切换</Text>
          </View>
          <View style={styles.featureItem}>
            <Circle cx="4" cy="4" r="3" fill="#007AFF" />
            <Text style={styles.featureText}>用户账户和设置访问</Text>
          </View>
          <View style={styles.featureItem}>
            <Circle cx="4" cy="4" r="3" fill="#007AFF" />
            <Text style={styles.featureText}>节省屏幕空间</Text>
          </View>
        </View>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 使用提示</Text>
          <Text style={styles.infoText}>
            • 从右侧边缘向左滑动打开抽屉{'\n'}
            • 点击菜单图标打开抽屉{'\n'}
            • 点击遮罩层或按返回键关闭抽屉{'\n'}
            • 点击菜单项导航到对应页面
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

export function DrawerProfileScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <ProfileIcon color="#34C759" size={64} />
        </View>
        <Text style={styles.title}>个人资料</Text>
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={styles.profileName}>John Doe</Text>
          <Text style={styles.profileEmail}>john.doe@example.com</Text>
        </View>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>128</Text>
            <Text style={styles.statLabel}>帖子</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>1.2K</Text>
            <Text style={styles.statLabel}>关注者</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>456</Text>
            <Text style={styles.statLabel}>关注中</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export function DrawerSettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <SettingsIcon color="#FF9500" size={64} />
        </View>
        <Text style={styles.title}>设置</Text>
        <View style={styles.settingsList}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>通知</Text>
            <Text style={styles.settingValue}>开启</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>深色模式</Text>
            <Text style={styles.settingValue}>关闭</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>语言</Text>
            <Text style={styles.settingValue}>中文</Text>
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>隐私</Text>
            <Text style={styles.settingValue}>公开</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export function DrawerNotificationsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <NotificationIcon color="#FF3B30" size={64} />
        </View>
        <Text style={styles.title}>通知</Text>
        <View style={styles.notificationsList}>
          <View style={styles.notificationItem}>
            <View style={[styles.notificationDot, { backgroundColor: '#007AFF' }]} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>新消息</Text>
              <Text style={styles.notificationText}>您有 3 条新消息</Text>
              <Text style={styles.notificationTime}>5 分钟前</Text>
            </View>
          </View>
          <View style={styles.notificationItem}>
            <View style={[styles.notificationDot, { backgroundColor: '#34C759' }]} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>系统更新</Text>
              <Text style={styles.notificationText}>新版本可用</Text>
              <Text style={styles.notificationTime}>1 小时前</Text>
            </View>
          </View>
          <View style={styles.notificationItem}>
            <View style={[styles.notificationDot, { backgroundColor: '#FF9500' }]} />
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>提醒</Text>
              <Text style={styles.notificationText}>您有待办事项</Text>
              <Text style={styles.notificationTime}>2 小时前</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export function DrawerHelpScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <HelpIcon color="#5856D6" size={64} />
        </View>
        <Text style={styles.title}>帮助中心</Text>
        <View style={styles.helpSection}>
          <Text style={styles.helpSectionTitle}>常见问题</Text>
          <View style={styles.helpItem}>
            <Text style={styles.helpQuestion}>如何使用抽屉导航？</Text>
            <Text style={styles.helpAnswer}>
              从屏幕右侧边缘向左滑动，或点击右上角的菜单图标即可打开抽屉。
            </Text>
          </View>
          <View style={styles.helpItem}>
            <Text style={styles.helpQuestion}>如何自定义抽屉内容？</Text>
            <Text style={styles.helpAnswer}>
              使用 drawerContent 属性传入自定义组件，可以完全控制抽屉的外观和行为。
            </Text>
          </View>
          <View style={styles.helpItem}>
            <Text style={styles.helpQuestion}>支持哪些手势？</Text>
            <Text style={styles.helpAnswer}>
              支持从右边缘滑动打开、点击遮罩关闭、滑动关闭等手势操作。
            </Text>
          </View>
        </View>
        <View style={styles.contactCard}>
          <Text style={styles.contactTitle}>需要更多帮助？</Text>
          <Text style={styles.contactText}>
            访问我们的文档或联系支持团队
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 20,
  },
  featureList: {
    marginBottom: 20,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingLeft: 8,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  infoCard: {
    backgroundColor: '#E3F2FD',
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 22,
  },
  profileCard: {
    backgroundColor: '#fff',
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  settingsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  settingValue: {
    fontSize: 16,
    color: '#007AFF',
  },
  notificationsList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  notificationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginTop: 6,
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  notificationText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  helpSection: {
    marginBottom: 20,
  },
  helpSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  helpItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  helpQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  helpAnswer: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactCard: {
    backgroundColor: '#F3E5F5',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  contactTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#7B1FA2',
    marginBottom: 8,
  },
  contactText: {
    fontSize: 14,
    color: '#6A1B9A',
    textAlign: 'center',
  },
});
