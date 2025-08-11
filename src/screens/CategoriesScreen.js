import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView,
  Dimensions,
} from 'react-native';
import { CATEGORIES, COLORS } from '../utils/constants';

const { width } = Dimensions.get('window');

export default function CategoriesScreen({ navigation }) {
  
  const handleCategoryPress = (categoria) => {
    navigation.navigate('Products', { 
      categoria: categoria.id,
      categoryName: categoria.name 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Título */}
        <Text style={styles.title}>Escolha uma Categoria</Text>
        <Text style={styles.subtitle}>Confira nossos deliciosos produtos</Text>
        
        {/* Cards das Categorias */}
        <View style={styles.categoriesContainer}>
          {Object.values(CATEGORIES).map((categoria) => (
            <TouchableOpacity
              key={categoria.id}
              style={[styles.categoryCard, { borderColor: categoria.color }]}
              onPress={() => handleCategoryPress(categoria)}
              activeOpacity={0.8}
            >
              {/* Imagem */}
              <Image 
                source={categoria.image} 
                style={styles.categoryImage}
                resizeMode="cover"
              />
              
              {/* Overlay com gradiente simulado */}
              <View style={styles.overlay} />
              
              {/* Conteúdo do card */}
              <View style={styles.cardContent}>
                <Text style={styles.categoryName}>{categoria.name}</Text>
                <Text style={styles.categoryDescription}>{categoria.description}</Text>
              </View>
              
              {/* Indicador colorido */}
              <View style={[styles.colorIndicator, { backgroundColor: categoria.color }]} />
            </TouchableOpacity>
          ))}
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.dark,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 30,
  },
  categoriesContainer: {
    gap: 20,
  },
  categoryCard: {
    height: 180,
    borderRadius: 15,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    backgroundColor: COLORS.white,
  },
  categoryImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  cardContent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    zIndex: 2,
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  categoryDescription: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  colorIndicator: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 12,
    height: 12,
    borderRadius: 6,
    zIndex: 2,
  },
});