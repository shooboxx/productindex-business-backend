import { StoreContact } from './contact/storeContactType';
import { StoreHours } from './hours/storeHoursType';
export interface BusinessStore {

    id: number;
    business_id: number;
    unique_name: string;
    address_line_1?: string;
    address_line_2?: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    state?: string;
    postal_code?: string;
    is_primary?: boolean;
    temp_or_perm_closure?: string;
    reopen_date?: string;
    public: boolean;
    private_key?: string;
    insert_date?: Date;
    update_date?: Date;
    StoreContact: StoreContact;
    StoreHours: StoreHours;
  }

export interface CreateBusinessStore {
    business_id: number;
    unique_name: string;
    address_line_1?: string;
    address_line_2?: string;
    latitude?: number;
    longitude?: number;
    city?: string;
    state?: string;
    public: boolean;
    private_key?: string;
    postal_code?: string;
    StoreContact: StoreContact;
}