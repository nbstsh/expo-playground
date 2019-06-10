import React from 'react';
import { View, Text, Button } from 'react-native';

const HomeScreen = ({ navigation, message }) => {
	const { navigate } = navigation;
	return (
		<View>
			<Text>this is home screen</Text>
			{message && <Text>{message}</Text>}
			<Button title='TO PROFILE' onPress={() => navigate('Profile')} />
		</View>
	);
};

export default HomeScreen;
