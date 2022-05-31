import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserBusiness } from 'src/app/shared/models/user-business.model';
import { DatabaseService } from 'src/app/shared/services/database.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {

  uid: string = '';
  businessData: UserBusiness | undefined;
  business: UserBusiness | undefined;
  photos: any;

  constructor(
    private route: ActivatedRoute,
    private dbService: DatabaseService,
  ) { }

  ngOnInit(): void {
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
}
