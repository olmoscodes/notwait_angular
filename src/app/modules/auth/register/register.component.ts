import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserBusiness } from 'src/app/shared/models/user-business.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {

  // Iconos que se utilizan en el componente
  faArrowLeft = faArrowLeft;
  faXmark = faXmark;

  businessData = {} as UserBusiness;
  businessPhotos: Array<any> = [];
  imagesToShow: SafeUrl[] = [];
  updatedImages: SafeUrl[] = [];

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
    file: new FormControl(''),
  });

  constructor(public authService: AuthService,
    public dbService: DatabaseService,
    private domSanitizer: DomSanitizer) { }

  ngOnInit() { }

  // Método para recoger toda la información del formulario y registrarse gracias al método register que cogemos del servicio Auth
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

    this.authService.register(this.registerForm.value.email, this.registerForm.value.password, this.businessData, this.businessPhotos);
  }

  get f() {
    return this.registerForm.controls;
  }

  // Método para añadir una imagen a la array de fotos para mostrar y a la array de fotos para subir
  onFileChange(event: any) {
    if (event.target.files && event.target.files[0]) {
      this.businessPhotos.push(event.target.files[0]);
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();

        reader.onload = (event: any) => {
          this.imagesToShow.push(this.domSanitizer.bypassSecurityTrustUrl(event.target.result));

          this.registerForm.patchValue({
            fileSource: this.imagesToShow
          });
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  // Método para eliminar una imagen del array de fotos a mostrar y del array de fotos a subir
  deleteImage(url: SafeUrl) {
    this.updatedImages = this.imagesToShow;
    this.imagesToShow = [];

    let counter = 0;
    let positionDeleted: number;

    this.updatedImages.forEach(element => {
      if (element !== url) {
        this.imagesToShow.push(element);
      } else {
        positionDeleted = counter;
        this.businessPhotos.splice(positionDeleted, 1);
      }
      counter++;
    });
  }

}
