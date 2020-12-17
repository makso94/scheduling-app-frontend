import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ServicesService } from 'src/app/admin/services/services.service';

@Component({
  selector: 'app-create-service',
  templateUrl: './create-service.component.html',
  styleUrls: ['./create-service.component.css']
})
export class CreateServiceComponent implements OnInit {

  form: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    price: [, [Validators.required]],
    duration: [, [Validators.required]]
  });;

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService
  ) { }

  ngOnInit(): void {
    console.log(this.form);
    
  }


  createService() {
    this.servicesService.create(this.form.value).subscribe(res => {
      console.log(res);

    })
  }

}
