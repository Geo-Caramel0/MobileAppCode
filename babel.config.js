module.exports = function (api) {
  api.cache(true);
  const presets = ["babel-preset-expo"];
  return {
    presets,
    plugins: ["react-native-reanimated/plugin"],
    //presets: ["babel-preset-expo"],
    //plugins: ["expo-router/babel"],
    //plugins: ["react-native-reanimated/plugin"],
  };
};
