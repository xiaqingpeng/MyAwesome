import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAtom } from 'jotai';
import { themeColorsAtom } from '../store/themeAtoms';

function FeedScreen() {
  const [colors] = useAtom(themeColorsAtom);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Feed</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Latest updates and posts</Text>
        
        {[1, 2, 3, 4, 5].map((item) => (
          <View key={item} style={[styles.card, { backgroundColor: colors.surface }]}>
            <Text style={[styles.cardTitle, { color: colors.text }]}>Post {item}</Text>
            <Text style={[styles.cardText, { color: colors.textSecondary }]}>
              This is a sample post content. Swipe left or right to see other tabs.
            </Text>
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
  card: {
    padding: 16,
    borderRadius: 8,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    lineHeight: 20,
  },
});

export default FeedScreen;
