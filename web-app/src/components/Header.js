import './App.css';

function Header() {
  return (
    <header className="App-header">
        <div className="menu-header">
            <a className="a-header" href="/" style={{color: 'white',textDecoration: 'none'}}>Fullstack Interview Test</a>
            <div className="boton-header">
                <a className="nav-link" href="/branches">Branches</a> 
                <a className="nav-link" href="/pulls">PRs</a> 
            </div>
            <p style={{fontSize: '15px',marginTop: '4%',marginLeft: '8%'}}>Create by Jose Santacruz - joseasantacruz@gmail.com</p>
        </div>
    </header>
  );
}

export default Header;