const { useState } = React;

function Nav() {
  return (
    <nav className="nav">
      <a className="nav-logo" href="#top">
        <img src="../../assets/logo-mark.svg" alt="" />
        <div className="nav-logo-text">
          <div className="nav-logo-1">FABIO MECÂNICA</div>
          <div className="nav-logo-2">DIESEL · CAMINHÕES</div>
        </div>
      </a>
      <div className="nav-links">
        <a href="#servicos">SERVIÇOS</a>
        <a href="#sobre">SOBRE</a>
        <a href="#contato">CONTATO</a>
      </div>
      <div className="nav-cta">
        <a className="btn whatsapp" href="#contato">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
          CHAMA NO ZAP
        </a>
      </div>
    </nav>
  );
}

window.Nav = Nav;
