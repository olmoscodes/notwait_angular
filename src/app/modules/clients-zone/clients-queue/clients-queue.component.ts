import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { addDoc, collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore/lite';
import { ClientQueue } from 'src/app/shared/models/client-queue';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { db } from 'src/environments/environment';

const auth = getAuth();

@Component({
  selector: 'app-clients-queue',
  templateUrl: './clients-queue.component.html',
  styleUrls: ['./clients-queue.component.css']
})
export class ClientsQueueComponent implements OnInit {

  businessId: string = '';
  clientId: string = '';
  data: ClientQueue = {
    clientUid: '',
    businessUid: '',
    datetime: 0
  }
  peopleBefore = 0;

  clientAdded: boolean = false;
  beforeLoaded: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public dbService: DatabaseService,
  ) { }

  ngOnInit(): void {
    this.businessId = this.route.snapshot.params['businessId'];

    new Promise<void>((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.clientId = user.uid;
          resolve();
        }
      });  
    }).then(() => {
      this.data = {
        clientUid: this.clientId,
        businessUid: this.businessId,
        datetime: new Date().getTime()
      }

      this.getPeopleBefore(this.data)

      window.setInterval(() =>{
        this.getPeopleBefore(this.data)
      }, 10000);
    }).then(() => { 
      this.beforeLoaded = true;
    })
  }

  answerYes() {

    this.addToQueue(this.data)
  }

  answerNo() {
    console.log('hola')
    sessionStorage.removeItem('businessId')
    this.router.navigate(['clients/card/' + this.businessId])
  }

  async addToQueue(data: ClientQueue) {
    await getDocs(query(collection(db, 'queue'), where("clientUid", "==", data.clientUid ))).then(async (element) => {
      if (element.docs.length == 0) {
        await addDoc(collection(db, 'queue'),{
          clientUid: data.clientUid,
          businessUid: data.businessUid,
          dateTime: data.datetime
        });
        this.clientAdded = true;
      }
    });
  }

  async getPeopleBefore (data: ClientQueue) {
    console.log('checking people')
    await getDocs(query(collection(db, 'queue'), where("clientUid", "==", data.clientUid ))).then(async (element) => {
      if (element.docs.length > 0) {
        data.datetime = element.docs[0].get('dateTime');
        this.clientAdded = true;
      } else {
        this.clientAdded = false;
      }
    }).then(async () => {
      await getDocs(query(collection(db, 'queue'), where("businessUid", "==", data.businessUid ), where("dateTime", "<", data.datetime))).then((data) => {
        this.peopleBefore = data.docs.length; 
        console.log(this.peopleBefore)
        console.log(data.docs)}
        );
      });
  }

  async getOutQueue() {
    this.dbService.deleteDocByFieldAndData('queue', 'clientUid', this.clientId);
  }

  



}
