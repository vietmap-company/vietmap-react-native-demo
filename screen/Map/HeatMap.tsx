import VietmapGL from "@vietmap/vietmap-gl-react-native";
import { vietmapSatelliteStyle, vietmapStyle } from "../../vietmap_config";

function Heatmap() {
    return ( 
        <VietmapGL.MapView style={{flex:1}}
        styleURL={vietmapStyle}>
          <VietmapGL.Camera
            zoomLevel={3}
            centerCoordinate={[106.34255, 10.543298]}
          />
          <VietmapGL.ShapeSource
            id="earthquakes"
            url="https://www.mapbox.com/mapbox-gl-js/assets/earthquakes.geojson">
            <VietmapGL.HeatmapLayer
              id="earthquakes"
              sourceID="earthquakes"
              style={{
                heatmapColor: [
                  'interpolate',
                  ['linear'],
                  ['heatmap-density'],
                  0,
                  'rgba(33,102,172,0)',
                  0.2,
                  'rgb(103,169,207)',
                  0.4,
                  'rgb(209,229,240)',
                  0.6,
                  'rgb(253,219,199)',
                  0.8,
                  'rgb(239,138,98)',
                  1,
                  'rgb(178,24,43)',
                ],
              }}
            />
          </VietmapGL.ShapeSource>
        </VietmapGL.MapView> 
    );
  }
  
  export default Heatmap;
  