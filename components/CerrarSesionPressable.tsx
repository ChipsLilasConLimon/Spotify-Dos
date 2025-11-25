import { GestureResponderEvent, Pressable, StyleSheet, Text } from 'react-native';

interface CerrarSesionButonProps {
  onPress?: (event: GestureResponderEvent) => void;
  title?: string;
}

const CerrarSesionButton: React.FC<CerrarSesionButonProps> = ({
  onPress,
  title = "Cerrar sesión",
}) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#E53935',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: '60%',
    alignSelf: 'center',
    marginVertical: 10,
  },
  text: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CerrarSesionButton;