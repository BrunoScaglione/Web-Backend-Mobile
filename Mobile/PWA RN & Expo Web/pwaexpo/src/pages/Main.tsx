import React, { useEffect, useState } from 'react';
import { Text, View, FlatList, Image, StyleSheet } from 'react-native';

// import { Container } from './styles';

interface Member {
  login: string;
  avatar_url: string;
}

const Main: React.FC = () => {

  const [members, setMembers] = useState<Member[]>([]);

  useEffect(() => {
    fetch('http://api.github.com/orgs/rocketseat/members').then(res => {
      res.json().then(data => {
        setMembers(data);
      })
    })
  }, []);

  // ele vai converter pra varios divs o nosso codigo
  // aqui, nao vai ficar m semantico, mas esse nao eh o objetivo jah que nao
  // e pra substituir o web

  return (
    <FlatList 
    contentContainerStyle={{ padding: 24 }}
      data={members}
      keyExtractor={member => member.login}
      renderItem={({ item: member }) => (
        <View style={styles.member}>
          <Image style={styles.image} width={32} source={{ uri: member.avatar_url }} />
          <Text>{member.login}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  member: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

  image: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
  }
})

export default Main;