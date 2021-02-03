import { Component, OnInit } from '@angular/core';
import { ResponseServices, ServiceData } from 'src/app/admin/models/services.models';
import { ServicesService } from 'src/app/admin/services/services.service';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent implements OnInit {
  // displayedColumns = ['name', 'description', 'price', 'duration', 'actions'];
  displayedColumns = ['name', 'price', 'duration', 'actions'];

  services: Array<ServiceData> = [];

  constructor(private servicesService: ServicesService) { }

  ngOnInit(): void {
    this.servicesService.getAll().subscribe(res => {
      console.log(res);

      this.services = res.data;
    })

  };

  deleteService(id: number) {
    this.servicesService.delete(id).subscribe((res) => {

      console.log('uspesno');

      this.services = this.services.filter(item => item.id !== id);
    });
  }

}
