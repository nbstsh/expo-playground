import React, { useState } from 'react';
import { View, Text, Image, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';

const PhoneEditor = () => {
	const [chosenImage, setChosenImage] = useState(null);
	const [takenImage, setTakenImage] = useState(null);

	const launchCameraRollAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
		if (status !== 'granted') {
			console.error('Camera roll permission not granted!!!');
			return;
		}
		const img = await ImagePicker.launchImageLibraryAsync();
		console.log(img);
		setChosenImage(img);
	};

	const launchCameraAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		if (status !== 'granted') {
			console.error('Camera permission not granted!!!');
			return;
		}
		const img = await ImagePicker.launchCameraAsync({
			allowsEditing: true
		});
		console.log(img);
		// const flippedImage = await ImageManipulator.manipulateAsync(img.uri, [
		// 	{ resize: { width: 400, height: 400 } },
		// 	{ format: ImageManipulator.SaveFormat.PNG }
		// ]);
		setTakenImage(img);
	};
	return (
		<View>
			<View>
				<Text>Photos</Text>
			</View>
			<View style={{ flexDirection: 'row' }}>
				<Image
					source={require('../assets/dog1.jpeg')}
					style={{ width: '50%', height: 200, resizeMode: 'contain' }}
				/>
				<Image
					source={require('../assets/dog2.jpeg')}
					style={{ width: '50%', height: 200, resizeMode: 'contain' }}
				/>
			</View>
			<View>
				<Button
					title='Launch Camera Roll'
					onPress={() => {
						launchCameraRollAsync();
					}}
				/>
				<Button
					title='Launch Camera'
					onPress={() => launchCameraAsync()}
				/>
			</View>
			<View>
				{chosenImage && (
					<Image
						source={{ uri: chosenImage.uri }}
						style={{ height: 200, width: 200 }}
					/>
				)}
				{takenImage && (
					<Image
						source={{ uri: takenImage.uri }}
						style={{ height: 200, width: 200 }}
					/>
				)}
			</View>
		</View>
	);
};

export default PhoneEditor;
