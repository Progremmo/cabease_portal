import apiClient from "./api.client";

export interface Candidate {
  id: string;
  candidateCode: string;
  name: string;
  email: string;
  mobile: string;
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  dropAddress: string;
  dropLatitude: number;
  dropLongitude: number;
  shiftTime: string;
  aadhaarNumber?: string;
  panNumber?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  gender?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  status: "ACTIVE" | "INACTIVE" | "ON_TRIP" | "COMPLETED";
  companyId: string;
  deleted: boolean;
}

export interface PageResponseCandidate {
  content: Candidate[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export interface CreateCandidateRequest {
  name: string;
  email?: string;
  mobile: string;
  pickupAddress: string;
  pickupLatitude: number;
  pickupLongitude: number;
  dropAddress: string;
  dropLatitude: number;
  dropLongitude: number;
  shiftTime?: string;
  aadhaarNumber?: string;
  panNumber?: string;
  dateOfBirth?: string;
  bloodGroup?: string;
  gender?: string;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  country?: string;
  postalCode?: string;
  companyId: string;
}

export const candidateService = {
  getAll: async (companyId: string, page = 0, size = 20): Promise<PageResponseCandidate> => {
    const response = await apiClient.get(`/candidates?companyId=${companyId}&page=${page}&size=${size}`);
    return response.data.data;
  },

  getById: async (id: string): Promise<Candidate> => {
    const response = await apiClient.get(`/candidates/${id}`);
    return response.data.data;
  },

  create: async (data: CreateCandidateRequest): Promise<Candidate> => {
    const response = await apiClient.post("/candidates", data);
    return response.data.data;
  },

  update: async (id: string, data: any): Promise<Candidate> => {
    const response = await apiClient.put(`/candidates/${id}`, data);
    return response.data.data;
  },

  delete: async (id: string): Promise<void> => {
    await apiClient.delete(`/candidates/${id}`);
  },
};
