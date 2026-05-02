import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import Svg, { Path, Circle } from 'react-native-svg';

// SVG Icon Components
const BellIcon = ({ color = '#2196F3' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const HeartIcon = ({ color = '#E91E63' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const MessageIcon = ({ color = '#4CAF50' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const UserIcon = ({ color = '#9C27B0' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle
      cx="12"
      cy="7"
      r="4"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

const DownloadIcon = ({ color = '#FF9800' }) => (
  <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
    <Path
      d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);

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
