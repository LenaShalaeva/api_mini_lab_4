import React, { useEffect, useState } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { auth, db } from '../firebase';
import { query, where, collection, onSnapshot } from 'firebase/firestore';

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		marginLeft: 50,
		marginTop: 30,
	},
	image: {
		width: 100,
		height: 100,
	},
	label: {
		fontWeight: 'bold',
		fontSize: 16,
	},
});

const UserScreen = ({ navigation }) => {
	return (
		<SafeAreaView>
			<View style={styles.container}>
				<Image
				style={styles.image}
				source={{ uri: auth.currentUser.photoURL }}
				/>
				<Text style={styles.label}>Name:</Text>
				<Text>{auth.currentUser.displayName}</Text>
				<Text style={styles.label}>Email:</Text>
				<Text>{auth.currentUser.email}</Text>
			</View>
		</SafeAreaView>
	);
};

export default UserScreen;