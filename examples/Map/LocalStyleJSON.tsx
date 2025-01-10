import { MapView } from "@vietmap/vietmap-gl-react-native";
import { useState } from "react";
import { Text } from "react-native";

import MapDemoTilesBlue from "../../assets/styles/maplibre-demo-tiles-blue.json";
import MapDemoTilesWhite from "../../assets/styles/maplibre-demo-tiles-white.json";
import { Bubble } from "../../components/Bubble";
import { sheet } from "../../styles/sheet";

export function LocalStyleJSON() {
  const [color, setColor] = useState<"blue" | "white">("blue");

  return (
    <>
      <MapView
        style={sheet.matchParent}
        mapStyle={
          { blue: MapDemoTilesBlue, white: MapDemoTilesWhite }[color]
        }
      />
      <Bubble
        onPress={() =>
          setColor((prevState) => {
            return ({ blue: "white", white: "blue" } as const)[prevState];
          })
        }
      >
        <Text>Switch Style JSON</Text>
      </Bubble>
    </>
  );
}
