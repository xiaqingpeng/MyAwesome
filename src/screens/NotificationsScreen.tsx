import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAtom } from 'jotai';
import { themeColorsAtom } from '../store/themeAtoms';
import {
  BellIcon,
  HeartIcon,
  MessageIcon,
  UserIcon,
  DownloadIcon,
} from '../components/icons';

type NotificationType = 'follower' | 'like' | 'comment' | 'message' | 'update';

interface Notification {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
}

function NotificationsScreen() {
  const [colors] = useAtom(themeColorsAtom);

  const notifications: Notification[] = [
    { id: 1, type: 'follower', title: 'New follower', message: 'John started following you', time: '2m ago' },
    { id: 2, type: 'like', title: 'New like', message: 'Sarah liked your post', time: '15m ago' },
    { id: 3, type: 'comment', title: 'New comment', message: 'Mike commented on your photo', time: '1h ago' },
    { id: 4, type: 'message', title: 'New message', message: 'You have a new message from Emma', time: '2h ago' },
    { id: 5, type: 'update', title: 'Update available', message: 'A new version is available', time: '1d ago' },
  ];

  const getNotificationIcon = (type: NotificationType) => {
    const iconColor = colors.text;
    switch (type) {
      case 'follower':
        return <UserIcon color={iconColor} />;
      case 'like':
        return <HeartIcon color={iconColor} />;
      case 'comment':
        return <MessageIcon color={colors.info} />;
      case 'message':
        return <MessageIcon color={iconColor} />;
      case 'update':
        return <DownloadIcon color={iconColor} />;
      default:
        return <BellIcon color={iconColor} />;
    }
  };

  const getIconBackgroundColor = (type: NotificationType) => {
    switch (type) {
      case 'follower':
        return colors.primary + '20';
      case 'like':
        return colors.error + '20';
      case 'comment':
        return colors.info + '20';
      case 'message':
        return colors.success + '20';
      case 'update':
        return colors.warning + '20';
      default:
        return colors.primary + '20';
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Notifications</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Stay updated with latest activities</Text>
        
        {notifications.map((notification) => (
          <View key={notification.id} style={[styles.notificationCard, { backgroundColor: colors.surface }]}>
            <View style={[
              styles.notificationIcon,
              { backgroundColor: getIconBackgroundColor(notification.type) }
            ]}>
              {getNotificationIcon(notification.type)}
            </View>
            <View style={styles.notificationContent}>
              <Text style={[styles.notificationTitle, { color: colors.text }]}>{notification.title}</Text>
              <Text style={[styles.notificationMessage, { color: colors.textSecondary }]}>{notification.message}</Text>
              <Text style={[styles.notificationTime, { color: colors.textTertiary }]}>{notification.time}</Text>
            </View>
          </View>
        ))}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  notificationCard: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
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
  notificationMessage: {
    fontSize: 14,
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
  },
});

export default NotificationsScreen;
