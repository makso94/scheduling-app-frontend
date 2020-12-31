import { HttpRequest } from '@angular/common/http';
import { v4 as uuidv4 } from 'uuid';

export class ToastrMeta {
    uuid: string = uuidv4();
    request!: HttpRequest<any>;
    response: any;
    params = new ToastrMetaParams();
}


export class ToastrMetaParams {
    exclude: Array<number> = [];
}
