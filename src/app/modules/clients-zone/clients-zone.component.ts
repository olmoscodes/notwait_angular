import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-clients-zone',
  templateUrl: './clients-zone.component.html',
  styleUrls: ['./clients-zone.component.css'],
})
export class ClientsZoneComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {}

  signOut() {
    this.authService.signOut();
  }


}
