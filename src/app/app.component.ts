import { Component, OnInit } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'src/environments/environment';
import { getMessaging, getToken, onMessage } from "firebase/messaging";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'notwait_angular';
  message:any = null;
  currentToken : string = '';

  ngOnInit(): void {
    const app = initializeApp(firebaseConfig);
    this.requestPermission();
    this.listen();
  }

  requestPermission() {
    const messaging = getMessaging();
    
    getToken(messaging, 
     { vapidKey: 'BFoAIUGkcOjrO8CU8N73Jm8_cjyc8qvcnqrKaA91rYE2Vxz8ENhS64IPUG3neR3RPiGfRZ99PV6HG7yysJckuEM'}).then(
       (currentToken) => {
         if (currentToken) {
           console.log("Hurraaa!!! we got the token.....");
           console.log(currentToken);
           this.currentToken = currentToken;
         } else {
          this.currentToken= 'No registration token available. Request permission to generate one'
           console.log('No registration token available. Request permission to generate one.');
         }
     }).catch((err) => {
       this.currentToken = err;
        console.log('An error occurred while retrieving token. ', err);
    });
  }
  listen() {
    const messaging = getMessaging();
    onMessage(messaging, (payload) => {
      console.log('Message received. ', payload);
      this.message=payload;
    });
  }
}
