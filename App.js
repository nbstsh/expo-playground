import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import MapView, { Marker } from 'react-native-maps';

export default function App() {
	const [location, setLocation] = useState(null);
	const [where, setWhere] = useState(null);
	const [places, setPlaces] = useState(null);

	const getLocationAsync = async () => {
		const { status } = await Permissions.askAsync(Permissions.LOCATION);
		if (status !== 'granted') {
			console.error('Location permission not granted!');
			return;
		}

		const location = await Location.getCurrentPositionAsync({});
		setLocation(location);

		const where = (await Location.reverseGeocodeAsync(location.coords))[0];
		setWhere(where);

		const eliotHouse = (await Location.geocodeAsync('101 Dunster St.'))[0];
		const theCrimson = (await Location.geocodeAsync('14 Plymptom St.'))[0];
		const theKitty = (await Location.geocodeAsync('2 Holyoke Place'))[0];

		setPlaces({ eliotHouse, theCrimson, theKitty });
	};

	useEffect(() => {
		getLocationAsync();
	}, []);

	return location === null ? (
		<View />
	) : (
		<MapView
			style={{ flex: 1 }}
			initialRegion={{
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421
			}}
		>
			{where && (
				<Marker
					coordinate={location.coords}
					title='You are here'
					description={`${where.name} ${where.city}`}
				/>
			)}
			{places && (
				<>
					<Marker coordinate={places.eliotHouse} title='eliotHouse' />
					<Marker
						coordinate={places.theCrimson}
						title='theCrimson'
						pinColor='yellow'
					/>
					<Marker
						coordinate={places.theKitty}
						title='the Kitty'
						pinColor='blue'
					/>
				</>
			)}
		</MapView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center'
	}
});
