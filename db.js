const knex = require("knex")({
  client: "postgresql",
  connection: process.env.DATABASE_URL,
});

const logEntry = (site, { event, aff, sess, user, platform = 'native', exp, date, custom }) => {
  try {
    const payload = {
      site_id: site,
      event,
      platform,
      date: new Date(date).toDateString()
    };

    if (sess) payload.sess = sess;
    if (user) payload.s_user = user;
    if (aff) payload.aff = aff;
    if (exp) payload.exp = new Date(exp).toDateString();
    if (custom) payload.custom = custom;

    return knex("logging").insert(payload);
  } catch (e) {
    console.error(e)
  }
}

exports.logEntry = logEntry
