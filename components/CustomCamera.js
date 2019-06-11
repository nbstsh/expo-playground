import React, { useState, useEffect } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

const CustomCamera = () => {
	const [hasCameraPermission, setCameraPermission] = useState(false);
	const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

	const launchCustomCameraAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		if (status !== 'granted') {
			console.error('Camera Permission not granted!!!');
			return;
		}

		setCameraPermission(true);
	};

	useEffect(() => {
		launchCustomCameraAsync();
	}, []);

	return (
		<View>
			<Text>Custom Camera</Text>
			{hasCameraPermission && (
				<>
					<TouchableHighlight
						onPress={() => {
							console.log(cameraType);
							setCameraType(
								cameraType === Camera.Constants.Type.back
									? Camera.Constants.Type.front
									: Camera.Constants.Type.back
							);
						}}
					>
						<Text>
							{cameraType === Camera.Constants.Type.back
								? 'back'
								: 'front'}
						</Text>
					</TouchableHighlight>
					<Camera
						style={{ width: 400, height: 400 }}
						type={cameraType}
					/>
				</>
			)}
		</View>
	);
};

export default CustomCamera;
