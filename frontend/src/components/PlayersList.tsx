import { useEffect, useState } from 'react';
import { getPlayers, createPlayer, deletePlayer, getTeams } from '../services/api';

const PlayersList = () => {
  const [players, setPlayers] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [number, setNumber] = useState('');
  const [teamId, setTeamId] = useState('');

  const fetchData = async () => {
    const playersRes = await getPlayers();
    setPlayers(playersRes.data);
    const teamsRes = await getTeams();
    setTeams(teamsRes.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleCreate = async (e: any) => {
    e.preventDefault();
    await createPlayer({ name, position, number: parseInt(number), teamId: parseInt(teamId) });
    setName(''); setPosition(''); setNumber(''); setTeamId('');
    fetchData();
  };

  const handleDelete = async (id: number) => {
    await deletePlayer(id);
    fetchData();
  };

  return (
    <div className="animate-fade-in">
      <h3 className="page-title">Plantilla de Jugadores</h3>
      
      <div className="glass-panel">
        <h4 className="section-title">Fichar Nuevo Jugador</h4>
        <form onSubmit={handleCreate} className="form-grid">
          <div className="input-group">
            <label>Nombre</label>
            <input type="text" className="input-glass" placeholder="Ej. Lamine Yamal" value={name} onChange={e => setName(e.target.value)} required />
          </div>
          <div className="input-group">
            <label>Posición</label>
            <input type="text" className="input-glass" placeholder="Ej. Extremo Derecho" value={position} onChange={e => setPosition(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Dorsal</label>
            <input type="number" className="input-glass" placeholder="Ej. 19" value={number} onChange={e => setNumber(e.target.value)} />
          </div>
          <div className="input-group">
            <label>Asignar Equipo</label>
            <select className="input-glass" value={teamId} onChange={e => setTeamId(e.target.value)} required>
              <option value="">Selecciona un Equipo...</option>
              {teams.map(t => <option key={t.id} value={t.id}>{t.name}</option>)}
            </select>
          </div>
          <button type="submit" className="btn-premium btn-primary">Añadir Jugador</button>
        </form>
      </div>

      <div className="data-list">
        {players.map(player => (
          <div key={player.id} className="data-card">
            <div className="card-content">
              <h4 className="card-title">{player.name} <span style={{color: 'var(--primary)', opacity: 0.8}}>#{player.number}</span></h4>
              <p className="card-subtitle">Posición: {player.position}</p>
              <span className="card-badge">⚽ {player.team?.name || 'Sin Equipo'}</span>
            </div>
            <div className="card-actions">
              <button className="btn-premium btn-danger" onClick={() => handleDelete(player.id)}>Carta de Libertad</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersList;
