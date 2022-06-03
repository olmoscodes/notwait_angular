import { Component, OnInit } from '@angular/core';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { gsap } from "gsap";
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-clients-settings',
  templateUrl: './clients-settings.component.html',
  styleUrls: ['./clients-settings.component.css']
})
export class ClientsSettingsComponent implements OnInit {

  faArrowLeft = faArrowLeft;

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const navbar = gsap.timeline()
    navbar.fromTo(".navbar", 0.5, {boxShadow: "0 0 10px 10px rgba(0,0,0,0)"}, {boxShadow: "0 0 10px 10px rgba(0,0,0,0.04)"}, "+=1");
  }

  logout() {
    this.authService.signOut();
  }

}
