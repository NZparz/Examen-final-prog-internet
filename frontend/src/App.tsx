import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TeamsList from './components/TeamsList';
import PlayersList from './components/PlayersList';
import CoachingStaffList from './components/CoachingStaffList';

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="top-nav">
          <Link className="nav-brand" to="/">LaLiga Manager Pro</Link>
          <ul className="nav-links">
            <li><Link className="nav-link" to="/teams">Equipos</Link></li>
            <li><Link className="nav-link" to="/players">Jugadores</Link></li>
            <li><Link className="nav-link" to="/coaching">Cuerpo Técnico</Link></li>
          </ul>
        </nav>

        <main className="main-content">
          <Routes>
            <Route path="/" element={
              <div className="hero-text">
                <h2>Lidera tu Legado</h2>
                <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem' }}>
                  El portal definitivo para gestionar los clubes, futbolistas y cuerpo técnico de La Liga Española.
                </p>
              </div>
            } />
            <Route path="/teams" element={<TeamsList />} />
            <Route path="/players" element={<PlayersList />} />
            <Route path="/coaching" element={<CoachingStaffList />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
