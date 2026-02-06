import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(188, 224, 208, 1)',
    paddingTop: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  backButton: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    backgroundColor: 'rgba(76, 175, 80, 0.8)',
    borderRadius: 10,
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'orbitron-bold',
  },
  langButton: {
    marginLeft: 'auto',
  },
  title: {
    fontSize: 32,
    fontFamily: 'orbitron-bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  settingsContent: {
    paddingHorizontal: 30,
  },
  settingItem: {
    marginBottom: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  settingLabel: {
    fontSize: 18,
    fontFamily: 'orbitron-bold',
    color: '#333',
    marginBottom: 10,
  },
  slider: {
    width: '100%',
    height: 40,
  },
});
