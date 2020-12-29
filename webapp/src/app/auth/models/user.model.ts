export class ResponseUsers {
    data!: Array<User>;
}


export class User {
    id!: number;
    first_name!: string;
    last_name!: string;
    email!: string;
    password!: string;
    is_admin: number | undefined;
    created_at: any;
    updated_at: any;
    verified_at: any;
    deactived_at: any;
}


