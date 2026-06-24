import apiClient from "./api.client";

export interface AuditLog {
  id: string;
  actorId: string;
  actorEmail: string;
  action: string;
  resourceType: string;
  resourceId: string;
  oldValue?: any;
  newValue?: any;
  ipAddress: string;
  userAgent: string;
  result: string;
  errorMessage?: string;
  companyId: string;
  createdAt: string;
}

export interface PageResponseAuditLog {
  content: AuditLog[];
  pageNumber: number;
  pageSize: number;
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  empty: boolean;
}

export const auditService = {
  getLogs: async (companyId: string, page = 0, size = 50, resourceType?: string): Promise<PageResponseAuditLog> => {
    const params = new URLSearchParams({ companyId, page: page.toString(), size: size.toString() });
    if (resourceType) {
      params.append("resourceType", resourceType);
    }
    const response = await apiClient.get(`/audit?${params.toString()}`);
    return response.data.data;
  },
};
