import { Appointment } from 'src/app/shared/services/appointments.model';

export class RequestWorkingDays {
    year!: number;
    month!: number;
    days: Array<number> = [];
    opens!: string;
    closes!: string;
}


export class ResponseWorkingDays {
    data!: Array<WorkingDaysWithAppointments>;

}

export class WorkingDaysWithAppointments {
    id!: number;
    date!: string;
    opens!: string;
    closes!: string;
    is_business_day!: number;
    appointments!: Array<Appointment>;
}
