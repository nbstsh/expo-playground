import React from 'react';
import { View, Button } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Contacts from 'expo-contacts';

const TextOrDelete = () => {
	const getRandomContactAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.CONTACTS);
		if (status !== 'granted') {
			console.error('Permission not granted!');
			return;
		}
		const contacts = await Contacts.getContactsAsync({
			pageSize: 1,
			pageOffset: 0,
			fields: [Contacts.Fields.PhoneNumbers]
		});
		console.log(contacts);
	};

	const onPickContactPress = async () => {
		await getRandomContactAsync();
	};

	return (
		<View>
			<Button
				title='Pick a random contact'
				onPress={onPickContactPress}
			/>
		</View>
	);
};

export default TextOrDelete;
