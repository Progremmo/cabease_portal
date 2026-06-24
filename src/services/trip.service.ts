import apiClient from "./api.client";
import { Candidate } from "./candidate.service";
import { Driver } from "./driver.service";

export interface Trip {
  id: string;
  tripNumber: string;
  driver?: Driver;
  candidate: Candidate;
  status: "CREATED" | "ASSIGNED" | "STARTED" | "PICKED_UP" | "IN_PROGRESS" | "DROPPED" | "COMPLETED" | "CANCELLED";
  pickupTime?: string;
  dropTime?: string;
  scheduledPickupAt?: string;
  distanceKm?: number;
  durationMinutes?: number;
  otpCode?: string;
  otpVerified: boolean;
  cancellationReason?: string;
  cancelledBy?: string;
  companyId: string;
  active: boolean;
  deleted: boolean;
}

export interface PageResponseTrip {
  content: Trip[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const tripService = {
  getAll: async (companyId: string, page = 0, size = 20): Promise<PageResponseTrip> => {
    const response = await apiClient.get(`/trips?companyId=${companyId}&page=${page}&size=${size}`);
    return response.data.data;
  },

  getById: async (id: string): Promise<Trip> => {
    const response = await apiClient.get(`/trips/${id}`);
    return response.data.data;
  },

  create: async (candidateId: string, companyId: string, scheduledPickupAt?: string): Promise<Trip> => {
    const params = new URLSearchParams({ candidateId, companyId });
    if (scheduledPickupAt) {
      params.append("scheduledPickupAt", scheduledPickupAt);
    }
    const response = await apiClient.post(`/trips?${params.toString()}`);
    return response.data.data;
  },

  update: async (tripId: string, candidateId?: string, scheduledPickupAt?: string): Promise<Trip> => {
    const params = new URLSearchParams();
    if (candidateId) params.append("candidateId", candidateId);
    if (scheduledPickupAt) params.append("scheduledPickupAt", scheduledPickupAt);
    
    const response = await apiClient.put(`/trips/${tripId}?${params.toString()}`);
    return response.data.data;
  },

  assignDriver: async (tripId: string, companyId: string, driverId?: string, assignmentType: "AUTO" | "MANUAL" = "AUTO"): Promise<Trip> => {
    const params = new URLSearchParams({ companyId, assignmentType });
    if (driverId) {
      params.append("driverId", driverId);
    }
    const response = await apiClient.patch(`/trips/${tripId}/assign?${params.toString()}`);
    return response.data.data;
  },

  startTrip: async (tripId: string): Promise<Trip> => {
    const response = await apiClient.patch(`/trips/${tripId}/start`);
    return response.data.data;
  },
  
  cancelTrip: async (tripId: string, reason?: string): Promise<Trip> => {
    const params = new URLSearchParams();
    if (reason) params.append("reason", reason);
    const response = await apiClient.patch(`/trips/${tripId}/cancel?${params.toString()}`);
    return response.data.data;
  }
};
