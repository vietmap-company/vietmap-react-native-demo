import { Camera, MapView } from "@vietmap/vietmap-gl-react-native";
import React from "react";

import { sheet } from "../../styles/sheet";

export function CompassView() {
  return (
    <MapView
      style={sheet.matchParent}
      compassEnabled
      logoEnabled={false}
      compassViewPosition={2}
    >
      <Camera heading={21} />
    </MapView>
  );
}
