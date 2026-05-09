module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // Give each plugin a unique name to avoid conflicts
    ['react-native-reanimated/plugin', {}, 'reanimated-plugin'],
    ['react-native-worklets/plugin', {}, 'worklets-plugin'],
  ],
};
