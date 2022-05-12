import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User } from 'firebase/auth';
import { addDoc, collection, getDocs, query, where } from 'firebase/firestore/lite';
import { Observable } from 'rxjs';
import { db, gAuth } from 'src/environments/environment';
import { UserBusiness } from '../models/user-business.model';
import { DatabaseService } from './database.service';

const auth = getAuth();

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public router: Router, public dbService: DatabaseService) { 
    let state = {
      email: '',
      password: '',
      message: '',
      currentUser: null
    }
  }

  // Método para iniciar sesión mediante pop-up
  signInWithGoogle() {
    signInWithPopup(auth, gAuth)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);

      if (credential) {
        const token = credential.accessToken;
      }
      // The signed-in user info.
      const user = result.user;
  
      // Añadimos el usuario a la base datos (si no existe)
      addClientDoc(user);

    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
  
    // Sub-método para añadir el usuario en la base datos (si no existe)
    async function addClientDoc(user: User) {
      const docSnap = await getDocs(query(collection(db, "clients"), where("email", "==", user.email )));
      if (docSnap.docs.length == 0) {
        const docRef = await addDoc(collection(db, "clients"),{
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber
        });
      }
    }
  }
  
  // Cerrar sesión
  signOut() {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
    });
  }

  // Crear cuenta con correo electrónico y contraseña 
  register(email: string, password: string, businessData: UserBusiness, businessPhotos: Array<any>) {
    createUserWithEmailAndPassword(auth, email, password)
  .then(async (userCredential) => {

    const user = userCredential.user;
    businessData.uid = user.uid;

    //Guardamos los datos del usuario Business registrado
    const docSnap = await getDocs(query(collection(db, "business"), where("email", "==", businessData.email )));
    if (docSnap.docs.length == 0) {
      const docRef = await addDoc(collection(db, "business"),{
        bussinessName: businessData.bussinessName,
        description: businessData.description,
        country: businessData.country,
        stateProvince: businessData.stateProvince,
        city: businessData.city,
        postalCode: businessData.postalCode,
        street: businessData.street,
        number: businessData.number,
        floor: businessData.floor,
        door: businessData.door,
        phone: businessData.phone,
        category: businessData.category,
        openingHour: businessData.openingHour,
        closingHour: businessData.closingHour,
        url: businessData.url,
        email: businessData.email,
        password: businessData.password,        
        uid: businessData.uid,
      });
    }

    //Para cada foto del array de fotos que usuario Business a incluido en el formulario las añadimos a la colleción de photos
    businessPhotos.forEach(element => {
      this.dbService.addImage(element);
    });

    this.signOut();
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

  }


  registerWithEmailAndPassword(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user)
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });

  }
  
}
