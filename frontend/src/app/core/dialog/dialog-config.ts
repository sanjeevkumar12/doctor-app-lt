export class DialogConfig<D = any> {
  data?: D;
  title? : string;
  message?: string;
}

export class ConfirmDialogModel {

  constructor(public title: string, public message: string) {
  }
}

export class AlertDialogConfig extends DialogConfig  {
  title? : string;
  message?: string;

}
