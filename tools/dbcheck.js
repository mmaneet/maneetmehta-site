// One-off diagnostic for the Umami database. Prints the user table, checks
// whether CHECK_PASSWORD or the default password matches each hash, and
// optionally resets the admin password when RESET_PASSWORD is set.
const { Client } = require('pg');
const bcrypt = require('bcryptjs');
(async () => {
  const c = new Client({ connectionString: process.env.DATABASE_URL });
  await c.connect();
  const { rows } = await c.query('select user_id, username, password, role, created_at, updated_at from "user"');
  for (const r of rows) {
    console.log(JSON.stringify({
      username: r.username, role: r.role, created: r.created_at, updated: r.updated_at,
      hash_prefix: String(r.password).slice(0, 7), hash_len: String(r.password).length,
      matches_check: process.env.CHECK_PASSWORD ? bcrypt.compareSync(process.env.CHECK_PASSWORD, r.password) : null,
      matches_default: bcrypt.compareSync('umami', r.password),
    }));
    if (process.env.RESET_PASSWORD && r.username === 'admin') {
      await c.query('update "user" set password=$1, updated_at=now() where user_id=$2', [bcrypt.hashSync(process.env.RESET_PASSWORD, 10), r.user_id]);
      console.log('RESET: admin password updated');
    }
  }
  const w = await c.query('select website_id, name, domain from website');
  console.log('websites:', JSON.stringify(w.rows));
  await c.end();
  console.log('DONE');
  setInterval(() => {}, 1 << 30); // stay alive so Railway does not restart-loop
})().catch(e => { console.error('ERR', e.message); setInterval(() => {}, 1 << 30); });
