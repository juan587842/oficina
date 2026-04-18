// Shared icons + data for the CRM
const Icon = {
  dashboard: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>,
  clients: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  os: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="8" y1="13" x2="16" y2="13"/><line x1="8" y1="17" x2="13" y2="17"/></svg>,
  truck: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="1" y="6" width="14" height="11"/><rect x="15" y="9" width="7" height="8"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="19" r="2"/></svg>,
  cal: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  cash: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/></svg>,
  settings: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-1.8-.3 1.7 1.7 0 0 0-1 1.5V21a2 2 0 0 1-4 0v-.1a1.7 1.7 0 0 0-1-1.5 1.7 1.7 0 0 0-1.8.3l-.1.1a2 2 0 0 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0 .3-1.8 1.7 1.7 0 0 0-1.5-1H3a2 2 0 0 1 0-4h.1a1.7 1.7 0 0 0 1.5-1 1.7 1.7 0 0 0-.3-1.8l-.1-.1a2 2 0 0 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.8.3H9a1.7 1.7 0 0 0 1-1.5V3a2 2 0 0 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.8-.3l.1-.1a2 2 0 0 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.8V9a1.7 1.7 0 0 0 1.5 1H21a2 2 0 0 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z"/></svg>,
  search: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>,
  bell: <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>,
  plus: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="3"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  back: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>,
  print: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/></svg>,
  whatsapp: <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>,
  chart: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
};

const CLIENTES = [
  { id: 'C-014', tipo: 'Frota', nome: 'Transportadora Três Irmãos', cnpj: '12.345.678/0001-90', contato: 'Carlos Menezes', tel: '(11) 98123-4400', cidade: 'Guarulhos/SP', veiculos: 8, ultimaOs: '2026-04-12', status: 'ativo' },
  { id: 'C-038', tipo: 'Autônomo', nome: 'João Ribeiro', cpf: '123.456.789-01', tel: '(11) 98765-4321', cidade: 'Itaquaquecetuba/SP', veiculos: 1, ultimaOs: '2026-04-17', status: 'ativo' },
  { id: 'C-021', tipo: 'Frota', nome: 'Cerealista Paulista Ltda.', cnpj: '44.556.778/0001-22', contato: 'Silvana Rocha', tel: '(11) 94422-1100', cidade: 'São Paulo/SP', veiculos: 22, ultimaOs: '2026-04-15', status: 'ativo' },
  { id: 'C-055', tipo: 'Autônomo', nome: 'Severino da Silva', cpf: '987.321.654-00', tel: '(11) 91122-3344', cidade: 'Arujá/SP', veiculos: 1, ultimaOs: '2026-02-08', status: 'inativo' },
  { id: 'C-062', tipo: 'Frota', nome: 'LogiSul Transportes', cnpj: '77.889.900/0001-11', contato: 'Marcos Pimenta', tel: '(11) 97788-0099', cidade: 'Mogi das Cruzes/SP', veiculos: 14, ultimaOs: '2026-04-16', status: 'ativo' },
  { id: 'C-007', tipo: 'Autônomo', nome: 'Antônio "Toninho" Lima', cpf: '555.444.333-22', tel: '(11) 95544-3322', cidade: 'Guarulhos/SP', veiculos: 2, ultimaOs: '2026-04-14', status: 'ativo' },
  { id: 'C-071', tipo: 'Frota', nome: 'FrigoNorte Distribuição', cnpj: '22.334.455/0001-66', contato: 'Ricardo Okada', tel: '(11) 96677-8899', cidade: 'Osasco/SP', veiculos: 18, ultimaOs: '2026-04-10', status: 'ativo' },
];

const OS_LIST = [
  { num: 'OS-2026-0418', status: 'aberta', cliente: 'João Ribeiro', clienteId: 'C-038', placa: 'ABC-1D23', marca: 'Scania', modelo: 'R 450 (2021)', problema: 'Falha em rotação baixa, fumaça preta', entrada: '2026-04-18 08:20', previsao: '2026-04-19 18:00', mecanico: 'Fabio', valor: 4800, urgente: true },
  { num: 'OS-2026-0417', status: 'andamento', cliente: 'Cerealista Paulista', clienteId: 'C-021', placa: 'DEF-2E45', marca: 'Volvo', modelo: 'FH 540 (2020)', problema: 'Troca de bico injetor — 6 cilindros', entrada: '2026-04-17 14:00', previsao: '2026-04-18 17:00', mecanico: 'Zé Carlos', valor: 3200 },
  { num: 'OS-2026-0416', status: 'andamento', cliente: 'Transp. Três Irmãos', clienteId: 'C-014', placa: 'GHI-3F67', marca: 'Mercedes-Benz', modelo: 'Actros 2651 (2022)', problema: 'Preventiva 40 mil km + troca correia', entrada: '2026-04-17 09:00', previsao: '2026-04-18 12:00', mecanico: 'Diego', valor: 2150 },
  { num: 'OS-2026-0415', status: 'aguardando', cliente: 'LogiSul Transportes', clienteId: 'C-062', placa: 'JKL-4G89', marca: 'Iveco', modelo: 'Stralis 600S48 (2019)', problema: 'Turbo com folga axial — aguardando peça (Garrett)', entrada: '2026-04-16 10:30', previsao: '2026-04-22 18:00', mecanico: 'Fabio', valor: 8900 },
  { num: 'OS-2026-0414', status: 'aberta', cliente: 'Toninho Lima', clienteId: 'C-007', placa: 'MNO-5H01', marca: 'Ford Cargo', modelo: '2429 (2018)', problema: 'Vazamento de óleo no câmbio, diagnóstico', entrada: '2026-04-18 07:40', previsao: '—', mecanico: '—', valor: 0 },
  { num: 'OS-2026-0413', status: 'concluida', cliente: 'FrigoNorte', clienteId: 'C-071', placa: 'PQR-6I23', marca: 'DAF', modelo: 'XF 480 (2021)', problema: 'Troca de embreagem completa', entrada: '2026-04-14 08:00', previsao: '2026-04-16 18:00', mecanico: 'Zé Carlos', valor: 6400 },
  { num: 'OS-2026-0412', status: 'concluida', cliente: 'Transp. Três Irmãos', clienteId: 'C-014', placa: 'STU-7J45', marca: 'Scania', modelo: 'G 410 (2019)', problema: 'Preventiva 60 mil km', entrada: '2026-04-12 09:00', previsao: '2026-04-13 18:00', mecanico: 'Diego', valor: 1850 },
  { num: 'OS-2026-0411', status: 'faturada', cliente: 'Cerealista Paulista', clienteId: 'C-021', placa: 'VWX-8K67', marca: 'Volvo', modelo: 'VM 270 (2020)', problema: 'Retífica parcial cabeçote', entrada: '2026-04-08 08:30', previsao: '2026-04-15 18:00', mecanico: 'Fabio', valor: 12400 },
];

const VEICULOS = [
  { placa: 'ABC-1D23', marca: 'Scania', modelo: 'R 450', ano: 2021, km: 412500, cliente: 'João Ribeiro' },
  { placa: 'DEF-2E45', marca: 'Volvo', modelo: 'FH 540', ano: 2020, km: 587200, cliente: 'Cerealista Paulista' },
  { placa: 'GHI-3F67', marca: 'Mercedes-Benz', modelo: 'Actros 2651', ano: 2022, km: 184000, cliente: 'Transp. Três Irmãos' },
  { placa: 'JKL-4G89', marca: 'Iveco', modelo: 'Stralis 600S48', ano: 2019, km: 722800, cliente: 'LogiSul Transportes' },
  { placa: 'MNO-5H01', marca: 'Ford Cargo', modelo: '2429', ano: 2018, km: 648300, cliente: 'Toninho Lima' },
  { placa: 'PQR-6I23', marca: 'DAF', modelo: 'XF 480', ano: 2021, km: 398100, cliente: 'FrigoNorte' },
];

const BRL = n => 'R$ ' + n.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

function statusLabel(s) {
  return { aberta: 'ABERTA', andamento: 'EM ANDAMENTO', aguardando: 'AGUARDANDO', concluida: 'CONCLUÍDA', faturada: 'FATURADA' }[s] || s.toUpperCase();
}

Object.assign(window, { Icon, CLIENTES, OS_LIST, VEICULOS, BRL, statusLabel });
