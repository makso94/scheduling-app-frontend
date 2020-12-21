export class ResponseServices {
    data!: Array<ServiceData>;
}

export class ResponseService {
    data!: ServiceData;
}

export class ServiceData {
    id!: number;
    name!: string;
    description!: string;
    price!: number;
    duration!: number;
    mario!: string;
}

