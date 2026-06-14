export default function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.status(200).json({
    status: 'ok',
    service: 'FinBot CEMAC Backend',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
}
