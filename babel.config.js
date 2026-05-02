module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    // react-native-worklets/plugin 必须放在最后
    'react-native-worklets/plugin',
  ],
};
