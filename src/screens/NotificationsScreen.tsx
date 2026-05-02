import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
  const notifications: Notification[] = [
    { id: 1, type: 'follower', title: 'New follower', message: 'John started following you', time: '2m ago' },
    { id: 2, type: 'like', title: 'New like', message: 'Sarah liked your post', time: '15m ago' },
    { id: 3, type: 'comment', title: 'New comment', message: 'Mike commented on your photo', time: '1h ago' },
    { id: 4, type: 'message', title: 'New message', message: 'You have a new message from Emma', time: '2h ago' },
    { id: 5, type: 'update', title: 'Update available', message: 'A new version is available', time: '1d ago' },
  ];

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'follower':
        return <UserIcon />;
      case 'like':
        return <HeartIcon />;
      case 'comment':
        return <MessageIcon color="#2196F3" />;
      case 'message':
        return <MessageIcon />;
      case 'update':
        return <DownloadIcon />;
      default:
        return <BellIcon />;
    }
  };

  const getIconBackgroundColor = (type: NotificationType) => {
    switch (type) {
      case 'follower':
        return '#F3E5F5';
      case 'like':
        return '#FCE4EC';
      case 'comment':
        return '#E3F2FD';
      case 'message':
        return '#E8F5E9';
      case 'update':
        return '#FFF3E0';
      default:
        return '#E3F2FD';
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Notifications</Text>
        <Text style={styles.subtitle}>Stay updated with latest activities</Text>
        
        {notifications.map((notification) => (
          <View key={notification.id} style={styles.notificationCard}>
            <View style={[
              styles.notificationIcon,
              { backgroundColor: getIconBackgroundColor(notification.type) }
            ]}>
              {getNotificationIcon(notification.type)}
            </View>
            <View style={styles.notificationContent}>
              <Text style={styles.notificationTitle}>{notification.title}</Text>
              <Text style={styles.notificationMessage}>{notification.message}</Text>
              <Text style={styles.notificationTime}>{notification.time}</Text>
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
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  notificationCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
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
    color: '#333',
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
});

export default NotificationsScreen;
