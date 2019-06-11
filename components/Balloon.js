import React, { useState, useEffect } from 'react';
import { View, Image, Text } from 'react-native';
import { DeviceMotion } from 'expo-sensors';

const Balloon = () => {
	const [dm, setDm] = useState(null);

	useEffect(() => {
		const subscription = DeviceMotion.addListener(dm => {
			setDm(dm);
		});
		return () => {
			subscription.remove();
		};
	}, []);

	let angle = 0;
	if (dm && dm.rotation) {
		angle = dm.rotation.gamma;
	}

	return (
		<View style={{ flex: 1 }}>
			<Text>{JSON.stringify(angle)}</Text>
			<Image
				source={require('../assets/balloon.jpg')}
				style={{
					width: 300,
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					transform: [{ rotate: `${angle}deg` }]
				}}
			/>
		</View>
	);
};

export default Balloon;
