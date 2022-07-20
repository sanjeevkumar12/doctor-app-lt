export class DialogConfig<D = any> {
  data?: D;
  title? : string;
  message?: string;
  type?: 'info'|'success'| 'danger'
}

