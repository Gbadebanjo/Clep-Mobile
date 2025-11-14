import BaseAPI from '@/apis/base-api';
import {
    AIMeasurement,
    Measurement,
    SharedMeasurement,
    SharedTo,
} from '@/types/measurement';

export class MeasurementAPI extends BaseAPI {

    // constructor(token?: string) {
    //     super(token);
    // }

    public async uploadAIMeasurement(data: {
        username: string;
        height: string;
        image: File;
    }): Promise<{ data: { measurements: Measurement } }> {
        const formData = new FormData();
        Object.entries(data).forEach(([key, value]) =>
            formData.append(key, value)
        );
        const response = await this.axiosInstance.post('/ai-upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        console.log(`response.data`, response.data);
        return response.data;
    }

    public async customerMeasurement(): Promise<{
        data: { measurements: Measurement };
    }> {
        const response = await this.axiosInstance.get(`/measurements/me`);
        console.log("Ai", response.data);
        return response.data;
    }

    public async submitManualMeasurement(data: {
        entries: { name: string; value: string }[];
        id?: string;
    }): Promise<any> {
        const response = await this.axiosInstance.post(
            `/manual-measurements`,
            data
        );
        return response.data;
    }

    public async updateManualMeasurement(data: {
        entries: { name: string; value: string }[];
        id?: string;
    }): Promise<any> {
        const response = await this.axiosInstance.patch(
            `/manual-measurements/${data.id}`,
            data
        );
        return response.data;
    }

    public async getManualMeasurement(): Promise<any> {
        const response = await this.axiosInstance.get(`/manual-measurements`);
        return response.data;
    }

    public async queryMeasurement(
        query: Record<string, any>
    ): Promise<{ data: { docs: Measurement[] } }> {
        const response = await this.axiosInstance.get(`/measurements`, {
            params: query,
        });
        return response.data;
    }

    public async vendorSharedMeasurement(
        id: string
    ): Promise<{ data: { docs: SharedMeasurement[] } }> {
        const response = await this.axiosInstance.get(
            `/shared-measurements/vendor/view/${id}`
        );
        return response.data;
    }

    public async vendorMeasurement(
        query: Record<string, any>
    ): Promise<{ data: { docs: SharedMeasurement[] } }> {
        const response = await this.axiosInstance.get(`/shared-measurements`, {
            params: query,
        });
        return response.data;
    }

    public async userSharedMeasurements(): Promise<{
        data: { doc: SharedTo };
    }> {
        const response = await this.axiosInstance.get(
            `/shared-measurements/user/shared`
        );
        return response.data;
    }

    public async vendorSharedMeasurements(): Promise<{
        data: { docs: SharedMeasurement[] };
    }> {
        const response = await this.axiosInstance.get(
            `/shared-measurements/vendor/shared`
        );
        return response.data;
    }

    public async createMeasurement(
        data: AIMeasurement
    ): Promise<{ data: { doc: Measurement } }> {
        const response = await this.axiosInstance.post(
            `/measurements/update`,
            data
        );
        return response.data;
    }

    public async shareMeasurement(
        data: any
    ): Promise<{ data: { doc: Measurement } }> {
        const response = await this.axiosInstance.post(
            `/shared-measurements/share`,
            data
        );
        return response.data;
    }

    public async revokeSharedMeasurement(
        vendor: string,
        measurementId: string
    ): Promise<{ data: { doc: Measurement } }> {
        const response = await this.axiosInstance.post(
            `/shared-measurements/revoke/${measurementId}`,
            { vendor }
        );
        return response.data;
    }
}
