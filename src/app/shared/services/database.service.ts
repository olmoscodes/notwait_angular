import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signOut, User } from 'firebase/auth';
import { collection, getDocs, getDoc, doc, addDoc, query, where, DocumentData } from 'firebase/firestore/lite';
import { getBytes, getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage';
import { db, storage, gAuth } from 'src/environments/environment';
import { v4 as uuidv4 } from 'uuid';


const auth = getAuth();

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private router: Router) {}

  // Traer todos los documentos de una colección
  async getDocs(col: string) {
    let docsArray: DocumentData[] = [];
    const docRef = collection(db, col);
    const docSnap = await getDocs(docRef);

    if (!docSnap.empty) {
      docSnap.forEach((doc) => {
        docsArray.push(doc.data())
      });
    } else {
    }
    return docsArray;
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
  async addImage(file: any) {

    const newPhotoUid: string = uuidv4();
    const imagesRef = ref(storage, newPhotoUid);

    uploadBytes(imagesRef, file).then((snapshot) => {
    });

    onAuthStateChanged(auth, async (user) => {
      if (user) {
        await addDoc(collection(db, "photos"),{
          uuid_user: user.uid,
          uuid_photo: newPhotoUid
        });
      }
    });
  }



  // Traer un imagen con el id de la foto
  async getImage(uid_photo: string) {
    const storage = getStorage();
    return getDownloadURL(ref(storage, uid_photo))
  }




}




