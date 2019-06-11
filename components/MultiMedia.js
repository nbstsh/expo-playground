import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableHighlight } from 'react-native';
import { Video, Audio } from 'expo-av';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';

const VideoContainer = ({ source, width, height, size }) => {
	const videoRef = useRef(null);
	const resetAsync = async () => {
		await videoRef.current.stopAsync();
		await videoRef.current.setPositionAsync(0);
	};

	const playAsync = async () => {
		await videoRef.current.replayAsync(0);
	};

	return (
		<View>
			<TouchableHighlight
				onPress={() => {
					playAsync();
				}}
			>
				<View>
					<Video
						ref={videoRef}
						source={source}
						rate={1.0}
						volume={1.0}
						isMuted={false}
						resizeMode='cover'
						shouldPlay
						isLooping
						style={{
							width: width || size || 300,
							height: height || size || 300
						}}
						onPlaybackStatusUpdate={status => {
							if (status.didJustFinish) {
								resetAsync();
							}
						}}
					/>
				</View>
			</TouchableHighlight>
		</View>
	);
};

const MultiMedia = () => {
	const [isReady, setIsReady] = useState(false);

	const setAudioModeAsync = async () => {
		Audio.setAudioModeAsync({
			playsInSilentModeIOS: true,
			allowsRecordingIOS: false,
			shouldDuckAndroid: true,
			interruptionModeAndroid:
				Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
			interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_MIX_WITH_OTHERS
		});
	};

	const loadFontsAsync = async () => {
		await Font.loadAsync({
			Anton: require('../assets/fonts/Anton-Regular.ttf')
		});
	};

	const setUpAsync = async () => {
		await Promise.all([setAudioModeAsync(), loadFontsAsync()]);
		setIsReady(true);
	};

	useEffect(() => {
		setUpAsync();
	}, []);

	useEffect(() => {});
	return !isReady ? (
		<AppLoading />
	) : (
		<View style={styles.container}>
			<Text style={{ ...styles.text, fontFamily: 'Anton' }}>
				Multi Media
			</Text>
			<VideoContainer
				source={{
					uri:
						'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
	},
	text: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	video: {
		width: 400,
		height: 400
	}
});

export default MultiMedia;
