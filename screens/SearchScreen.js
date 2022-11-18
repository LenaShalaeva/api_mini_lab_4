import React, { useState, useEffect } from 'react';
import { SafeAreaView, View } from 'react-native';
import { Input } from 'react-native-elements';
import { query, where, collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import ChatListItem from '../components/ChatListItem';

const SearchScreen = () => {
const [dialogsFilter, setDialogsFilter] = useState('');
const [chats, setChats] = useState([]);

useEffect(() => {
	const q = query(collection(db, 'chats'), where('chatName', '!=', ''));
	const unsubscribe = onSnapshot(q, (querySnaphots) => {
	const chats = [];
	querySnaphots.forEach((doc) => {
		chats.push({id: doc.id,data: doc.data(),});
	});
	console.log(chats);
	setChats(chats);
	});
	return unsubscribe;
}, []);

const enterChat = (id, chatName) => {
navigation.navigate('Chat', { id, chatName });
};

return (
<SafeAreaView>
	<View>
		<Input
		placeholder="Search for dialogs"
		value={dialogsFilter}
		onChangeText={(text) => setDialogsFilter(text)}
		/>
		{chats
		.filter((chat) => chat.data.chatName.includes(dialogsFilter))
		.map(({ id, data: { chatName } }) => (
		<ChatListItem
		key={id}
		id={id}
		chatName={chatName}
		enterChat={enterChat}
		/>
		))}
	</View>
</SafeAreaView>
);
};

export default SearchScreen;