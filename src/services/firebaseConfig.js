import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
// import storage from '@react-native-firebase/storage'; // Desabilitado temporariamente

// Configuração já está no google-services.json
// Não precisamos configurar manualmente

export { auth, firestore };
// export { auth, firestore, storage }; // Storage desabilitado

// Funções utilitárias para o Firebase
export const FirebaseService = {
  // Auth functions
  signIn: async (email, password) => {
    try {
      const userCredential = await auth().signInWithEmailAndPassword(email, password);
      return { success: true, user: userCredential.user };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  signOut: async () => {
    try {
      await auth().signOut();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getCurrentUser: () => {
    return auth().currentUser;
  },

  // Firestore functions
  addProduct: async (productData) => {
    try {
      const docRef = await firestore()
        .collection('produtos')
        .add({
          ...productData,
          criadoEm: firestore.FieldValue.serverTimestamp(),
        });
      return { success: true, id: docRef.id };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  getProducts: async (categoria = null) => {
    try {
      let query = firestore().collection('produtos');
      
      if (categoria) {
        query = query.where('categoria', '==', categoria);
      }
      
      const snapshot = await query.orderBy('criadoEm', 'desc').get();
      const products = [];
      
      snapshot.forEach(doc => {
        products.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      
      return { success: true, products };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  updateProduct: async (id, productData) => {
    try {
      await firestore()
        .collection('produtos')
        .doc(id)
        .update(productData);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  deleteProduct: async (id) => {
    try {
      await firestore()
        .collection('produtos')
        .doc(id)
        .delete();
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  // Storage functions - DESABILITADO TEMPORARIAMENTE
  // Quando o Firebase Storage estiver disponível, descomente essas funções
  /*
  uploadImage: async (imageUri, fileName) => {
    try {
      const reference = storage().ref(`produtos/${fileName}`);
      await reference.putFile(imageUri);
      const downloadURL = await reference.getDownloadURL();
      return { success: true, url: downloadURL };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
  */
};