import { Alert, FlatList, Platform, Text, TextInput, View } from 'react-native';
import { faker } from '@faker-js/faker/locale/pt_BR';
import { Button, ButtonText } from '../../components/Button';
import { Participant } from '../../components/Participant';
import S from './styles';
import { useState } from 'react';

type Person = {
  id: string;
  name: string;
};

const initialParticipants = Array.from(
  { length: faker.helpers.arrayElement([10, 15, 20, 25, 30]) },
  () => ({
    id: faker.database.mongodbObjectId(),
    name: faker.name.fullName(),
  }),
);

export function Home() {
  const [participants, setParticipants] = useState(initialParticipants);
  const [name, setName] = useState('');

  function handleParticipantAdd() {
    if (
      participants.find(
        (item) => item.name.toUpperCase() === name.toUpperCase(),
      )
    ) {
      const alert = {
        title: 'Duplicação detectada',
        content: 'Já existe um participante na lista com esse nome!',
      } as const;
      if (Platform.OS === 'web') {
        return window.alert(`${alert.title}\n${alert.content}`);
      }
      return Alert.alert(alert.title, alert.content);
    }
    const newParticipant = { name, id: faker.database.mongodbObjectId() };
    setParticipants((current) => [newParticipant, ...current]);
  }

  function handleParticipantRemove(participant: Person) {
    const remove = () => {
      setName('');
      setParticipants((current) =>
        current.filter((item) => item.id !== participant.id),
      );
    };
    if (Platform.OS === 'web') {
      return remove();
    }
    Alert.alert(
      'Confirmação de exlusão',
      `Deseja realmente remover ${participant.name}?`,
      [
        {
          text: 'NÃO',
        },
        {
          text: 'SIM',
          onPress: remove,
        },
      ],
    );
  }

  return (
    <View style={S.container}>
      <Text style={S.eventName}>Nome do evento</Text>
      <Text style={S.eventDate}>Sexta, 4 de Novembro de 2022.</Text>

      <View style={S.form}>
        <TextInput
          style={S.input}
          placeholder="nome do participante"
          placeholderTextColor="#6B6B6B"
          value={name}
          onChangeText={setName}
        />
        <Button flavor="success" onPress={handleParticipantAdd}>
          <ButtonText>+</ButtonText>
        </Button>
      </View>

      <FlatList
        data={participants}
        keyExtractor={(participant) => participant.id}
        renderItem={(item) => (
          <Participant
            name={item.item.name}
            onRemove={() => handleParticipantRemove(item.item)}
          />
        )}
        ListEmptyComponent={() => (
          <Text style={S.listEmptyText}>
            Ninguém chegou ao evento ainda? Adiciona participantes da sua lista
            de presença.
          </Text>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
