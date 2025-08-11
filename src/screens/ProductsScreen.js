import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
  ActivityIndicator,
} from 'react-native';
import { CATEGORIES, COLORS, getProductImage, formatPrice, generateWhatsAppLink } from '../utils/constants';
import { FirebaseService } from '../services/firebaseConfig';

export default function ProductsScreen({ route, navigation }) {
  const { categoria, categoryName } = route.params;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const categoryData = CATEGORIES[categoria];

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const result = await FirebaseService.getProducts(categoria);
    
    if (result.success) {
      setProducts(result.products);
    } else {
      Alert.alert('Erro', 'Não foi possível carregar os produtos');
    }
    setLoading(false);
  };

  const handleWhatsApp = (product) => {
    const message = `Olá! Gostaria de fazer um pedido:\n\n*${product.nome}*\nDescrição: ${product.descricao}\nPreço: ${formatPrice(product.preco)}`;
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodeURIComponent(message)}`;
    
    Linking.openURL(whatsappUrl).catch(() => {
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp');
    });
  };

  const renderProduct = ({ item }) => (
    <View style={styles.productCard}>
      {/* Imagem do Produto */}
      <Image 
        source={getProductImage(categoria)}
        style={styles.productImage}
        resizeMode="cover"
      />
      
      {/* Conteúdo do Produto */}
      <View style={styles.productContent}>
        <Text style={styles.productName}>{item.nome}</Text>
        <Text style={styles.productDescription}>{item.descricao}</Text>
        <Text style={styles.productPrice}>{formatPrice(item.preco)}</Text>
        
        {/* Botão WhatsApp */}
        <TouchableOpacity
          style={[styles.whatsappButton, { backgroundColor: categoryData.color }]}
          onPress={() => handleWhatsApp(item)}
          activeOpacity={0.8}
        >
          <Text style={styles.whatsappButtonText}>Fazer Pedido via WhatsApp</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={categoryData?.color || COLORS.primary} />
          <Text style={styles.loadingText}>Carregando produtos...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={[styles.header, { backgroundColor: categoryData.color }]}>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <Text style={styles.headerSubtitle}>
          {products.length} produto{products.length !== 1 ? 's' : ''} disponível{products.length !== 1 ? 'is' : ''}
        </Text>
      </View>

      {/* Lista de Produtos */}
      {products.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>Nenhum produto encontrado</Text>
          <Text style={styles.emptySubtitle}>
            Ainda não há produtos cadastrados nesta categoria.
          </Text>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>Voltar às Categorias</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.productsList}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: COLORS.gray,
  },
  header: {
    padding: 20,
    paddingTop: 30,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.white,
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.white,
    opacity: 0.9,
  },
  productsList: {
    padding: 20,
    paddingTop: 10,
  },
  productCard: {
    backgroundColor: COLORS.white,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    overflow: 'hidden',
  },
  productImage: {
    width: '100%',
    height: 200,
  },
  productContent: {
    padding: 20,
  },
  productName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 8,
  },
  productDescription: {
    fontSize: 14,
    color: COLORS.gray,
    lineHeight: 20,
    marginBottom: 12,
  },
  productPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 15,
  },
  whatsappButton: {
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  whatsappButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.dark,
    marginBottom: 10,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: COLORS.gray,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  backButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  backButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});