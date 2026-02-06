import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(188, 224, 208, 1)',
  },
  title: {
    fontSize: 48,
    fontFamily: 'orbitron-bold',
    marginBottom: 50,
    color: '#333',
    textAlign: 'center',
  },
  menuButton: {
    width: 250,
    height: 60,
    borderRadius: 15,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  menuButtonDisabled: {
    backgroundColor: '#ccc',
  },
  menuButtonDanger: {
    backgroundColor: '#f44336',
  },
  menuButtonSettings: {
    backgroundColor: '#2196F3',
  },
  menuButtonText: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'orbitron-bold',
  },
  confirmContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmBox: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 15,
    width: 300,
    alignItems: 'center',
  },
  confirmText: {
    fontSize: 24,
    fontFamily: 'orbitron-bold',
    marginBottom: 20,
    color: '#333',
  },
  confirmButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  confirmButton: {
    width: 100,
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  confirmButtonYes: {
    backgroundColor: '#f44336',
  },
  confirmButtonNo: {
    backgroundColor: '#4CAF50',
  },
  confirmButtonText: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'orbitron-bold',
  },
});
