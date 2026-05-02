import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { InfoIcon, DrawerIcon } from '../components/icons';

function SettingsScreen() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <InfoIcon color="#007AFF" size={64} />
        </View>
        <Text style={styles.title}>关于应用</Text>
        <Text style={styles.subtitle}>React Native Navigation 示例</Text>

        {/* App Info Card */}
        <View style={styles.infoCard}>
          <Text style={styles.cardTitle}>应用信息</Text>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>版本号</Text>
            <Text style={styles.infoValue}>1.0.0</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>构建号</Text>
            <Text style={styles.infoValue}>2024.05.02</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>React Native</Text>
            <Text style={styles.infoValue}>0.85.2</Text>
          </View>
        </View>

        {/* Features Card */}
        <View style={styles.featuresCard}>
          <View style={styles.cardHeader}>
            <DrawerIcon color="#34C759" size={32} />
            <Text style={styles.cardTitle}>导航功能</Text>
          </View>
          <Text style={styles.cardDescription}>
            本应用展示了 React Navigation 的多种导航模式：
          </Text>
          <View style={styles.featuresList}>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Bottom Tab Navigator - 底部标签导航</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Material Top Tabs - 顶部标签导航</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Stack Navigator - 堆栈导航</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureBullet}>✓</Text>
              <Text style={styles.featureText}>Drawer Navigator - 抽屉导航（当前）</Text>
            </View>
          </View>
        </View>

        {/* Tech Stack Card */}
        <View style={styles.techCard}>
          <Text style={styles.cardTitle}>技术栈</Text>
          <View style={styles.techList}>
            <View style={styles.techItem}>
              <Text style={styles.techName}>React Navigation</Text>
              <Text style={styles.techVersion}>v7.x</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techName}>React Native Reanimated</Text>
              <Text style={styles.techVersion}>v4.3.0</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techName}>React Native Gesture Handler</Text>
              <Text style={styles.techVersion}>v2.31.1</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techName}>React Native SVG</Text>
              <Text style={styles.techVersion}>v15.15.4</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techName}>Jotai</Text>
              <Text style={styles.techVersion}>v2.19.1</Text>
            </View>
            <View style={styles.techItem}>
              <Text style={styles.techName}>Axios</Text>
              <Text style={styles.techVersion}>v1.15.2</Text>
            </View>
          </View>
        </View>

        {/* Usage Tip Card */}
        <View style={styles.tipCard}>
          <Text style={styles.tipTitle}>使用提示</Text>
          <Text style={styles.tipText}>
            您现在正在使用 Drawer Navigator（抽屉导航）。{'\n\n'}
            • 从右侧边缘向左滑动可以打开抽屉菜单{'\n'}
            • 点击右上角的菜单图标也可以打开抽屉{'\n'}
            • 在抽屉中可以快速切换不同的页面{'\n'}
            • 抽屉包含用户信息、主要功能和设置选项
          </Text>
        </View>

        {/* Copyright */}
        <View style={styles.copyright}>
          <Text style={styles.copyrightText}>© 2024 React Native Demo</Text>
          <Text style={styles.copyrightText}>Made with ❤️ using React Native</Text>
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
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 24,
  },
  infoCard: {
    backgroundColor: '#fff',
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
    color: '#333',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  featuresCard: {
    backgroundColor: '#fff',
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
    color: '#666',
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
    color: '#34C759',
    marginRight: 12,
    fontWeight: 'bold',
  },
  featureText: {
    fontSize: 15,
    color: '#666',
    flex: 1,
  },
  techCard: {
    backgroundColor: '#fff',
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
    borderBottomColor: '#f0f0f0',
  },
  techName: {
    fontSize: 15,
    color: '#333',
  },
  techVersion: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  tipCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  tipTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1976D2',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 14,
    color: '#1565C0',
    lineHeight: 22,
  },
  copyright: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  copyrightText: {
    fontSize: 12,
    color: '#999',
    marginBottom: 4,
  },
});

export default SettingsScreen;
