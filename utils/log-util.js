import moment from 'moment';

const logRoute = (req, _, next) => {
  const path = `${req.method} ${req.originalUrl}`;
  const dash = '='.repeat(6);
  const time = moment().format('MMM-Do-hh:mm:ss');
  console.log(`${dash} ${path} ${time} ${dash}`);
  next();
};

export {logRoute}
