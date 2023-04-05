const knex = require("knex")({
  client: "postgresql",
  connection: process.env.DATABASE_URL,
});

const logEntry = (site, { event, aff, sess, user, ref, exp, date, custom }) => {
  try {
    const payload = {
      site_id: site,
      event,
      date: new Date(Number(date)).toDateString()
    };

    if (ref) payload.ref = ref;
    if (sess) payload.sess = sess;
    if (user) payload.s_user = user;
    if (aff) payload.aff = aff;
    if (exp) payload.exp = new Date(Number(exp)).toDateString();
    if (custom) payload.custom = custom;

    return knex("logging").insert(payload);
  } catch (e) {
    console.error(e)
  }
}

exports.logEntry = logEntry
