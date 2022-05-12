import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { gsap } from 'gsap';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Firestore, getDoc, doc, setDoc, addDoc, query, where } from 'firebase/firestore/lite';
import { firebaseConfig, db } from 'src/environments/environment';
import { DatabaseService } from 'src/app/shared/services/database.service'
import { AuthService } from 'src/app/shared/services/auth.service';
import { Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { FormControl, FormGroup } from '@angular/forms';
import { UserBusiness } from 'src/app/shared/models/user-business.model';

const auth = getAuth();

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  })

  auth2: any;

  name: string | undefined;

  userLogged: string | undefined;
  

  @ViewChild('loginRef', { static: true }) loginElement!: ElementRef;
  files: any;

  constructor(public dbService: DatabaseService, public authService: AuthService, private router: Router) {}

  ngOnInit() {    
    //Transition between client and business login with GSAP

    const loginSwitcher = gsap.timeline({paused: true})

    loginSwitcher.to(".client", {pointerEvents: "none", opacity: 0, position: "absolute", duration: 0.3})
    .to(".business", {pointerEvents: "auto", opacity: 1, duration: 0.3}, "-=0.3")
    .to(".op-c", {backgroundColor: "rgba(255, 255, 255, 0.418)", color: "#53ae5475", duration: 0.3}, "-=0.3")
    .to(".op-b", {backgroundColor: "white", color: "#53ae55", duration: 0.3 }, "-=0.3");

    let activateClient = document.getElementById("activateClient")!;
    let activateBusiness = document.getElementById("activateBusiness")!;

    let clientStatus = true;
    let businessStatus = false;

    activateClient.addEventListener("click", function () {
      if (clientStatus == false ) loginSwitcher.timeScale(3).reverse();
      clientStatus = true;
      businessStatus = false;
    }, false);

    activateBusiness.addEventListener("click", function () {
      if (businessStatus == false) loginSwitcher.timeScale(1).play();
      clientStatus = false;
      businessStatus = true;
    }, false);

    //End of transition between client and business login with GSAP

  }


  login() {
    this.authService.signInWithGoogle();
  }

  onLoginBusiness() {    
    this.authService.registerWithEmailAndPassword(this.loginForm.value.email, this.loginForm.value.password);
  }

}
