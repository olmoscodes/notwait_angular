import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserBusiness } from 'src/app/shared/models/user-business.model';
import { DatabaseService } from 'src/app/shared/services/database.service';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { gsap } from 'gsap';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  
  faArrowLeft = faArrowLeft;

  uid: string = '';
  businessData: UserBusiness | undefined;
  business: UserBusiness | undefined;
  photos: any;
  businessDataAnimationCounter = 0;

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
  ) { }

  ngOnInit(): void {

    this.dotsAnimation();

    this.uid = this.route.snapshot.params['id'];

    this.dbService.getDocByFieldAndData("photos", "uuid_user", this.uid).then((data) => {
      this.dbService.getImage(data['uuid_photo']).then((image: any) => {
        this.photos = image;
      }).then(() => {
        this.dbService.getDocByFieldAndData("business", "uid", this.uid).then((element) => {
          this.business = {
            uid: element["uid"],
            businessName: element["businessName"],
            description: element["description"],
            country: element["country"],
            stateProvince: element["stateProvince"],
            city: element["city"],
            postalCode: element["postalCode"],
            street: element["street"],
            number: element["number"],
            floor: element["floor"],
            door: element["door"],
            phone: element["phone"],
            category: element["category"],
            openingHour: element["openingHour"],
            closingHour: element["closingHour"],
            url: element["url"],
            email: element["email"],
            password: element["password"],
            latitude: element["latitude"],
            longitude: element["longitude"],
            imgURL: this.photos,
            distance: 0,
          };
        })
          .finally(() => {
            this.businessData = this.business;
          });
      })
    });
  }

  dotsAnimation() {
    const loadingDots = gsap.timeline()
    loadingDots.to(".loadingBox", {opacity: 1, pointerEvents: "all"})
    .fromTo(".d1", 0.2, {backgroundColor: '#5fce62'}, {backgroundColor: '#cccccc', repeat: -1, yoyo: true, repeatDelay: 0.4}, "-=0.5")
    .fromTo(".d2", 0.2, {backgroundColor: '#5fce62'}, {backgroundColor: '#cccccc', repeat: -1, yoyo: true, repeatDelay: 0.4}, "+=0.2" )
    .fromTo(".d3", 0.2, {backgroundColor: '#5fce62'}, {backgroundColor: '#cccccc', repeat: -1, yoyo: true, repeatDelay: 0.4}, "+=0.4" );
  }

  businessDataAnimation() {
    const introAnimation = gsap.timeline()
    introAnimation.to(".loadingData", 0.5, {opacity: 0, pointerEvents: "none"}, '+=3')
    .to(".loadingData", 0, {display: "none"}, "-=0.5")
    .fromTo(".navbar", 0.5, {boxShadow: "0 0 10px 10px rgba(0,0,0,0)"}, {boxShadow: "0 0 10px 10px rgba(0,0,0,0.04)"}, "-=0.5")
    .fromTo(".card", 0.5, {y: +15}, {y: 0}, '-=0.5')
    .fromTo('.businessImg', 0.5 ,{opacity: 0}, {opacity: 1}, '-=0.5')
    this.businessDataAnimationCounter++;
  }
}
