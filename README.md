This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
# Introduce
### This project contains some examples of what you can build with Vietmap React-Native SDK. Some features will built into this project are showing a simple map, adding a marker, line, and shape (polygon), and changing the map style programmatically.
# Configuration
- Create `vietmap_config.tsx` file in the root folder
- In this file, copy and paste the below code to run the project
```tsx
export const vietmapAPIKey = 'YOUR_API_KEY_HERE';

export const vietmapStyle = `https://maps.vietmap.vn/api/maps/light/styles.json?apikey=${ vietmapAPIKey }`;
export const vietmapRasterStyle = `https://maps.vietmap.vn/api/maps/raster/styles.json?apikey=${ vietmapAPIKey }`;
export const vietmapSatelliteStyle = `https://maps.vietmap.vn/api/maps/satellite/styles.json?apikey=${ vietmapAPIKey }`;

```
- Replace your `YOUR_API_KEY_HERE` with `your Vietmap API key` and follow the below guide to run the project
# Vietmap documentation
We've created the documentation for all of `vietmap-gl-react-native` package features [here](https://github.com/vietmap-company/vietmap-gl-react-native)

If you're using `Expo project`, follow this guide [documentation](https://github.com/vietmap-company/react-native-expo-demo) to set up and run project with `vietmap-gl-react-native` package
# Getting Started

>**Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

## Step 1: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash 
# OR using Yarn
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
# OR using Yarn
yarn android
```

### For iOS

```bash
# OR using Yarn
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Step 3: Modifying your App

Now that you have successfully run the app, let's modify it.

1. Open `App.tsx` in your text editor of choice and edit some lines.
2. For **Android**: Press the <kbd>R</kbd> key twice or select **"Reload"** from the **Developer Menu** (<kbd>Ctrl</kbd> + <kbd>M</kbd> (on Window and Linux) or <kbd>Cmd ⌘</kbd> + <kbd>M</kbd> (on macOS)) to see your changes!

   For **iOS**: Hit <kbd>Cmd ⌘</kbd> + <kbd>R</kbd> in your iOS Simulator to reload the app and see your changes!

## Congratulations! :tada:

You've successfully run and modified your React Native App. :partying_face:
 

