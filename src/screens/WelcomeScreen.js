import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
} from 'react-native';
import { LOGO, COLORS } from '../utils/constants';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#8B5CF6" />
      
      <View style={styles.background}>
        <View style={styles.content}>
          
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Image source={LOGO} style={styles.logo} resizeMode="contain" />
          </View>

          {/* Título */}
          <Text style={styles.title}>Olá!</Text>

          {/* Descrição */}
          <Text style={styles.description}>
            Seja bem vindo a L&R Produtos Caseiros!{'\n'}
            Confira o nosso cardápio e se delicie com os{'\n'}
            melhores salgados da região!
          </Text>

          {/* Botões */}
          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.adminButton}
              onPress={() => navigation.navigate('Login')}
              activeOpacity={0.8}
            >
              <Text style={styles.adminButtonText}>Admin</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.menuButton}
              onPress={() => navigation.navigate('Categories')}
              activeOpacity={0.8}
            >
              <Text style={styles.menuButtonText}>Conferir Menu</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: '#A855F7', // Cor sólida similar ao gradiente
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    backgroundColor: '#FFF',
    borderRadius: 60,
    padding: 10,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  title: {
    fontSize: 48,
    fontWeight: '700',
    color: '#2D3748',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#4A5568',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 60,
    opacity: 0.9,
  },
  buttonsContainer: {
    width: '100%',
    paddingHorizontal: 20,
    gap: 15,
  },
  adminButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.8)',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  adminButtonText: {
    color: '#2D3748',
    fontSize: 18,
    fontWeight: '600',
  },
  menuButton: {
    backgroundColor: '#4FD1C7',
    paddingVertical: 16,
    paddingHorizontal: 40,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  menuButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
});