function Clientes({ go }) {
  const [filter, setFilter] = React.useState('todos');
  const list = filter === 'todos' ? CLIENTES : CLIENTES.filter(c => c.tipo.toLowerCase() === filter);
  return (
    <div className="page">
      <div className="page-head">
        <div>
          <span className="eyebrow">CADASTRO</span>
          <div className="page-title">CLIENTES</div>
          <p>{CLIENTES.length} clientes · {CLIENTES.filter(c=>c.tipo==='Frota').length} frotas · {CLIENTES.filter(c=>c.tipo==='Autônomo').length} autônomos</p>
        </div>
        <div className="page-actions">
          <button className="btn secondary sm">EXPORTAR</button>
          <button className="btn sm">{Icon.plus} NOVO CLIENTE</button>
        </div>
      </div>
      <div className="filter-bar">
        <button className={"chip"+(filter==='todos'?' active':'')} onClick={()=>setFilter('todos')}>TODOS</button>
        <button className={"chip"+(filter==='frota'?' active':'')} onClick={()=>setFilter('frota')}>FROTAS</button>
        <button className={"chip"+(filter==='autônomo'?' active':'')} onClick={()=>setFilter('autônomo')}>AUTÔNOMOS</button>
        <div style={{marginLeft:'auto', fontFamily:'var(--font-mono)', fontSize:12, color:'var(--graxa)'}}>ORDENAR: ÚLTIMA OS ↓</div>
      </div>
      <div className="panel">
        <table className="data">
          <thead><tr>
            <th style={{width:36}}></th><th>CLIENTE</th><th>CNPJ / CPF</th><th>TIPO</th><th>CIDADE</th><th>VEÍCULOS</th><th>ÚLT. OS</th><th>STATUS</th>
          </tr></thead>
          <tbody>
            {list.map(c => (
              <tr key={c.id} onClick={()=>go('clientes/'+c.id)}>
                <td><div className="avatar-sm">{c.nome.split(' ').map(w=>w[0]).slice(0,2).join('')}</div></td>
                <td><div className="cell-name">{c.nome}</div><div className="meta mono">{c.id}</div></td>
                <td className="mono">{c.cnpj || c.cpf}</td>
                <td>{c.tipo === 'Frota' ? <span className="pill faturada"><span className="dot"/>FROTA</span> : <span className="pill"><span className="dot"/>AUTÔNOMO</span>}</td>
                <td>{c.cidade}</td>
                <td className="mono"><strong>{c.veiculos}</strong></td>
                <td className="mono">{c.ultimaOs}</td>
                <td>{c.status==='ativo' ? <span className="pill concluida"><span className="dot"/>ATIVO</span> : <span className="pill aguardando"><span className="dot"/>INATIVO</span>}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ClienteDetail({ id, go }) {
  const c = CLIENTES.find(x => x.id === id) || CLIENTES[0];
  const osCliente = OS_LIST.filter(o => o.clienteId === c.id);
  return (
    <div className="page">
      <button className="btn ghost xs" onClick={()=>go('clientes')} style={{marginBottom:12}}>{Icon.back} VOLTAR</button>
      <div className="detail-head">
        <div className="detail-head-row">
          <div>
            <div className="detail-kicker">CLIENTE · {c.id} · {c.tipo.toUpperCase()}</div>
            <div className="detail-title">{c.nome}</div>
            <div className="detail-subs">
              <span><strong>{c.cnpj || c.cpf}</strong></span>
              <span>{c.cidade}</span>
              <span>{c.veiculos} veículo{c.veiculos>1?'s':''}</span>
              <span>Última OS <strong>{c.ultimaOs}</strong></span>
            </div>
          </div>
          <div className="detail-actions">
            <button className="btn whatsapp sm">{Icon.whatsapp} ZAP</button>
            <button className="btn sm">{Icon.plus} NOVA OS</button>
          </div>
        </div>
      </div>

      <div className="detail-grid">
        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">HISTÓRICO DE ORDENS</div><span className="mono muted-text" style={{fontSize:11}}>{osCliente.length} OS</span></div>
            <table className="data">
              <thead><tr><th>OS</th><th>VEÍCULO</th><th>SERVIÇO</th><th>STATUS</th><th>VALOR</th></tr></thead>
              <tbody>
                {osCliente.map(o => (
                  <tr key={o.num} onClick={()=>go('os/'+o.num)}>
                    <td className="mono"><strong>{o.num}</strong></td>
                    <td><span className="placa">{o.placa}</span></td>
                    <td style={{maxWidth:280}}>{o.problema}</td>
                    <td><span className={"pill "+o.status}><span className="dot"/>{statusLabel(o.status)}</span></td>
                    <td className="mono"><strong>{o.valor>0?BRL(o.valor):'—'}</strong></td>
                  </tr>
                ))}
                {osCliente.length===0 && <tr><td colSpan="5" className="empty">Sem ordens para este cliente.</td></tr>}
              </tbody>
            </table>
          </div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">ANOTAÇÕES</div></div>
            <div className="panel-body pad">
              <p style={{margin:0, fontSize:14}}>Cliente de confiança, paga no prazo. Prefere pagamento via PIX. Avisar antes de trocar peça acima de R$ 2.000.</p>
            </div>
          </div>
        </div>
        <div style={{display:'flex', flexDirection:'column', gap:16}}>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">DADOS DE CONTATO</div></div>
            <div className="infobox">
              <div><div className="lbl">Contato</div><div className="val">{c.contato || c.nome}</div></div>
              <div><div className="lbl">Telefone</div><div className="val mono">{c.tel}</div></div>
              <div><div className="lbl">{c.cnpj?'CNPJ':'CPF'}</div><div className="val mono">{c.cnpj || c.cpf}</div></div>
              <div><div className="lbl">Cidade</div><div className="val">{c.cidade}</div></div>
            </div>
          </div>
          <div className="panel">
            <div className="panel-head"><div className="panel-title">FINANCEIRO</div></div>
            <div className="infobox">
              <div><div className="lbl">Total faturado</div><div className="val mono">R$ 48.230,00</div></div>
              <div><div className="lbl">Em aberto</div><div className="val mono danger-text">R$ 4.800,00</div></div>
              <div><div className="lbl">Ticket médio</div><div className="val mono">R$ 3.210,00</div></div>
              <div><div className="lbl">Desde</div><div className="val mono">MAI/2023</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

window.Clientes = Clientes;
window.ClienteDetail = ClienteDetail;
