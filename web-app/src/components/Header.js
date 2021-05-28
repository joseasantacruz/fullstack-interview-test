import './App.css';

function Header() {
  return (
    <header className="App-header">
        <div className="menu-header">
            <a className="a-header" href="/" style={{color: 'white',textDecoration: 'none'}}>Fullstack Interview Test</a>
            <div className="boton-header">
                <a className="nav-link" href="/branches">Branches</a> 
            </div>
        </div>
    </header>
  );
}

export default Header;