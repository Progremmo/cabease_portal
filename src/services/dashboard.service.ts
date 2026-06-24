import apiClient from "./api.client";

export interface DashboardStatsDto {
  totalDrivers: number;
  availableDrivers: number;
  totalCandidates: number;
  activeCandidates: number;
  tripsToday: number;
  tripsCompleted: number;
  tripsCancelled: number;
  tripsInProgress: number;
  tripsAssigned: number;
  tripsCreated: number;
}

export const dashboardService = {
  getStats: async (companyId: string): Promise<DashboardStatsDto> => {
    const response = await apiClient.get(`/dashboard/stats?companyId=${companyId}`);
    return response.data.data;
  },
};
