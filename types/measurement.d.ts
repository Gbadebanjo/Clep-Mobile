import { User } from './auth';
import { VendorProfile } from './vendor';

export type AIMeasurement = {
    height: string;
    waist: string;
    belly: string;
    chest: string;
    wrist: string;
    neck: string;
    arm_length: string;
    thigh: string;
    shoulder_width: string;
    hips: string;
    ankle: string;
};

export type Measurement = AIMeasurement & {
    id: string;
    status: string;
    createdAt: string;
    user: User;
    message: string;
};

export type MainMeasurement = {
    relationTo: string;
    value: any;
};

export type SharedMeasurement = {
    id: string;
    status: string;
    createdAt: string;
    user: User;
    measurements: MainMeasurement;
    vendor: string;
};

export type SharedTo = {
    docs: {
        id: string;
        user: User;
        vendor: string;
        measurements: AIMeasurement & {
            id: string;
            user: User;
        };
    }[];
};

export interface MeasurementResponseType {
    docs: Array<SharedMeasurement>;
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage: number | null;
    nextPage: number | null;
}
