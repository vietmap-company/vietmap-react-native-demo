This is a new [**React Native**](https://reactnative.dev) project, bootstrapped using [`@react-native-community/cli`](https://github.com/react-native-community/cli).
# Introduce
### This project contains some examples of what you can build with Vietmap React-Native SDK. Some features will built into this project are showing a simple map, adding a marker, line, and shape (polygon), turn by turn navigation and changing the map style programmatically.
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
# Navigation configuration

- Add below code to `Info.plist` file.
```plist
	<key>VietMapAPIBaseURL</key>
	<string>https://maps.vietmap.vn/api/navigations/route/</string>
	<key>VietMapAccessToken</key>
	<string>YOUR_API_KEY_HERE</string>
	<key>VietMapURL</key>
	<string>https://maps.vietmap.vn/api/maps/light/styles.json?apikey=YOUR_API_KEY_HERE</string>
```

# Vietmap documentation
We've created the documentation for all of `vietmap-gl-react-native` package features [here](https://github.com/vietmap-company/vietmap-gl-react-native)

If you're using `Expo project`, follow this guide [documentation](https://github.com/vietmap-company/react-native-expo-demo) to set up and run project with `vietmap-gl-react-native` package 

