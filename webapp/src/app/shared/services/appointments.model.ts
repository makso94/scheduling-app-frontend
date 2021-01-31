import { ServiceData } from 'src/app/admin/models/services.models';

export class ResponseAppointments {
    data!: Array<Appointment>;
}

export class Appointment {
    id!: number;
    working_days_id!: number;
    users_id!: number;
    start!: Date;
    end!: Date;
    services!: Array<ServiceData>;
}
