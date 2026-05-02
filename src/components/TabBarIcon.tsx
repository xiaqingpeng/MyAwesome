import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface TabBarIconProps {
  icon: string;
  color: string;
  size?: number;
  focused?: boolean;
}

export function TabBarIcon({ icon, color, size = 28, focused }: TabBarIconProps) {
  return (
    <View style={styles.container}>
      <Text
        style={[
          styles.icon,
          {
            fontSize: size,
            opacity: focused ? 1 : 0.6,
          },
        ]}
      >
        {icon}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
  },
  icon: {
    textAlign: 'center',
  },
});
