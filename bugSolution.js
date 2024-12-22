The solution involves using the `onCameraReady` callback or checking the `isAvailable` prop of the Camera component. The example below uses `onCameraReady` to ensure the camera is ready before calling `takePictureAsync`:
```javascript
import * as React from 'react';
import { Camera, CameraType } from 'expo-camera';
import { useState, useEffect } from 'react';

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const [type, setType] = useState(CameraType.back);
  const [camera, setCamera] = useState(null);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  const takePicture = async () => {
    if (camera) {
      try {
        let photo = await camera.takePictureAsync({
          base64: true,
        });
        console.log(photo);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  };

  if (hasPermission === null) {
    return <View />; // Loading indicator
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{
      flex: 1,
    }}>
      <Camera style={{ flex: 1 }} type={type} ref={(ref) => setCamera(ref)} onCameraReady={()=> console.log('camera ready')}>
        <View
          style={{
            flex: 1,
            backgroundColor: 'transparent',
            flexDirection: 'row',
          }}>
          <TouchableOpacity style={{ flex: 0.1, alignSelf: 'flex-end' }}
            onPress={() => {
              setType(
                type === CameraType.back ? CameraType.front : CameraType.back
              );
            }}>
            <Text
              style={{
                fontSize: 18,
                marginBottom: 10,
                color: 'white',
              }}>
              {
                type === CameraType.back ? 'Switch to Front Camera' : 'Switch to Back Camera'
              }
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              backgroundColor: 'white',
              borderRadius: 10,
            }}
            onPress={takePicture}>
            <Text style={{ color: 'black', padding: 10 }}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
};
export default CameraScreen;
```