import { useEffect, useState } from 'react';
import { getTeams, createTeam, deleteTeam } from '../services/api';

const TeamsList = () => {
  const [teams, setTeams] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [foundedYear, setFoundedYear] = useState('');

  const fetchTeams = async () => {
    try {
      const response = await getTeams();
      setTeams(response.data);
    } catch (error) {
      console.error("Error fetching teams", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    await createTeam({ name, city, foundedYear: parseInt(foundedYear) });
    setName('');
    setCity('');
    setFoundedYear('');
    fetchTeams();
  };

  const handleDelete = async (id: number) => {
    await deleteTeam(id);
    fetchTeams();
  };

  return (
    <div className="animate-fade-in">
      <h3 className="page-title">Gestión de Equipos</h3>
      
      <div className="glass-panel">
        <h4 className="section-title">Inscribir Nuevo Club</h4>
        <form onSubmit={handleCreate} className="form-grid">
          <div className="input-group">
            <label>Nombre del Club</label>
            <input type="text" className="input-glass" placeholder="Ej. Real Madrid CF" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Ciudad</label>
            <input type="text" className="input-glass" placeholder="Ej. Madrid" value={city} onChange={e => setCity(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Año de Fundación</label>
            <input type="number" className="input-glass" placeholder="Ej. 1902" value={foundedYear} onChange={e => setFoundedYear(e.target.value)} />
          </div>
          <button type="submit" className="btn-premium btn-primary">Crear Club</button>
        </form>
      </div>

      <div className="data-list">
        {teams.map(team => (
          <div key={team.id} className="data-card">
            <div className="card-content">
              <h4 className="card-title">{team.name}</h4>
              <p className="card-subtitle">📍 {team.city}</p>
              <span className="card-badge">Fund. {team.foundedYear}</span>
            </div>
            <div className="card-actions">
              <button className="btn-premium btn-danger" onClick={() => handleDelete(team.id)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamsList;
