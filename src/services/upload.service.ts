import apiClient from "./api.client";

export interface RowError {
  rowNumber: number;
  columnName: string;
  message: string;
  rawValue: string;
}

export interface UploadResponseDto {
  uploadId: string;
  fileName: string;
  totalRows: number;
  successRows: number;
  failedRows: number;
  status: string;
  errors: RowError[];
}

export const uploadService = {
  uploadCandidates: async (file: File, companyId: string, uploadedBy: string): Promise<UploadResponseDto> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post(
      `/upload/candidates?companyId=${companyId}&uploadedBy=${uploadedBy}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  getHistory: async (companyId: string, page = 0, size = 20): Promise<any> => {
    const response = await apiClient.get(`/upload/history?companyId=${companyId}&page=${page}&size=${size}`);
    return response.data.data;
  },
};
