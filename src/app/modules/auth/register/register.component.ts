import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserBusiness } from 'src/app/shared/models/user-business.model';
import { AuthService } from 'src/app/shared/services/auth.service';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { faArrowLeft, faXmark } from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { GeoService } from 'src/app/shared/services/geo.service';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
  providers: [GeoService]
})
export class RegisterComponent implements OnInit {

  // Iconos que se utilizan en el componente
  faArrowLeft = faArrowLeft;
  faXmark = faXmark;

  businessData = {} as UserBusiness;
  businessPhotos: Array<any> = [];
  imagesToShow: SafeUrl[] = [];
  updatedImages: SafeUrl[] = [];

  registerForm = {} as FormGroup;

  latitude: string = '';
  longitude: string = '';
  submitNotOk: boolean = true;

  constructor(public authService: AuthService,
    public dbService: DatabaseService,
    private domSanitizer: DomSanitizer,
    public geolocate: GeoService,
  ) { }

  ngOnInit() {
    
    this.registerForm = new FormGroup({
      businessName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z ]*')]),
      description: new FormControl('', [Validators.required]),
      country: new FormControl('', [Validators.required]),
      stateProvince: new FormControl('', [Validators.required]),
      city: new FormControl('', [Validators.required]),
      postalCode: new FormControl('', [Validators.required]),
      street: new FormControl('', [Validators.required]),
      number: new FormControl('', [Validators.required]),
      floor: new FormControl('', [Validators.required]),
      door: new FormControl('', [Validators.required]),
      phone: new FormControl('', [Validators.required]),
      category: new FormControl('', [Validators.required]),
      openingHour: new FormControl('', [Validators.required]),
      closingHour: new FormControl('', [Validators.required]),
      url: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      file: new FormControl('', [Validators.required]),

    })
  }


  // Método para recoger toda la información del formulario y registrarse gracias al método register que cogemos del servicio Auth
  onSubmit() {
    this.businessData.businessName = this.registerForm.value.businessName;
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

    this.geolocate.getCoord(
      this.registerForm.value.country, 
      this.registerForm.value.city, 
      this.registerForm.value.postalCode, 
      this.registerForm.value.street, 
      this.registerForm.value.number).subscribe({
        next: data => {
          this.businessData.latitude = data.features[0].geometry.coordinates[1]
          this.businessData.longitude = data.features[0].geometry.coordinates[0]
        },
        error: error => {
          console.error('There waw an errror', error.message);
        }
      })



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
      this.submitNotOk = false;
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

    if (this.imagesToShow.length === 0) {
      this.submitNotOk = true;
    }
  }

}

