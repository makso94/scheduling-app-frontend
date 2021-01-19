import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { format } from 'date-fns';
import { AppointmentsService } from 'src/app/services/appointments.service';
import { compareDateTime } from 'src/app/validators/form-validators';

@Component({
  selector: 'app-edit-working-day-dialog',
  templateUrl: './edit-working-day-dialog.component.html',
  styleUrls: ['./edit-working-day-dialog.component.css']
})
export class EditWorkingDayDialogComponent implements OnInit {

  form!: FormGroup;
  haveAppointments = false;
  editMode = true;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    console.log(this.data);

    this.form = this.fb.group({
      opens: ['', Validators.required],
      closes: ['', Validators.required]
    }, {
      validators: compareDateTime
    });

    if (this.data.createWorkingDay) {
      this.editMode = false;
      return;
    }
    if (this.data.day && this.data.appointments) {
      if (this.data.appointments.length > 0) {
        this.haveAppointments = true;
        return;
      }

      // edit mode

      this.form.get('opens')?.setValue(format(new Date(this.data.day.opens), 'HH:mm'));
      this.form.get('closes')?.setValue(format(new Date(this.data.day.closes), 'HH:mm'));

    }


  }

}
