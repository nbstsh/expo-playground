import React from 'react';
import { View, Text, Button } from 'react-native';

const ProfileScreen = ({ navigation }) => {
	const { navigate } = navigation;
	return (
		<View>
			<Text>this is Profile screen</Text>
			<Button title='TO Home' onPress={() => navigate('Home')} />
		</View>
	);
};

export default ProfileScreen;
