export type FieldsErrors = {
    [field: string]: string[];
  };
  
  export interface IValidatorFieldsInterface<PropsValidated> {
    errors: FieldsErrors;
    validatedData: PropsValidated;
    validate(data: any): boolean;
  }
  
  export default IValidatorFieldsInterface;