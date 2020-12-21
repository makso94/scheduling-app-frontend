import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ServicesService } from 'src/app/admin/services/services.service';

class DurationData {
  constructor(
    public duration: number,
    public selected: boolean
  ) { }
}

@Component({
  selector: 'app-admin-service',
  templateUrl: './admin-service.component.html',
  styleUrls: ['./admin-service.component.css']
})
export class AdminServiceComponent implements OnInit {
  id: string | null | undefined;
  public durations: Array<DurationData> = [];



  form: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.maxLength(32)]],
    description: ['', [Validators.maxLength(32)]],
    price: [, [Validators.required]],
    duration: [, [Validators.required]]
  });

  constructor(
    private fb: FormBuilder,
    private servicesService: ServicesService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    // fills duration time
    for (let i = 15; i <= 180; i += 15) {
      this.durations.push(new DurationData(i, false));
    }



    if (this.id) {
      this.servicesService.get(+this.id).subscribe(res => {
        console.log(res);
        this.form.get('name')?.patchValue(res.data.name);
        this.form.get('description')?.patchValue(res.data.description);
        this.form.get('price')?.patchValue(res.data.price);
        this.form.get('duration')?.patchValue(res.data.duration);

        // selects mat-chip on edit
        const index = this.durations.findIndex(item => item.duration === res.data.duration);

        if (this.durations[index]) {
          this.durations[index].selected = true;
        }

      });
    }
  }

  onChipSelected(event: any, item: DurationData): void {

    if (event.selected) {
      this.form.get('duration')?.patchValue(item.duration);
    }

  }


  onSubmit(): void {
    if (this.id) {
      this.servicesService.update(this.form.value, this.id).subscribe(
        res => {
          this.router.navigate(['/admin', 'services']);
        });
    }
    else {
      this.servicesService.create(this.form.value).subscribe(
        res => {
          this.router.navigate(['/admin', 'services']);
        });
    }
  }

}
