import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAtom } from 'jotai';
import { themeColorsAtom } from '../store/themeAtoms';
import { InfoIcon, DrawerIcon } from '../components/icons';

function SettingsScreen() {
  const [colors] = useAtom(themeColorsAtom);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <InfoIcon color={colors.primary} size={64} />
        </View>
        <Text style={[styles.title, { color: colors.text }]}>关于应用</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>React Native Navigation 示例</Text>

        {/* App Info Card */}
        <View style={[styles.infoCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>应用信息</Text>
          <View style={[styles.infoRow, { borderBottomColor: colors.separator }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>版本号</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>1.0.0</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: colors.separator }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>构建号</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>2024.05.02</Text>
          </View>
          <View style={[styles.infoRow, { borderBottomColor: 'transparent' }]}>
            <Text style={[styles.infoLabel, { color: colors.textSecondary }]}>React Native</Text>
            <Text style={[styles.infoValue, { color: colors.text }]}>0.85.2</Text>
          </View>
        </View>

        {/* Features Card */}
        <View style={[styles.featuresCard, { backgroundColor: colors.surface }]}>
          <View style={styles.cardHeader}>
            <DrawerIcon color={colors.success} size={32} />
            <Text style={[styles.cardTitle, { color: colors.text }]}>导航功能</Text>
          </View>
          <Text style={[styles.cardDescription, { color: colors.textSecondary }]}>
            本应用展示了 React Navigation 的多种导航模式：
          </Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={[styles.featureBullet, { color: colors.success }]}>✓</Text>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Bottom Tab Navigator - 底部标签导航</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={[styles.featureBullet, { color: colors.success }]}>✓</Text>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Material Top Tabs - 顶部标签导航</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={[styles.featureBullet, { color: colors.success }]}>✓</Text>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Stack Navigator - 堆栈导航</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={[styles.featureBullet, { color: colors.success }]}>✓</Text>
              <Text style={[styles.featureText, { color: colors.textSecondary }]}>Drawer Navigator - 抽屉导航（当前）</Text>
            </View>
          </View>
        </View>

        {/* Tech Stack Card */}
        <View style={[styles.techCard, { backgroundColor: colors.surface }]}>
          <Text style={[styles.cardTitle, { color: colors.text }]}>技术栈</Text>
          <View style={styles.techList}>
            <View style={[styles.techItem, { borderBottomColor: colors.separator }]}>
              <Text style={[styles.techName, { color: colors.text }]}>React Navigation</Text>
              <Text style={[styles.techVersion, { color: colors.primary }]}>v7.x</Text>
            </View>
            <View style={[styles.techItem, { borderBottomColor: colors.separator }]}>
              <Text style={[styles.techName, { color: colors.text }]}>React Native Reanimated</Text>
              <Text style={[styles.techVersion, { color: colors.primary }]}>v4.3.0</Text>
            </View>
            <View style={[styles.techItem, { borderBottomColor: colors.separator }]}>
              <Text style={[styles.techName, { color: colors.text }]}>React Native Gesture Handler</Text>
              <Text style={[styles.techVersion, { color: colors.primary }]}>v2.31.1</Text>
            </View>
            <View style={[styles.techItem, { borderBottomColor: colors.separator }]}>
              <Text style={[styles.techName, { color: colors.text }]}>React Native SVG</Text>
              <Text style={[styles.techVersion, { color: colors.primary }]}>v15.15.4</Text>
            </View>
            <View style={[styles.techItem, { borderBottomColor: colors.separator }]}>
              <Text style={[styles.techName, { color: colors.text }]}>Jotai</Text>
              <Text style={[styles.techVersion, { color: colors.primary }]}>v2.19.1</Text>
            </View>
            <View style={[styles.techItem, { borderBottomColor: 'transparent' }]}>
              <Text style={[styles.techName, { color: colors.text }]}>Axios</Text>
              <Text style={[styles.techVersion, { color: colors.primary }]}>v1.15.2</Text>
            </View>
          </View>
        </View>

        {/* Usage Tip Card */}
        <View style={[styles.tipCard, { backgroundColor: colors.primary + '20' }]}>
          <Text style={[styles.tipTitle, { color: colors.primary }]}>使用提示</Text>
          <Text style={[styles.tipText, { color: colors.primary }]}>
            您现在正在使用 Drawer Navigator（抽屉导航）。{'\n\n'}
            • 从右侧边缘向左滑动可以打开抽屉菜单{'\n'}
            • 点击右上角的菜单图标也可以打开抽屉{'\n'}
            • 在抽屉中可以快速切换不同的页面{'\n'}
            • 抽屉包含用户信息、主要功能和设置选项
          </Text>
        </View>

        {/* Copyright */}
        <View style={styles.copyright}>
          <Text style={[styles.copyrightText, { color: colors.textTertiary }]}>© 2024 React Native Demo</Text>
          <Text style={[styles.copyrightText, { color: colors.textTertiary }]}>Made with ❤️ using React Native</Text>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  infoCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  infoLabel: {
    fontSize: 16,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  featuresCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardDescription: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  featuresList: {
    marginTop: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureBullet: {
    fontSize: 18,
    marginRight: 12,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 15,
    flex: 1,
  },
  techCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  techList: {
    marginTop: 8,
  },
  techItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  techName: {
    fontSize: 15,
  },
  techVersion: {
    fontSize: 14,
    fontWeight: '600',
  },
  tipCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    lineHeight: 22,
  },
  copyright: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  copyrightText: {
    fontSize: 12,
    marginBottom: 4,
  },
});

export default SettingsScreen;
