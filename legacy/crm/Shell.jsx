function Sidebar({ page, go, counts }) {
  const items = [
    { id: 'dash', icon: Icon.dashboard, label: 'PAINEL' },
    { id: 'os', icon: Icon.os, label: 'ORDENS', count: counts.os },
    { id: 'clientes', icon: Icon.clients, label: 'CLIENTES', count: counts.clientes },
    { id: 'veiculos', icon: Icon.truck, label: 'VEÍCULOS', count: counts.veiculos },
    { id: 'agenda', icon: Icon.cal, label: 'AGENDA' },
    { id: 'financeiro', icon: Icon.cash, label: 'FINANCEIRO' },
  ];
  return (
    <aside className="sidebar">
      <div className="sb-brand">
        <img src="../assets/logo-mark.svg" alt=""/>
        <div>
          <div className="sb-brand-t1">FABIO DIESEL</div>
          <div className="sb-brand-t2">CRM · OFICINA</div>
        </div>
      </div>
      <div className="sb-section">OPERAÇÃO</div>
      {items.map(it => (
        <button key={it.id} className={"sb-item" + (page === it.id || (page.startsWith && page.startsWith(it.id+'/')) ? ' active' : '')} onClick={() => go(it.id)}>
          {it.icon}<span>{it.label}</span>{it.count != null && <span className="count">{it.count}</span>}
        </button>
      ))}
      <div className="sb-section">AJUSTES</div>
      <button className="sb-item" onClick={() => go('config')}>{Icon.settings}<span>CONFIGURAÇÕES</span></button>
      <div className="sb-foot">
        <div className="sb-user">
          <div className="sb-avatar">FM</div>
          <div>
            <div className="sb-user-name">Fábio Moura</div>
            <div className="sb-user-role">dono · mecânico</div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function Topbar({ crumbs }) {
  return (
    <div className="topbar">
      <div className="crumbs">{crumbs.map((c, i) => <span key={i}>{i > 0 && ' · '}{i === crumbs.length-1 ? <strong>{c}</strong> : c}</span>)}</div>
      <div className="search">
        {Icon.search}
        <input placeholder="Buscar OS, placa, cliente ou CNPJ…"/>
      </div>
      <div className="topbar-actions">
        <button className="icon-btn" title="Notificações">{Icon.bell}<span className="pip">3</span></button>
        <button className="btn sm">{Icon.plus} NOVA OS</button>
      </div>
    </div>
  );
}

window.Sidebar = Sidebar;
window.Topbar = Topbar;
