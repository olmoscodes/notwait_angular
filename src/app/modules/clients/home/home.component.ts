import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
//import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  constructor(private dbService: DatabaseService, private authService: AuthService ) { }

  ngOnInit() {
    
    //console.log(uuidv4());
  }

  logout() {
    this.authService.signOut();
  }

}
