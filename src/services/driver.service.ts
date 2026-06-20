import apiClient from "./api.client";

export interface Driver {
  id: string;
  driverCode: string;
  user: {
    id: string;
    name: string;
    email: string;
    mobile: string;
  };
  licenseNumber: string;
  licenseExpiry: string;
  availabilityStatus: "AVAILABLE" | "ON_TRIP" | "OFFLINE" | "ON_LEAVE";
  vehicle: {
    id: string;
    vehicleNumber: string;
    vehicleType: string;
  };
  rating: number;
  totalTrips: number;
  companyId: string;
  active: boolean;
  eligibleForAssignment: boolean;
  deleted: boolean;
}

export interface CreateDriverRequest {
  userId: string;
  licenseNumber: string;
  licenseExpiry: string;
  vehicleId?: string;
  companyId: string;
}

export const driverService = {
  getAll: async (companyId: string, status?: string): Promise<Driver[]> => {
    const params = new URLSearchParams({ companyId });
    if (status) {
      params.append("status", status);
    }
    const response = await apiClient.get(`/drivers?${params.toString()}`);
    return response.data.data;
  },

  getById: async (id: string): Promise<Driver> => {
    const response = await apiClient.get(`/drivers/${id}`);
    return response.data.data;
  },

  create: async (data: CreateDriverRequest): Promise<Driver> => {
    const response = await apiClient.post("/drivers", data);
    return response.data.data;
  },

  updateAvailability: async (id: string, status: string): Promise<Driver> => {
    const response = await apiClient.patch(`/drivers/${id}/availability?status=${status}`);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/drivers/${id}`);
  },
};
