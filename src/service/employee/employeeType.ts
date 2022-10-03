export interface EmployeeSearch {
    firstName?: string;
    lastName?: string;
    accessLevel?: string;
}

export interface Employee {
    id: number;
    business_id: number;
    user_id: number;
    business_access_level: string;
    employee_verify_code: string;
    verified_date: Date;
    deleted_date: Date;
    insert_date?: Date;
    update_date?: Date;
}