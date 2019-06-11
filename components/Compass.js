import React, { useState, useEffect } from 'react';
import { View, Image, ImageBackground, StyleSheet, Text } from 'react-native';
import { Magnetometer } from 'expo-sensors';

const Compass = () => {
	const [v, setV] = useState(null);

	useEffect(() => {
		Magnetometer.addListener(v => {
			setV(v);
		});
	}, []);

	let theta = '0';
	if (v) {
		const { x, y, z } = v;
		theta = Math.atan(-x / y);
		if (-x > 0 && y > 0) {
			//
		} else if (y > 0) {
			theta += Math.PI;
		} else {
			theta += Math.PI * 2;
		}
	}

	return (
		<View style={styles.container}>
			<Text>{JSON.stringify(theta)}</Text>
			<ImageBackground
				source={require('../assets/compass.png')}
				style={styles.compass}
			>
				<Image
					source={require('../assets/compass-needle.png')}
					style={{
						...styles.needle,
						transform: [{ rotate: `${Math.floor(theta)}rad` }]
					}}
				/>
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	},
	compass: {
		width: 250,
		height: 250,
		alignItems: 'center',
		justifyContent: 'center'
	},
	needle: {
		width: 220,
		height: 220,
		opacity: 0.65
	}
});

export default Compass;
