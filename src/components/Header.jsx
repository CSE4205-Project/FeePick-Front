import './Header.css'
import { Link } from 'react-router-dom'

function Header(){
    return(
      <header>
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