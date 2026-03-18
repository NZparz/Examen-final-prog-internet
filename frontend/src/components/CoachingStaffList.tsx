import { useEffect, useState } from 'react';
import { getCoachingStaffs, createCoachingStaff, deleteCoachingStaff, getTeams } from '../services/api';

const CoachingStaffList = () => {
  const [staff, setStaff] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [teamId, setTeamId] = useState('');

  const fetchData = async () => {
    const staffRes = await getCoachingStaffs();
    setStaff(staffRes.data);
    const teamsRes = await getTeams();
    setTeams(teamsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    await createCoachingStaff({ name, role, teamId: parseInt(teamId) });
    setName(''); setRole(''); setTeamId('');
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await deleteCoachingStaff(id);
    fetchData();
  };

  return (
    <div className="animate-fade-in">
      <h3 className="page-title">Cuerpo Técnico</h3>
      
      <div className="glass-panel">
        <h4 className="section-title">Contratar Personal</h4>
        <form onSubmit={handleCreate} className="form-grid">
          <div className="input-group">
            <label>Nombre</label>
            <input type="text" className="input-glass" placeholder="Ej. Carlo Ancelotti" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Rol</label>
            <input type="text" className="input-glass" placeholder="Ej. Entrenador Principal" value={role} onChange={e => setRole(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Asignar Equipo</label>
            <select className="input-glass" value={teamId} onChange={e => setTeamId(e.target.value)} required>
              <option value="">Selecciona un Equipo...</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <button type="submit" className="btn-premium btn-primary">Contratar</button>
        </form>
      </div>

      <div className="data-list">
        {staff.map(s => (
          <div key={s.id} className="data-card">
            <div className="card-content">
              <h4 className="card-title">{s.name}</h4>
              <p className="card-subtitle">Cargo: {s.role}</p>
              <span className="card-badge">📋 {s.team?.name || 'Sin Equipo'}</span>
            </div>
            <div className="card-actions">
              <button className="btn-premium btn-danger" onClick={() => handleDelete(s.id)}>Destituir</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CoachingStaffList;
