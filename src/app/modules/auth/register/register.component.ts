import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { UserBusiness } from 'src/app/shared/models/user-business.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup({
    bussinessName: new FormControl(''),
    description: new FormControl(''),
    country: new FormControl(''),
    stateProvince: new FormControl(''),
    city: new FormControl(''),
    postalCode: new FormControl(''),
    street: new FormControl(''),
    number: new FormControl(''),
    floor: new FormControl(''),
    door: new FormControl(''),
    phone: new FormControl(''),
    category: new FormControl(''),
    openingHour: new FormControl(''),
    closingHour: new FormControl(''),
    url: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl(''),
  });

  businessData = {} as UserBusiness;

  businessPhotos: Array<any> = [];

  fileToUpload: any;

  constructor(public authService: AuthService, public dbService: DatabaseService) { }

  ngOnInit() {}

  onSubmit() {
    this.businessData.bussinessName = this.registerForm.value.bussinessName;
    this.businessData.description = this.registerForm.value.description;
    this.businessData.country = this.registerForm.value.country;
    this.businessData.stateProvince = this.registerForm.value.stateProvince;
    this.businessData.city = this.registerForm.value.city;
    this.businessData.postalCode = this.registerForm.value.postalCode;
    this.businessData.street = this.registerForm.value.street;
    this.businessData.number = this.registerForm.value.number;
    this.businessData.floor = this.registerForm.value.floor;
    this.businessData.door = this.registerForm.value.door;
    this.businessData.phone = this.registerForm.value.phone;
    this.businessData.category = this.registerForm.value.category;
    this.businessData.openingHour = this.registerForm.value.openingHour;
    this.businessData.closingHour = this.registerForm.value.closingHour;
    this.businessData.url = this.registerForm.value.url;
    this.businessData.email = this.registerForm.value.email;
    this.businessData.password = this.registerForm.value.password;

    console.log(this.businessData);
    console.log(this.businessPhotos);
    this.authService.register(this.registerForm.value.email, this.registerForm.value.password, this.businessData, this.businessPhotos);
  }


  handleFileInput(event: Event,) {
    this.fileToUpload = (event.target as  HTMLInputElement) .files?.item(0);
    
    this.businessPhotos.push(this.fileToUpload);
    console.log(event.target);
    console.log(this.businessPhotos);
    //this.dbService.addImage(this.fileToUpload);
  }
  
}
