export type DialogType = 'component' | 'alert' | 'confirm';
export type DialogPosition = 'centered' | 'scrollable'
export type DialogSize = 'sm' | 'lg' | 'xl'

export class DialogContext<D = any> {
    data?: D;
    type?: DialogType = 'component';
    position? : DialogPosition;
    title?: string;
    message?: string;
    size?: DialogSize; 
    save_btn_label?: string = 'Save';
  }
  
  export type MessageBoxType = 'alert' | 'confirm';


export class MessageBoxContext{
    data?:DialogContext;
    classes?:string;
    type?:MessageBoxType
    title!: string;
    message!: string;
    okBtnText!:string
    acceptBtnText!:string;
    rejectBtnText!:string;
}