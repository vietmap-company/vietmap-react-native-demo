
import {Overlay, ListItem, FAB, Icon} from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import moment from 'moment';
import VietmapGL from '@vietmap/vietmap-gl-react-native';
import { vietmapStyle } from '../../vietmap_config';

import earthQuakesJSON from '../../assets/earthquakes.json';
import React from 'react';
const layerStyles = {
    singlePoint: {
      circleColor: 'green',
      circleOpacity: 0.84,
      circleStrokeWidth: 2,
      circleStrokeColor: 'white',
      circleRadius: 5,
      circlePitchAlignment: 'map',
    },
  
    clusteredPoints: {
      circlePitchAlignment: 'map',
  
      circleColor: [
        'step',
        ['get', 'point_count'],
        '#07F538',
        20,
        '#D6F507',
        50,
        '#F77228',
        100,
        '#F43E1D',
        150,
        '#F5071C',
      ],
  
      circleRadius: ['step', ['get', 'point_count'], 20, 100, 30, 750, 40],
      circleOpacity: 0.84,
      circleStrokeWidth: 2,
      circleStrokeColor: 'white',
    },
  
    clusterCount: {
      textField: [
        'format',
        ['concat', ['get', 'point_count'], '\n'],
        {},
        [
          'concat',
          '>1: ',
          [
            '+',
            ['get', 'mag2'],
            ['get', 'mag3'],
            ['get', 'mag4'],
            ['get', 'mag5'],
          ],
        ],
        {'font-scale': 0.8},
      ],
      textSize: 12,
      textPitchAlignment: 'map',
    },
  }

const styles = {
    fab: {
      position: 'absolute',
      top: 10,
      right: 10,
      elevation: 9999,
      zIndex: 9999,
    },
  };
  
  const mag1 = ['<', ['get', 'mag'], 2];
  const mag2 = ['all', ['>=', ['get', 'mag'], 2], ['<', ['get', 'mag'], 3]];
  const mag3 = ['all', ['>=', ['get', 'mag'], 3], ['<', ['get', 'mag'], 4]];
  const mag4 = ['all', ['>=', ['get', 'mag'], 4], ['<', ['get', 'mag'], 5]];
  const mag5 = ['>=', ['get', 'mag'], 5];
  
  interface ClusterAnnotationState {
    selectedCluster: any; 
  }
   
  
  class ClusterAnnotation extends React.Component<{}, ClusterAnnotationState, any>{
    state = {
        selectedCluster: null
    }

    // FeatureCollection<Geometry | GeometryCollection, Properties> | undefined
    shape:VietmapGL.ShapeSource | null = null
    render(): React.ReactNode {
        return (<>
        
        <Overlay isVisible={!!this.state.selectedCluster} fullScreen>
            <FAB
            
            onPress={() => {
                this.setState({selectedCluster: null});
              }}
              icon={<Icon name="close" />}
              size="large"
              style={styles.fab}
            />

          {this.state.selectedCluster && (
            <FlatList
              keyExtractor={({properties: earthquakeInfo}) => {
                return earthquakeInfo.code;
              }}
              data={this.state.selectedCluster?.features}
              renderItem={({item: {properties: earthquakeInfo}}) => {
                const magnitude = `Magnitude: ${earthquakeInfo.mag}`;
                const place = `Place: ${earthquakeInfo.place}`;
                const code = `Code: ${earthquakeInfo.code}`;
                const time = `Time: ${moment(earthquakeInfo.time).format(
                  'MMMM Do YYYY, h:mm:ss a',
                )}`;

                return (
                  <ListItem bottomDivider>
                    <ListItem.Content>
                      <ListItem.Title>{earthquakeInfo.title}</ListItem.Title>
                      <ListItem.Subtitle>{magnitude}</ListItem.Subtitle>
                      <ListItem.Subtitle>{place}</ListItem.Subtitle>
                      <ListItem.Subtitle>{code}</ListItem.Subtitle>
                      <ListItem.Subtitle>{time}</ListItem.Subtitle>
                    </ListItem.Content>
                  </ListItem>
                );
              }}
            />
          )}
            
            </Overlay>
            
            
          <VietmapGL.MapView
            style={{flex:1}}
            styleURL={vietmapStyle}>
            <VietmapGL.Camera
              zoomLevel={6}
              pitch={45}
              centerCoordinate={[106.400021, 10.789085]}
            />

            <VietmapGL.ShapeSource
              id="earthquakes"
              onPress={async shape => {
                const cluster = shape.features[0];
                const collection = await this.shape?.getClusterLeaves(
                  cluster,
                  999,
                  0,
                );

                this.setState({selectedCluster: collection});
              }}
              ref={shape => (this.shape = shape)}
              cluster
              clusterRadius={50}
              maxZoomLevel={14}
              clusterProperties={{
                mag1: [
                  ['+', ['accumulated'], ['get', 'mag1']],
                  ['case', mag1, 1, 0],
                ],
                mag2: [
                  ['+', ['accumulated'], ['get', 'mag2']],
                  ['case', mag2, 1, 0],
                ],
                mag3: [
                  ['+', ['accumulated'], ['get', 'mag3']],
                  ['case', mag3, 1, 0],
                ],
                mag4: [
                  ['+', ['accumulated'], ['get', 'mag4']],
                  ['case', mag4, 1, 0],
                ],
                mag5: [
                  ['+', ['accumulated'], ['get', 'mag5']],
                  ['case', mag5, 1, 0],
                ],
              }}
              shape={earthQuakesJSON}>
              <VietmapGL.SymbolLayer
                id="pointCount"
                style={layerStyles.clusterCount}
              />

              <VietmapGL.CircleLayer
                id="clusteredPoints"
                belowLayerID="pointCount"
                filter={['has', 'point_count']}
                style={layerStyles.clusteredPoints}
              />

              <VietmapGL.CircleLayer
                id="singlePoint"
                filter={['!', ['has', 'point_count']]}
                style={layerStyles.singlePoint}
              />
            </VietmapGL.ShapeSource>
          </VietmapGL.MapView>
            </>)
    }
  }

  export default ClusterAnnotation