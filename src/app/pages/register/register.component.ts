import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';

const REGISTER_LEAD = gql`
  mutation register(
    $name: String!
    $email: String!
    $mobile: String!
    $postcode: String!
    $services: [ServiceType!]!  
  ) {
    register(name: $name, email: $email, mobile: $mobile, postcode: $postcode, services: $services) {
      id
      name
      email
      mobile
      postcode
      services {
        type
      }
    }
  }
`;

enum ServiceType {
  DELIVERY = "DELIVERY",
  PICKUP = "PICKUP",
  PAYMENT = "PAYMENT"
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  lead = {
    name: '',
    email: '',
    mobile: '',
    postcode: '',
    services: [] as ServiceType[],  
  };

  availableServices = Object.values(ServiceType); 

  constructor(private apollo: Apollo) {}

  registerLead() {
    this.apollo
      .mutate({
        mutation: REGISTER_LEAD,
        variables: {
          name: this.lead.name,
          email: this.lead.email,
          mobile: this.lead.mobile,
          postcode: this.lead.postcode,
          services: this.lead.services,
        },
      })
      .subscribe(
        (response) => {
          console.log('Lead registered:', response);
        },
        (error) => {
          console.error('Error registering lead:', error);
        }
      );
  }

  toggleService(service: string, event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    const serviceEnum = service as ServiceType;
  
    if (checked) {
      this.lead.services.push(serviceEnum);
    } else {
      this.lead.services = this.lead.services.filter(s => s !== serviceEnum);
    }
  }
}
