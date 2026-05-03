import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Appearance } from 'react-native';
import { Circle } from 'react-native-svg';
import { useAtom, useSetAtom } from 'jotai';
import {
  HomeIcon,
  ProfileIcon,
  SettingsIcon,
  NotificationIcon,
  HelpIcon,
} from '../components/icons';
import { themeModeAtom, themeColorsAtom, systemThemeAtom } from '../store/themeAtoms';
import type { ThemeMode } from '../store/themeAtoms';

// Example screens for the drawer
export function DrawerHomeScreen() {
  const [colors] = useAtom(themeColorsAtom);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <HomeIcon color={colors.primary} size={64} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>Drawer Home</Text>
        <Text style={[styles.description, { color: colors.textSecondary }]}>
          这是抽屉导航的我的示例。抽屉导航适合用于：
        </Text>
        <View style={styles.featureList}>
          <View style={styles.featureItem}>
            <Circle cx="4" cy="4" r="3" fill={colors.primary} />
            <Text style={[styles.featureText, { color: colors.text }]}>应用的主要导航结构</Text>
          </View>
          <View style={styles.featureItem}>
            <Circle cx="4" cy="4" r="3" fill={colors.primary} />
            <Text style={[styles.featureText, { color: colors.text }]}>多个顶级页面的切换</Text>
          </View>
          <View style={styles.featureItem}>
            <Circle cx="4" cy="4" r="3" fill={colors.primary} />
            <Text style={[styles.featureText, { color: colors.text }]}>用户账户和设置访问</Text>
          </View>
          <View style={styles.featureItem}>
            <Circle cx="4" cy="4" r="3" fill={colors.primary} />
            <Text style={[styles.featureText, { color: colors.text }]}>节省屏幕空间</Text>
          </View>
        </View>
        <View style={[styles.infoCard, { backgroundColor: colors.primary + '20' }]}>
          <Text style={[styles.infoTitle, { color: colors.primary }]}>使用提示</Text>
          <Text style={[styles.infoText, { color: colors.primary }]}>
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
  const [colors] = useAtom(themeColorsAtom);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <ProfileIcon color={colors.success} size={64} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>个人资料</Text>
        <View style={[styles.profileCard, { backgroundColor: colors.surface }]}>
          <View style={[styles.avatar, { backgroundColor: colors.success }]}>
            <Text style={styles.avatarText}>JD</Text>
          </View>
          <Text style={[styles.profileName, { color: colors.text }]}>John Doe</Text>
          <Text style={[styles.profileEmail, { color: colors.textSecondary }]}>john.doe@example.com</Text>
        </View>
        <View style={[styles.statsContainer, { backgroundColor: colors.surface }]}>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>128</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>帖子</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>1.2K</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>关注者</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={[styles.statValue, { color: colors.text }]}>456</Text>
            <Text style={[styles.statLabel, { color: colors.textSecondary }]}>关注中</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export function DrawerSettingsScreen() {
  const [themeMode, setThemeMode] = useAtom(themeModeAtom);
  const [colors] = useAtom(themeColorsAtom);
  const setSystemTheme = useSetAtom(systemThemeAtom);

  // 监听系统主题变化
  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      setSystemTheme(colorScheme === 'dark' ? 'dark' : 'light');
    });

    return () => subscription.remove();
  }, [setSystemTheme]);

  const handleThemeModeChange = (mode: ThemeMode) => {
    setThemeMode(mode);
  };

  const getThemeModeLabel = () => {
    switch (themeMode) {
      case 'light':
        return '浅色';
      case 'dark':
        return '深色';
      case 'system':
        return '跟随系统';
      default:
        return '跟随系统';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <SettingsIcon color={colors.warning} size={64} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>设置</Text>

        {/* 主题设置区域 */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>外观</Text>
          
          {/* 深色模式选择 */}
          <View style={[styles.settingsList, { backgroundColor: colors.surface }]}>
            <View style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>主题模式</Text>
              <Text style={[styles.settingValue, { color: colors.primary }]}>
                {getThemeModeLabel()}
              </Text>
            </View>
          </View>

          {/* 主题选项卡片 */}
          <View style={styles.themeOptionsContainer}>
            <TouchableOpacity
              style={[
                styles.themeOption,
                { backgroundColor: colors.surface, borderColor: colors.border },
                themeMode === 'light' && { borderColor: colors.primary, borderWidth: 2 },
              ]}
              onPress={() => handleThemeModeChange('light')}
            >
              <View style={[styles.themePreview, { backgroundColor: '#ffffff' }]}>
                <View style={styles.themePreviewContent}>
                  <View style={[styles.themePreviewBar, { backgroundColor: '#f5f5f5' }]} />
                  <View style={[styles.themePreviewText, { backgroundColor: '#333333' }]} />
                  <View style={[styles.themePreviewText, { backgroundColor: '#666666' }]} />
                </View>
              </View>
              <Text style={[styles.themeOptionLabel, { color: colors.text }]}>浅色</Text>
              {themeMode === 'light' && (
                <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeOption,
                { backgroundColor: colors.surface, borderColor: colors.border },
                themeMode === 'dark' && { borderColor: colors.primary, borderWidth: 2 },
              ]}
              onPress={() => handleThemeModeChange('dark')}
            >
              <View style={[styles.themePreview, { backgroundColor: '#000000' }]}>
                <View style={styles.themePreviewContent}>
                  <View style={[styles.themePreviewBar, { backgroundColor: '#1c1c1e' }]} />
                  <View style={[styles.themePreviewText, { backgroundColor: '#ffffff' }]} />
                  <View style={[styles.themePreviewText, { backgroundColor: '#a0a0a0' }]} />
                </View>
              </View>
              <Text style={[styles.themeOptionLabel, { color: colors.text }]}>深色</Text>
              {themeMode === 'dark' && (
                <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeOption,
                { backgroundColor: colors.surface, borderColor: colors.border },
                themeMode === 'system' && { borderColor: colors.primary, borderWidth: 2 },
              ]}
              onPress={() => handleThemeModeChange('system')}
            >
              <View style={styles.themePreview}>
                <View style={[styles.themePreviewHalf, { backgroundColor: '#ffffff' }]}>
                  <View style={[styles.themePreviewBar, { backgroundColor: '#f5f5f5' }]} />
                  <View style={[styles.themePreviewText, { backgroundColor: '#333333' }]} />
                </View>
                <View style={[styles.themePreviewHalf, { backgroundColor: '#000000' }]}>
                  <View style={[styles.themePreviewBar, { backgroundColor: '#1c1c1e' }]} />
                  <View style={[styles.themePreviewText, { backgroundColor: '#ffffff' }]} />
                </View>
              </View>
              <Text style={[styles.themeOptionLabel, { color: colors.text }]}>跟随系统</Text>
              {themeMode === 'system' && (
                <View style={[styles.checkmark, { backgroundColor: colors.primary }]}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          </View>

          {/* 提示信息 */}
          <View style={[styles.infoCard, { backgroundColor: colors.primary + '20' }]}>
            <Text style={[styles.infoTitle, { color: colors.primary }]}>提示</Text>
            <Text style={[styles.infoText, { color: colors.primary }]}>
              {themeMode === 'system'
                ? '当前跟随系统设置，应用主题会随系统自动切换'
                : themeMode === 'dark'
                ? '深色模式已开启，可以减少眼睛疲劳'
                : '浅色模式已开启，适合在明亮环境下使用'}
            </Text>
          </View>
        </View>

        {/* 其他设置 */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>通用</Text>
          <View style={[styles.settingsList, { backgroundColor: colors.surface }]}>
            <View style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>通知</Text>
              <Text style={[styles.settingValue, { color: colors.primary }]}>开启</Text>
            </View>
            <View style={[styles.settingItem, { borderBottomColor: colors.separator }]}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>语言</Text>
              <Text style={[styles.settingValue, { color: colors.primary }]}>中文</Text>
            </View>
            <View style={[styles.settingItem, { borderBottomColor: 'transparent' }]}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>隐私</Text>
              <Text style={[styles.settingValue, { color: colors.primary }]}>公开</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export function DrawerNotificationsScreen() {
  const [colors] = useAtom(themeColorsAtom);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <NotificationIcon color={colors.error} size={64} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>通知</Text>
        <View style={[styles.notificationsList, { backgroundColor: colors.surface }]}>
          <View style={[styles.notificationItem, { borderBottomColor: colors.separator }]}>
            <View style={[styles.notificationDot, { backgroundColor: colors.primary }]} />
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, { color: colors.text }]}>新消息</Text>
              <Text style={[styles.notificationText, { color: colors.textSecondary }]}>您有 3 条新消息</Text>
              <Text style={[styles.notificationTime, { color: colors.textTertiary }]}>5 分钟前</Text>
            </View>
          </View>
          <View style={[styles.notificationItem, { borderBottomColor: colors.separator }]}>
            <View style={[styles.notificationDot, { backgroundColor: colors.success }]} />
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, { color: colors.text }]}>系统更新</Text>
              <Text style={[styles.notificationText, { color: colors.textSecondary }]}>新版本可用</Text>
              <Text style={[styles.notificationTime, { color: colors.textTertiary }]}>1 小时前</Text>
            </View>
          </View>
          <View style={[styles.notificationItem, { borderBottomColor: 'transparent' }]}>
            <View style={[styles.notificationDot, { backgroundColor: colors.warning }]} />
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, { color: colors.text }]}>提醒</Text>
              <Text style={[styles.notificationText, { color: colors.textSecondary }]}>您有待办事项</Text>
              <Text style={[styles.notificationTime, { color: colors.textTertiary }]}>2 小时前</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

export function DrawerHelpScreen() {
  const [colors] = useAtom(themeColorsAtom);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <HelpIcon color="#5856D6" size={64} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>帮助中心</Text>
        <View style={styles.helpSection}>
          <Text style={[styles.helpSectionTitle, { color: colors.text }]}>常见问题</Text>
          <View style={[styles.helpItem, { backgroundColor: colors.surface }]}>
            <Text style={[styles.helpQuestion, { color: colors.text }]}>如何使用抽屉导航？</Text>
            <Text style={[styles.helpAnswer, { color: colors.textSecondary }]}>
              从屏幕右侧边缘向左滑动，或点击右上角的菜单图标即可打开抽屉。
            </Text>
          </View>
          <View style={[styles.helpItem, { backgroundColor: colors.surface }]}>
            <Text style={[styles.helpQuestion, { color: colors.text }]}>如何自定义抽屉内容？</Text>
            <Text style={[styles.helpAnswer, { color: colors.textSecondary }]}>
              使用 drawerContent 属性传入自定义组件，可以完全控制抽屉的外观和行为。
            </Text>
          </View>
          <View style={[styles.helpItem, { backgroundColor: colors.surface }]}>
            <Text style={[styles.helpQuestion, { color: colors.text }]}>支持哪些手势？</Text>
            <Text style={[styles.helpAnswer, { color: colors.textSecondary }]}>
              支持从右边缘滑动打开、点击遮罩关闭、滑动关闭等手势操作。
            </Text>
          </View>
        </View>
        <View style={[styles.contactCard, { backgroundColor: '#F3E5F5' }]}>
          <Text style={[styles.contactTitle, { color: '#7B1FA2' }]}>需要更多帮助？</Text>
          <Text style={[styles.contactText, { color: '#6A1B9A' }]}>
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
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
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
    marginLeft: 12,
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginTop: 20,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    lineHeight: 22,
  },
  profileCard: {
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
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
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
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  settingsList: {
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
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValue: {
    fontSize: 16,
  },
  notificationsList: {
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
    marginBottom: 4,
  },
  notificationText: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
  },
  helpSection: {
    marginBottom: 20,
  },
  helpSectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
  },
  helpItem: {
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
    marginBottom: 8,
  },
  helpAnswer: {
    fontSize: 14,
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
  // 主题设置样式
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
    paddingHorizontal: 4,
  },
  themeOptionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 16,
  },
  themeOption: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  themePreview: {
    height: 100,
    overflow: 'hidden',
  },
  themePreviewContent: {
    padding: 8,
  },
  themePreviewHalf: {
    flex: 1,
    padding: 8,
  },
  themePreviewBar: {
    height: 8,
    borderRadius: 4,
    marginBottom: 6,
  },
  themePreviewText: {
    height: 4,
    borderRadius: 2,
    marginBottom: 4,
    width: '80%',
  },
  themeOptionLabel: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    paddingVertical: 12,
  },
  checkmark: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
