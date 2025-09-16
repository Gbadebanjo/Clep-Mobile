import BaseAPI from '@/apis/base-api';
import { CreatePlanForm, PlansResponse, UpdatePlanForm } from '@/types/plans';

export class PlansAPI extends BaseAPI {
    constructor(token?: string) {
        super(token);
    }
    public async createPlan(
        data: CreatePlanForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.post('/plans', data);
        return response.data;
    }

    public async getPlans(): Promise<{ data: PlansResponse }> {
        const response = await this.axiosInstance.get('/plans');
        return response.data;
    }

    public async getPlanById(
        id: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.get(`/plans/${id}`);
        return response.data;
    }

    public async updatePlan(
        id: string,
        data: UpdatePlanForm
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.patch(`/plans/${id}`, data);
        return response.data;
    }

    public async comparePlans(
        planId: string
    ): Promise<{ [key: string]: string | number }> {
        const response = await this.axiosInstance.get(`/plans/compare`);
        return response.data;
    }
}
