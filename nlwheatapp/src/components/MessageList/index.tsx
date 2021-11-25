import React from "react";
import { ScrollView } from "react-native";

import { Message } from "../Message";
import { styles } from "./styles";

export function MessageList() {

  const message = {
    id: '1',
    text: 'Message de teste',
    user: {
      name: 'Klesio',
      avatar_url: 'https://avatars.githubusercontent.com/u/53840467?s=400&u=6eb273676eae943abb826955c97b8676f818b3f7&v=4'
    },
  }



  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      <Message data={message}/>
      <Message data={message}/>
      <Message data={message}/>
      
      
    </ScrollView>
  );
}
