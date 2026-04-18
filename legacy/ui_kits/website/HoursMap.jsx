function HoursMap() {
  const hours = [
    { d: 'SEGUNDA', h: '7h — 18h' },
    { d: 'TERÇA', h: '7h — 18h' },
    { d: 'QUARTA', h: '7h — 18h' },
    { d: 'QUINTA', h: '7h — 18h' },
    { d: 'SEXTA', h: '7h — 18h' },
    { d: 'SÁBADO', h: '7h — 13h' },
    { d: 'DOMINGO', h: 'fechado · emergência via zap' },
  ];
  return (
    <section className="hours-map" id="contato">
      <div className="hm-inner">
        <div className="hm-left">
          <div className="eyebrow">ONDE E QUANDO</div>
          <h2 className="display-md">VENHA DE CAMINHÃO.<br/>TEM PÁTIO.</h2>
          <div className="hm-address">
            <div className="hm-addr-line"><strong>Rod. BR-116, km 218 · galpão 4</strong></div>
            <div className="hm-addr-line muted">Guarulhos · SP · 07180-000</div>
          </div>
          <div className="hours-table">
            {hours.map(h => (
              <div className="hours-row" key={h.d}>
                <span className="hours-d">{h.d}</span>
                <span className="hours-h">{h.h}</span>
              </div>
            ))}
          </div>
          <div className="hm-actions">
            <a className="btn" href="#">COMO CHEGAR ›</a>
            <a className="btn whatsapp" href="#">CHAMA NO ZAP</a>
          </div>
        </div>
        <div className="hm-right">
          <div className="map-placeholder">
            <div className="map-grid" />
            <div className="map-pin">
              <svg viewBox="0 0 24 24" width="44" height="44" fill="#FF6A1A" stroke="#0E0E10" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3" fill="#0E0E10"/></svg>
            </div>
            <div className="map-caption">mapa — substituir por Google Maps embed</div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.HoursMap = HoursMap;
