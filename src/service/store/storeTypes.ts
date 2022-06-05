export interface BusinessStore {
    id: number;
    business_id: number;
    unique_name: string;
    email?: string;
    phone?: string;
    phone_2?: string;
    phone_3?: string;
    address_line_1?: string;
    address_line_2?: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    is_primary?: boolean;
    temp_or_perm_closure?: string;
    reopen_date?: string;
    insert_date: Date;
    update_date: Date;
  }

export interface CreateBusinessStore {
    business_id: number;
    unique_name: string;
    email?: string;
    phone?: string;
    phone_2?: string;
    phone_3?: string;
    address_line_1?: string;
    address_line_2?: string;
    latitude?: number;
    longitude?: number;
    country?: string;
    city?: string;
    state?: string;
    postal_code?: string;
    is_primary?: boolean;
    temp_or_perm_closure?: string;
    reopen_date?: string;
}