import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/shared/services/auth.service";
import { DatabaseService } from "src/app/shared/services/database.service";
//import { v4 as uuidv4 } from 'uuid';
import { UserBusiness } from "src/app/shared/models/user-business.model";
import { GeoService } from "src/app/shared/services/geo.service";
import { gsap } from "gsap";
import { Router } from "@angular/router";
import { faGear } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {

  faGear = faGear;

  businessBoxes: Array<UserBusiness> = new Array();
  //businessBoxes : any[] = [];
  clientLatitude: any = 0;
  clientLongitude: any = 0;
  ok: boolean = false;
  geoMessage: boolean = true;

  imagesLoaded: Array<any> = new Array();

  loader = 0;
  lineLoaded = "";
  lineNotLoaded = "";

  dataLoaded: Array<any> = new Array();

  constructor(
    private dbService: DatabaseService,
    public geolocate: GeoService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loading()

    const introAnimation = gsap.timeline()
    introAnimation.to(".intro", 0.5, {opacity: 0, pointerEvents: "none"}, '+=3')
    .fromTo(".navbar", 0.5, {boxShadow: "0 0 10px 10px rgba(0,0,0,0)"}, {boxShadow: "0 0 10px 10px rgba(0,0,0,0.04)"}, "-=0.5")
    .to(".gear-settings", 0.5, {opacity: 1, pointerEvents: "auto"}, '=0.5')

    this.geolocate
      .getPosition()
      .then((position) => {
        this.clientLatitude = parseFloat(position[0]).toFixed(7);
        this.clientLongitude = parseFloat(position[1]).toFixed(7);
      })
      .then(async () => {
        this.geoMessage = false;
        let business = this.dbService.getDocs("business");

        (await business).forEach((element) => {
          const business = {
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
            imgURL: "",
            distance: 0,
          };

          this.businessBoxes.push(business);
        });

        let photos = this.dbService.getDocs("photos");

        let counter = 0;

        this.businessBoxes.forEach(async (element) => {
          if (element["uid"]) {
            let uid = element["uid"];
            (await photos).reverse().forEach((e) => {
              if (e["uuid_user"] === uid) {
                let photo = this.dbService.getImage(e["uuid_photo"]);
                photo
                  .then((url) => {
                    if (url) {
                      element["imgURL"] = url;
                      // let element: HTMLElement = document.getElementsByClassName('myimg' + counter)[0] as HTMLElement;
                      // element!.setAttribute('src', url);
                    }
                  })
                  .finally(() => {
                    counter++;

                  })
                  .catch((error) => {
                    // Handle any errors
                  });
              }
            });
          }
          let businessLatitude: any = parseFloat(element["latitude"]).toFixed(
            7
          );
          let businessLongitude: any = parseFloat(element["longitude"]).toFixed(
            7
          );

          element["distance"] = this.getDistanceBetweenPoints(
            this.clientLatitude,
            this.clientLongitude,
            businessLatitude,
            businessLongitude
          );
        });


      })
      .catch( () => {
        this.router.navigate(['/location-info']);
      });
      
  }

  getDistanceBetweenPoints(
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ) {
    // The radius of the planet earth in meters
    let R = 6378137;
    let dLat = this.degreesToRadians(lat2 - lat1);
    let dLong = this.degreesToRadians(lng2 - lng1);
    let a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.degreesToRadians(lat1)) *
        Math.cos(this.degreesToRadians(lat1)) *
        Math.sin(dLong / 2) *
        Math.sin(dLong / 2);

    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let distance = R * c;

    return distance * 0.001;
  }

  degreesToRadians(degrees: number) {
    return (degrees * Math.PI) / 180;
  }

  private async loading() {
    for (let index = 0; index < 100; index++) {
      await new Promise((resolve) => setTimeout(resolve, 20));
      this.loader++;
      this.lineLoaded = this.loader.toString() + "%";
      this.lineNotLoaded = 100 - this.loader + "%";
    }
  }

  sortByDistance() {
    return this.businessBoxes.sort((a, b) => a['distance'] > b['distance'] ? 1 : a['distance'] === b['distance'] ? 0 : -1);
  }

  dotsAnimation() {
    const loadingDots = gsap.timeline({paused: true})

    loadingDots.fromTo(".d1", 0.2, {backgroundColor: '#5fce62'}, {backgroundColor: '#cccccc', repeat: -1, yoyo: true, repeatDelay: 0.4}, "-=0.5")
    .fromTo(".d2", 0.2, {backgroundColor: '#5fce62'}, {backgroundColor: '#cccccc', repeat: -1, yoyo: true, repeatDelay: 0.4}, "+=0.2" )
    .fromTo(".d3", 0.2, {backgroundColor: '#5fce62'}, {backgroundColor: '#cccccc', repeat: -1, yoyo: true, repeatDelay: 0.4}, "+=0.4" );
    
    loadingDots.play();

    const byeDots = gsap.timeline({paused: true})

    byeDots.to(".loadingBox", 2, {opacity: 0,})
    .to(".loadingBox", {display: "none"}, "-=-0.5");

    setTimeout(function() {
      loadingDots.pause()
      byeDots.play();
    }, 3000);


  }
}
