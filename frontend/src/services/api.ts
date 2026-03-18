import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api',
});

export const getTeams = () => api.get('/teams');
export const getTeam = (id: number) => api.get(`/teams/${id}`);
export const createTeam = (team: any) => api.post('/teams', team);
export const deleteTeam = (id: number) => api.delete(`/teams/${id}`);

export const getPlayers = () => api.get('/players');
export const createPlayer = (player: any) => api.post('/players', player);
export const deletePlayer = (id: number) => api.delete(`/players/${id}`);

export const getCoachingStaffs = () => api.get('/coachingstaffs');
export const createCoachingStaff = (staff: any) => api.post('/coachingstaffs', staff);
export const deleteCoachingStaff = (id: number) => api.delete(`/coachingstaffs/${id}`);

export default api;
