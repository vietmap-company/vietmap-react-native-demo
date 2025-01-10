import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import * as VietMapExamples from "./examples/index";
import { sheet } from "./styles/sheet";

const styles = StyleSheet.create({
  exampleListItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 32,
  },
  exampleListItemBorder: {
    borderBottomColor: "#cccccc",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  exampleListLabel: {
    fontSize: 18,
  },
});

class ExampleItem {
  label: string;
  Component: any;

  constructor(label: string, Component: any) {
    this.label = label;
    this.Component = Component;
  }
}

class ExampleGroup {
  root: boolean;
  label: string;
  items: (ExampleGroup | ExampleItem)[];

  constructor(
    label: string,
    items: (ExampleGroup | ExampleItem)[],
    root = false,
  ) {
    this.root = root;
    this.label = label;
    this.items = items;
  }
}

const Examples = new ExampleGroup(
  "VietMap GL React Native",
  [
    new ExampleItem("Bug Report", VietMapExamples.BugReport),
    new ExampleGroup("Map", [
      new ExampleItem("Show Map", VietMapExamples.ShowMap),
      new ExampleItem("Local Style from JSON", VietMapExamples.LocalStyleJSON),
      new ExampleItem("Show Click", VietMapExamples.ShowClick),
      new ExampleItem(
        "Show Region did Change",
        VietMapExamples.ShowRegionDidChange,
      ),
      new ExampleItem("Two Map Views", VietMapExamples.TwoMapViews),
      new ExampleItem(
        "Create Offline Region",
        VietMapExamples.CreateOfflineRegion,
      ),
      new ExampleItem(
        "Get Pixel Point in MapView",
        VietMapExamples.PointInMapView,
      ),
      new ExampleItem(
        "Show and hide a layer",
        VietMapExamples.ShowAndHideLayer,
      ),
      new ExampleItem("Change Layer Color", VietMapExamples.ChangeLayerColor),
      new ExampleItem(
        "Source Layer Visiblity",
        VietMapExamples.SourceLayerVisibility,
      ),
      new ExampleItem("Set Tint Color", VietMapExamples.SetTintColor),
    ]),
    new ExampleGroup("Camera", [
      new ExampleItem(
        "Fit (Bounds, Center/Zoom, Padding)",
        VietMapExamples.Fit,
      ),
      new ExampleItem("Set Pitch", VietMapExamples.SetPitch),
      new ExampleItem("Set Heading", VietMapExamples.SetHeading),
      new ExampleItem("Fly To", VietMapExamples.FlyTo),
      new ExampleItem("Restrict Bounds", VietMapExamples.RestrictMapBounds),
      new ExampleItem("Yo-yo Camera", VietMapExamples.YoYo),
      new ExampleItem(
        "Take Snapshot Without Map",
        VietMapExamples.TakeSnapshot,
      ),
      new ExampleItem(
        "Take Snapshot With Map",
        VietMapExamples.TakeSnapshotWithMap,
      ),
      new ExampleItem("Get current Zoom", VietMapExamples.GetZoom),
      new ExampleItem("Get Center", VietMapExamples.GetCenter),
      new ExampleItem("Compass View", VietMapExamples.CompassView),
    ]),

    new ExampleGroup("User Location", [
      new ExampleItem(
        "Follow User Location Alignment",
        VietMapExamples.FollowUserLocationAlignment,
      ),
      new ExampleItem(
        "Follow User Location Render Mode",
        VietMapExamples.FollowUserLocationRenderMode,
      ),
      new ExampleItem(
        "User Location for Navigation",
        VietMapExamples.UserLocationForNavigation,
      ),
      new ExampleItem(
        "User Location Updates",
        VietMapExamples.UserLocationUpdate,
      ),
      new ExampleItem(
        "User Location Displacement",
        VietMapExamples.UserLocationDisplacement,
      ),

      new ExampleItem(
        "Set preferred Frames per Second\n(Android only)",
        VietMapExamples.SetAndroidPreferredFramesPerSecond,
      ),
    ]),

    new ExampleGroup("Symbol/CircleLayer", [
      new ExampleItem("Custom Icon", VietMapExamples.CustomIcon),
      new ExampleItem("Clustering Earthquakes", VietMapExamples.Earthquakes),
      new ExampleItem(
        "Icon from Shape Source",
        VietMapExamples.ShapeSourceIcon,
      ),
      new ExampleItem(
        "Data-driven Circle Colors",
        VietMapExamples.DataDrivenCircleColors,
      ),
    ]),
    new ExampleGroup("Fill/RasterLayer", [
      new ExampleItem("GeoJSON Source", VietMapExamples.GeoJSONSource),
      new ExampleItem(
        "OpenStreetMap Raster Tiles",
        VietMapExamples.OpenStreetMapRasterTiles,
      ),
      new ExampleItem("Indoor Building Map", VietMapExamples.IndoorBuilding),
      new ExampleItem("Query Feature Point", VietMapExamples.QueryAtPoint),
      new ExampleItem(
        "Query Features Bounding Box",
        VietMapExamples.QueryWithRect,
      ),
      new ExampleItem(
        "Custom Vector Source",
        VietMapExamples.CustomVectorSource,
      ),
      new ExampleItem("Image Overlay", VietMapExamples.ImageOverlay),
    ]),
    new ExampleGroup("LineLayer", [
      new ExampleItem("Gradient Line", VietMapExamples.GradientLine),
    ]),
    new ExampleGroup("Annotations", [
      new ExampleItem(
        "Show Point Annotation",
        VietMapExamples.ShowPointAnnotation,
      ),
      new ExampleItem(
        "Point Annotation Anchors",
        VietMapExamples.PointAnnotationAnchors,
      ),
      new ExampleItem("Marker View", VietMapExamples.MarkerView),
      new ExampleItem("Heatmap", VietMapExamples.Heatmap),
      new ExampleItem("Custom Callout", VietMapExamples.CustomCallout),
    ]),
    new ExampleGroup("Animations", [
      new ExampleItem("Animated Line", VietMapExamples.AnimatedLine),
      new ExampleItem(
        "Animate Circle along Line",
        VietMapExamples.AnimateCircleAlongLine,
      ),
    ]),
    new ExampleItem("Cache Management", VietMapExamples.CacheManagement),
  ],
  true,
);

function FlatMapExamples(
  example: ExampleGroup | ExampleItem,
  flattenedExamples: (ExampleGroup | ExampleItem)[] = [],
): (ExampleGroup | ExampleItem)[] {
  if (example instanceof ExampleGroup) {
    return [
      ...flattenedExamples,
      ...example.items.flatMap((example) => FlatMapExamples(example)),
      example,
    ];
  }

  return [...flattenedExamples, example];
}

const FlatExamples = FlatMapExamples(Examples);

interface ExampleListProps {
  navigation: any;
  route: any;
}

function ExampleList({ route, navigation }: ExampleListProps) {
  const { name } = route;
  const example =
    FlatExamples.find((examples) => examples.label === name) || Examples;

  function itemPress(item: any) {
    navigation.navigate(item.label);
  }

  function renderItem({ item }: { item: any }) {
    return (
      <View style={styles.exampleListItemBorder}>
        <TouchableOpacity onPress={() => itemPress(item)}>
          <View style={styles.exampleListItem}>
            <Text style={styles.exampleListLabel}>{item.label}</Text>
            <Text style={{ fontSize: 24 }}>›</Text>
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={sheet.matchParent}>
      <View style={sheet.matchParent}>
        <FlatList
          style={sheet.matchParent}
          data={example instanceof ExampleGroup ? example.items : []}
          keyExtractor={(item) => item.label}
          renderItem={renderItem}
        />
      </View>
    </View>
  );
}

function buildNavigationScreens(example: any, Stack: any) {
  if (example instanceof ExampleGroup) {
    return (
      <Stack.Screen
        key={example.label}
        name={example.label}
        component={ExampleList}
      />
    );
  }
  return (
    <Stack.Screen
      key={example.label}
      name={example.label}
      component={example.Component}
    />
  );
}

export function Home() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: {
          ...DefaultTheme.colors,
          card: "#295daa",
          primary: "#ffffff",
          background: "#ffffff",
          text: "#ffffff",
        },
      }}
    >
      <Stack.Navigator initialRouteName={Examples.label}>
        {FlatExamples.map((example) => buildNavigationScreens(example, Stack))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
