import { Injectable } from '@angular/core';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { collection, getDocs, getDoc, doc, addDoc, query, where } from 'firebase/firestore/lite';
import { getBytes, ref, uploadBytes } from 'firebase/storage';
import { db, storage, gAuth } from 'src/environments/environment';

const auth = getAuth();

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor() { }

  // Traer todos los documentos de una colección
  async getDocs(col: string) {
    const docRef = collection(db, col);
    const docSnap = await getDocs(docRef);

    if (!docSnap.empty) {
      docSnap.forEach((doc) => {
        //console.log(`${doc.id} => ${doc.data()}`);
      });
    } else {
      //console.log("The collection is empty!");
    }
  }

  // Traer un documento de una colección
  async getDoc(col: string, id: string) {
    const docRef = doc(db, col, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      //console.log("Document data:", docSnap.data());
    } else {
      //console.log("No such document!");
    }
  }

  // Comprobar en la base de datos si el usuario logeado es Client
  async isUserClient(uid: string) {
    const q = query(collection(db, "clients"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    let result = false;
    querySnapshot.docs.length !== 0 ? result = true : result = false;

    return result;
  }

  // Comprobar en la base de datos si el usuario logeado es Business
  async isUserBusiness(uid: string): Promise<boolean> {
    const q = query(collection(db, "business"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    let result = false;
    querySnapshot.docs.length !== 0 ? result = true : result = false;

    return result;
  }

  // Comprobar en la base de datos si el usuario logeado es Client
  async isUserAdmin(uid: string): Promise<boolean> {
    const q = query(collection(db, "admin"), where("uid", "==", uid));
    const querySnapshot = await getDocs(q);

    let result = false;
    querySnapshot.docs.length !== 0 ? result = true : result = false;

    return result;
  }

  // Añadir una imagen
  async addImage(file: Blob | Uint8Array | ArrayBuffer) {
    const imagesRef = ref(storage, 'images');
    uploadBytes(imagesRef, file).then((snapshot) => {
      console.log('Uploaded a blob or file!');
    });
  }

  // Traer un imagen
  async getImage() {
    const imagesRef = ref(storage, 'images');
    getBytes(imagesRef);
  }

}




