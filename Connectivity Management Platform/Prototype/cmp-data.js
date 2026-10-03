export function boot() {
  let sd = 20261002;
  const r = () => { sd = (sd + 0x6D2B79F5) | 0; let t = Math.imul(sd ^ (sd >>> 15), 1 | sd); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const pick = a => a[Math.floor(r() * a.length)];
  const REG = {
    Europe: 'DE,Germany,276;FR,France,250;ES,Spain,724;IT,Italy,380;GB,United Kingdom,826;NL,Netherlands,528;PL,Poland,616;SE,Sweden,752;PT,Portugal,620;GR,Greece,300;CH,Switzerland,756;AT,Austria,040;IE,Ireland,372;NO,Norway,578;DK,Denmark,208;CZ,Czechia,203;RO,Romania,642;FI,Finland,246',
    Americas: 'US,United States,840;CA,Canada,124;MX,Mexico,484;BR,Brazil,076;AR,Argentina,032;CL,Chile,152;CO,Colombia,170;PE,Peru,604',
    APAC: 'JP,Japan,392;KR,South Korea,410;SG,Singapore,702;AU,Australia,036;NZ,New Zealand,554;IN,India,356;TH,Thailand,764;ID,Indonesia,360;VN,Vietnam,704;PH,Philippines,608;MY,Malaysia,458',
    MEA: 'AE,UAE,784;SA,Saudi Arabia,682;ZA,South Africa,710;EG,Egypt,818;TR,Türkiye,792;MA,Morocco,504;KE,Kenya,404;NG,Nigeria,566;IL,Israel,376'
  };
  const C = [];
  Object.keys(REG).forEach(region => REG[region].split(';').forEach(x => { const [code, name, iso] = x.split(','); C.push({ code, name, iso, region }); }));
  const pre = ['Halcyon', 'Meridian', 'Corvid', 'Aster', 'Kestrel', 'Orbis', 'Tidewater', 'Lumio', 'Brightwave', 'Ferro', 'Solano', 'Vesta', 'Nimbus', 'Quill', 'Saffron', 'Arden'];
  const suf = ['Mobile', 'Tel', 'Net', 'Wireless', 'Cellular'];
  const ops = []; let mn = 0;
  C.forEach((c, i) => { const n = 2 + (i % 2); for (let k = 0; k < n; k++) { mn++; ops.push({ id: 'op' + ops.length, cc: c.code, name: pre[(i * 3 + k * 7) % 16] + ' ' + suf[(i * 2 + k) % 5], mccmnc: mn <= 9 ? '001-0' + mn : '999-' + String(mn - 9).padStart(2, '0') }); } });
  const opsOf = cc => ops.filter(o => o.cc === cc);
  const codes = rg => C.filter(c => c.region === rg).map(c => c.code);
  const zones = [
    { id: 'z1', name: 'Europe', countries: codes('Europe'), rules: { DE: { [opsOf('DE')[1].id]: 'block' }, FR: { [opsOf('FR')[0].id]: 'block' } } },
    { id: 'z2', name: 'Global', countries: C.map(c => c.code), rules: {} },
    { id: 'z3', name: 'APAC Core', countries: ['JP', 'KR', 'SG', 'AU', 'NZ', 'TH', 'MY'], rules: {} },
    { id: 'z4', name: 'Americas', countries: ['US', 'CA', 'MX', 'BR', 'AR', 'CL', 'CO'], rules: { US: { [opsOf('US')[0].id]: 'block' } } }
  ];
  const plans = [
    { id: 'p1', name: 'Europe 10', gb: 10, days: 30, zone: 'z1', op: 'any', exp: 'Activation' },
    { id: 'p2', name: 'Global 5', gb: 5, days: 30, zone: 'z2', op: 'any', exp: 'Activation' },
    { id: 'p3', name: 'APAC 20', gb: 20, days: 30, zone: 'z3', op: 'any', exp: 'First attach' },
    { id: 'p4', name: 'Americas 50', gb: 50, days: 90, zone: 'z4', op: 'any', exp: 'Activation' },
    { id: 'p5', name: 'IoT 1', gb: 1, days: 365, zone: 'z2', op: 'any', exp: 'First attach' },
    { id: 'p6', name: 'Europe 3', gb: 3, days: 7, zone: 'z1', op: 'any', exp: 'Activation' }
  ];
  const subs = [
    { id: 's1', name: 'Lumen Travel', type: 'Reseller', qs: 750, plans: ['p1', 'p2', 'p6'], f: 1.8 },
    { id: 's2', name: 'Atlas Fleet', type: 'Reseller', qs: 800, plans: ['p4', 'p5'], f: 2.2 },
    { id: 's3', name: 'Kite Mobile', type: 'White-label', qs: 1000, plans: ['p1', 'p2', 'p3'], domain: 'portal.kite.example', dns: 'verified', color: '#E8734A', auto: true, f: 1.5 },
    { id: 's4', name: 'Tessel IoT', type: 'White-label', qs: 600, plans: ['p5', 'p2'], domain: 'sims.tessel.example', dns: 'pending', color: '#9B7FE6', auto: true, f: 2.6 },
    { id: 's5', name: 'Pace Logistics', type: 'Reseller', qs: 1000, plans: ['p4', 'p5', 'p2'], f: 1.06 },
    { id: 's6', name: 'Nova Roam', type: 'White-label', qs: 250, plans: ['p2'], domain: 'app.novaroam.example', dns: 'failed', color: '#D4A93C', auto: true, f: 1 }
  ];
  const order = [['s1', 500], ['s2', 640], ['s3', 820], ['s4', 360], ['s5', 980], [null, 300]];
  const sims = []; let idx = 0;
  order.forEach(([sid, n]) => {
    const sb = subs.find(x => x.id === sid);
    for (let i = 0; i < n; i++) {
      let st;
      if (!sid) st = 'Available';
      else if (sid === 's1') st = i % 28 === 13 ? 'Suspended' : 'Active';
      else { const x = r(); st = x < .68 ? 'Active' : x < .78 ? 'Available' : x < .88 ? 'Suspended' : x < .95 ? 'Deactivated' : 'Retired'; }
      const plan = sb ? plans.find(p => p.id === pick(sb.plans)) : null;
      const zone = plan ? zones.find(z => z.id === plan.zone) : zones[1];
      const cc = pick(zone.countries); const op = pick(opsOf(cc));
      const cap = plan ? plan.gb * 1024 : 0;
      let used = 0, last = null;
      if (st === 'Active') { used = Math.round(Math.pow(r(), 1.3) * cap * .97); last = Math.round(Math.pow(r(), 3) * 720); }
      else if (st === 'Suspended') { used = Math.round(r() * cap * .8); last = Math.round(1440 * (1 + r() * 9)); }
      else if (st === 'Deactivated') { used = Math.round(r() * cap); last = Math.round(1440 * (20 + r() * 60)); }
      else if (st === 'Retired') { used = Math.round(r() * cap * .5); last = Math.round(1440 * (120 + r() * 200)); }
      let eid = '89049032'; for (let k = 0; k < 24; k++) eid += Math.floor(r() * 10);
      sims.push({ idx, iccid: '8900101' + String(420000000001 + idx), eid, imsi: '00101' + String(7000000000 + idx * 37).slice(-10), sub: sid, plan: plan ? plan.id : null, status: st, used, last, op: op.id, cc, rat: r() < .36 ? '5G' : '4G', act: st === 'Available' ? null : Math.round(5 + r() * 80), log: [] });
      idx++;
    }
  });
  subs.forEach(sb => { const u = sims.filter(x => x.sub === sb.id).reduce((a, x) => a + x.used, 0) / 1024; sb.qd = Math.max(500, Math.ceil(u * sb.f / 100) * 100); delete sb.f; });
  const MODS = ['Dashboard', 'SIMs', 'Plans & Zones', 'Sub-accounts', 'Users & Roles', 'B2C', 'Settings'];
  const P = spec => { const o = {}; MODS.forEach(m => { const v = spec[m] || ''; o[m] = { v: v.includes('v'), e: v.includes('e'), o: v.includes('o') }; }); return o; };
  const roles = [
    { id: 'r1', name: 'Owner', system: true, perms: P(Object.fromEntries(MODS.map(m => [m, 'veo']))) },
    { id: 'r2', name: 'Operations', perms: P({ Dashboard: 'v', SIMs: 'veo', 'Plans & Zones': 've', 'Sub-accounts': 'vo', 'Users & Roles': 'v', Settings: 'v' }) },
    { id: 'r3', name: 'Support', perms: P({ Dashboard: 'v', SIMs: 'vo', 'Sub-accounts': 'v' }) },
    { id: 'r4', name: 'Finance', perms: P({ Dashboard: 'v', 'Sub-accounts': 'v', B2C: 'v' }) },
    { id: 'r5', name: 'Reseller admin', perms: P({ Dashboard: 'v', SIMs: 'veo', 'Plans & Zones': 'v', 'Users & Roles': 've', Settings: 'v' }) }
  ];
  const users = [
    ['Mara Lind', 'mara.lind@vantor.example', 'r1', null, 'Active', '2m'],
    ['Theo Brandt', 'theo.brandt@vantor.example', 'r2', null, 'Active', '14m'],
    ['Ines Okafor', 'ines.okafor@vantor.example', 'r3', null, 'Active', '1h'],
    ['Jun Sato', 'jun.sato@vantor.example', 'r4', null, 'Active', '3d'],
    ['Leah Kim', 'leah@lumen.example', 'r5', 's1', 'Active', '5h'],
    ['Omar Haddad', 'omar@kite.example', 'r5', 's3', 'Active', '22m'],
    ['Sofia Reyes', 'sofia@kite.example', 'r3', 's3', 'Invited', '—'],
    ['Nadia Volkova', 'nadia@tessel.example', 'r5', 's4', 'Active', '6h'],
    ['Arun Patel', 'arun@pace.example', 'r2', 's5', 'Active', '1d']
  ].map(([name, email, role, scope, status, last], i) => ({ id: 'u' + i, name, email, role, scope, status, last }));
  return { ready: true, C, ops, zones, plans, subs, sims, roles, users };
}

export const B2C = {
  users: { cols: ['User', 'Country', 'Plan', 'Orders', 'LTV'], gtc: 'minmax(180px,1.4fr) 110px minmax(120px,1fr) 80px 90px', mono: [0], rows: [
    ['AU-104218', 'DE', 'Europe 10', '6', '€84.00'], ['AU-104219', 'FR', 'Global 5', '2', '€24.00'], ['AU-104233', 'JP', 'APAC 20', '4', '€96.00'], ['AU-104251', 'US', 'Americas 50', '1', '€49.00'], ['AU-104260', 'ES', 'Europe 10', '9', '€126.00'], ['AU-104277', 'IT', 'Europe 3', '3', '€18.00'], ['AU-104291', 'GB', 'Global 5', '5', '€60.00'], ['AU-104302', 'AU', 'APAC 20', '2', '€48.00']] },
  purchases: { cols: ['Order', 'User', 'Plan', 'Amount', 'Date', 'Status'], gtc: '130px minmax(120px,1fr) minmax(110px,1fr) 90px 100px 90px', mono: [0, 1], rows: [
    ['TX-882130', 'AU-104260', 'Europe 10', '€14.00', 'Oct 02', 'Paid'], ['TX-882127', 'AU-104218', 'Europe 10', '€14.00', 'Oct 02', 'Paid'], ['TX-882119', 'AU-104233', 'APAC 20', '€24.00', 'Oct 01', 'Paid'], ['TX-882104', 'AU-104291', 'Global 5', '€12.00', 'Oct 01', 'Refunded'], ['TX-882098', 'AU-104251', 'Americas 50', '€49.00', 'Sep 30', 'Paid'], ['TX-882090', 'AU-104277', 'Europe 3', '€6.00', 'Sep 30', 'Paid'], ['TX-882081', 'AU-104219', 'Global 5', '€12.00', 'Sep 29', 'Paid']] },
  plans: { cols: ['App plan', 'Data', 'Validity', 'Price', 'Sold'], gtc: 'minmax(160px,1.4fr) 90px 90px 90px 90px', mono: [], rows: [
    ['Europe 3', '3 GB', '7 d', '€6.00', '1,204'], ['Europe 10', '10 GB', '30 d', '€14.00', '2,881'], ['Global 5', '5 GB', '30 d', '€12.00', '1,560'], ['APAC 20', '20 GB', '30 d', '€24.00', '642'], ['Americas 50', '50 GB', '90 d', '€49.00', '318']] },
  promos: { cols: ['Code', 'Discount', 'Redeemed', 'Expires', 'Status'], gtc: 'minmax(140px,1fr) 90px 120px 100px 90px', mono: [0], rows: [
    ['AUTUMN15', '15%', '412 / 1,000', 'Oct 31', 'Live'], ['WELCOME5', '€5.00', '2,190 / —', '—', 'Live'], ['ROAMEU', '20%', '500 / 500', 'Sep 30', 'Ended'], ['APAC10', '10%', '37 / 300', 'Nov 15', 'Scheduled']] }
};
