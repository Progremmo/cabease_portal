import apiClient from './api.client';

export interface BlogDTO {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  coverImageUrl?: string;
  status: string;
  authorName: string;
  publishedAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PaginatedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}

export interface BlogCreateRequest {
  title: string;
  slug?: string;
  content: string;
  excerpt?: string;
  coverImageUrl?: string;
  status: 'DRAFT' | 'PUBLISHED';
}

export const blogService = {
  // Admin Methods
  getAllBlogs: async (page = 0, size = 10): Promise<PaginatedResponse<BlogDTO>> => {
    const res = await apiClient.get('/blogs', { params: { page, size } });
    return res.data.data;
  },

  getBlogById: async (id: string): Promise<BlogDTO> => {
    const res = await apiClient.get(`/blogs/${id}`);
    return res.data.data;
  },

  createBlog: async (data: BlogCreateRequest): Promise<BlogDTO> => {
    const res = await apiClient.post('/blogs', data);
    return res.data.data;
  },

  updateBlog: async (id: string, data: BlogCreateRequest): Promise<BlogDTO> => {
    const res = await apiClient.put(`/blogs/${id}`, data);
    return res.data.data;
  },

  deleteBlog: async (id: string): Promise<void> => {
    await apiClient.delete(`/blogs/${id}`);
  },

  // Public Methods
  getPublicBlogs: async (page = 0, size = 10): Promise<PaginatedResponse<BlogDTO>> => {
    const res = await apiClient.get('/public/blogs', { params: { page, size } });
    return res.data.data;
  },

  getPublicBlogBySlug: async (slug: string): Promise<BlogDTO> => {
    const res = await apiClient.get(`/public/blogs/${slug}`);
    return res.data.data;
  },
};
