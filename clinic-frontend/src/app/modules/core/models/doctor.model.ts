export interface Doctor {
    first_name: string;
    last_name: string;
    email: string,
    password?: string,
    confirm_password?: string,
    license: string,
    phone_number: string,
    available_service: [],
    medical_specialities: [],
    date_of_birth: [],
}