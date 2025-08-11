// Constantes do aplicativo
export const WHATSAPP_NUMBER = "1531971424168"; // Substitua pelo número real da empresa
export const WHATSAPP_MESSAGE = "Olá! Gostaria de fazer um pedido!";

// Categorias fixas
export const CATEGORIES = {
  pizzas: {
    id: 'pizzas',
    name: 'Pizzas',
    description: 'Deliciosas pizzas artesanais',
    image: require('../assets/images/pizza_category.jpg'), // SUA IMAGEM
    color: '#FF6B6B'
  },
  salgados_assados: {
    id: 'salgados_assados',
    name: 'Salgados Assados',
    description: 'Salgados assados fresquinhos',
    image: require('../assets/images/salgado_assado.jpg'), // SUA IMAGEM
    color: '#4ECDC4'
  },
  salgados_fritos: {
    id: 'salgados_fritos',
    name: 'Salgados Fritos',
    description: 'Salgados fritos crocantes',
    image: require('../assets/images/salgado_frito.jpg'), // SUA IMAGEM
    color: '#45B7D1'
  }
};

// Função para pegar imagem do produto por categoria
export const getProductImage = (categoria) => {
  return CATEGORIES[categoria]?.image || CATEGORIES.pizzas.image;
};

// Logo da empresa
export const LOGO = require('../assets/images/logo.png');

// Cores do tema
export const COLORS = {
  primary: '#FF6B6B',
  secondary: '#4ECDC4',
  accent: '#45B7D1',
  background: '#F7F9FC',
  white: '#FFFFFF',
  dark: '#2C3E50',
  gray: '#BDC3C7',
  success: '#2ECC71',
  warning: '#F39C12',
  danger: '#E74C3C'
};


// Função para formatar preço
export const formatPrice = (price) => {
  return `R$ ${parseFloat(price).toFixed(2).replace('.', ',')}`;
};

// Função para gerar link simples do WhatsApp
export const generateWhatsAppLink = () => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
};