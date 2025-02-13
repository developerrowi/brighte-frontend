import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { gql, Apollo } from 'apollo-angular';
import { FormsModule } from '@angular/forms';

const GET_LEADS = gql`
  query GetLeads {
    leads {
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

const GET_LEAD_BY_NAME = gql`
  query lead($name: String!) {
    lead(name: $name) {
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

@Component({
  selector: 'app-lead-list',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './lead-list.component.html',
  styleUrls: ['./lead-list.component.css'],
})
export class LeadListComponent implements OnInit {
  leads: any[] = [];
  searchQuery: string = '';
  loading = true;
  error: any;

  constructor(private apollo: Apollo) {}

  ngOnInit() {
    this.fetchLeads();
  }

  fetchLeads() {
    this.apollo
      .watchQuery({ query: GET_LEADS })
      .valueChanges.subscribe(({ data, loading, error }: any) => {
        this.leads = data?.leads || [];
        this.loading = loading;
        this.error = error;
      });
  }

  searchLead() {
    if (!this.searchQuery.trim()) {
      this.fetchLeads(); // Reset if search is empty
      return;
    }

    this.apollo
      .watchQuery({ query: GET_LEAD_BY_NAME, variables: { name: this.searchQuery } })
      .valueChanges.subscribe(({ data, loading, error }: any) => {
        this.leads = data?.lead ? [data.lead] : [];
        this.loading = loading;
        this.error = error;
      });
  }
}
