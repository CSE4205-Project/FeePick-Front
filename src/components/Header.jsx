import './Header.css'
import { Link, useLocation } from 'react-router-dom'

function Header(){
  const location = useLocation();

  const headerClassName = location.pathname === '/listPage' ? 'header listing-page-header' : 'header';

  return(
    <header className={headerClassName}>
      <h1><Link to="/"  className="home">FEEP!CK</Link></h1>
      <nav className="topMenu">
          <ul>
              <li><Link to="/listPage">혜택 리스트</Link></li>
          </ul>
      </nav>
    </header>
  )
}

export default Header