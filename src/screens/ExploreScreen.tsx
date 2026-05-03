import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAtom } from 'jotai';
import { themeColorsAtom } from '../store/themeAtoms';

function ExploreScreen() {
  const [colors] = useAtom(themeColorsAtom);

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.content}>
        <Text style={[styles.title, { color: colors.text }]}>Explore</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>Discover new content</Text>
        
        <View style={styles.grid}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <View key={item} style={[styles.gridItem, { backgroundColor: colors.surface }]}>
              <Text style={[styles.gridItemText, { color: colors.textSecondary }]}>Item {item}</Text>
            </View>
          ))}
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridItem: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 8,
    marginBottom: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  gridItemText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default ExploreScreen;
