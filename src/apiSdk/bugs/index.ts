import axios from 'axios';
import queryString from 'query-string';
import { BugInterface, BugGetQueryInterface } from 'interfaces/bug';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getBugs = async (query?: BugGetQueryInterface): Promise<PaginatedInterface<BugInterface>> => {
  const response = await axios.get('/api/bugs', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createBug = async (bug: BugInterface) => {
  const response = await axios.post('/api/bugs', bug);
  return response.data;
};

export const updateBugById = async (id: string, bug: BugInterface) => {
  const response = await axios.put(`/api/bugs/${id}`, bug);
  return response.data;
};

export const getBugById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/bugs/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteBugById = async (id: string) => {
  const response = await axios.delete(`/api/bugs/${id}`);
  return response.data;
};
