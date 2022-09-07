import { View, Text, GestureResponderEvent } from 'react-native';
import { Button, ButtonText } from '../Button';
import S from './styles';

export type ParticipantProps = {
  name: string;
  onRemove?: (event: GestureResponderEvent) => void;
};

export function Participant({ name, onRemove }: ParticipantProps) {
  return (
    <View style={S.container}>
      <Text style={S.name}>{name}</Text>

      <Button flavor="danger" onPress={onRemove}>
        <ButtonText>-</ButtonText>
      </Button>
    </View>
  );
}
