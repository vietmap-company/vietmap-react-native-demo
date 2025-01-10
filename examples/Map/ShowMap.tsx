import { MapView } from "@vietmap/vietmap-gl-react-native";

import { sheet } from "../../styles/sheet";
import {vietmapStyle} from "../../vietmap_config";
export function ShowMap() {
  return <MapView style={sheet.matchParent}
  mapStyle={vietmapStyle}
   />;
}
