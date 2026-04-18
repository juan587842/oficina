function TrustBar() {
  const stats = [
    { n: '15+', l: 'ANOS NA ESTRADA' },
    { n: '4.200', l: 'CAMINHÕES ATENDIDOS' },
    { n: '38', l: 'FROTAS PARCEIRAS' },
    { n: '24h', l: 'EMERGÊNCIA' },
  ];
  return (
    <section className="trust">
      <div className="trust-inner">
        {stats.map(s => (
          <div className="trust-item" key={s.l}>
            <div className="trust-n">{s.n}</div>
            <div className="trust-l">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function About() {
  return (
    <section className="about" id="sobre">
      <div className="about-inner">
        <div className="about-left">
          <div className="eyebrow">SOBRE A OFICINA</div>
          <h2 className="display-md">FEITA POR QUEM<br/>ENTENDE DE CAMINHÃO.</h2>
        </div>
        <div className="about-right">
          <p className="body-lg">
            A Fabio Mecânica Diesel nasceu na beira da estrada, atendendo caminhoneiro
            que não podia perder viagem. Hoje a gente atende frota e autônomo com a mesma
            pegada: <strong>serviço direto, peça de verdade, orçamento fechado.</strong>
          </p>
          <p>
            Especialistas em motores diesel de caminhão — Scania, Volvo, Mercedes-Benz,
            Iveco, DAF, Ford Cargo. Diagnóstico por scanner, bancada de injetores,
            retífica de motor parcial e completa.
          </p>
          <ul className="about-list">
            <li>Peças originais e genuínas — nota fiscal em tudo</li>
            <li>Garantia de 6 meses em serviço de motor</li>
            <li>Contrato de manutenção preventiva para frotas</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

window.TrustBar = TrustBar;
window.About = About;
