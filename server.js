import express from 'express';
import os from 'os';
import { collectDefaultMetrics, register, Counter } from 'prom-client';

collectDefaultMetrics({ timeout: 3000 });

const requestCounter = new Counter({
  name: 'requests_total',
  help: 'Total number of requests',
  labelNames: ['pod'],
});

const app = express();
app.use(express.json());

app.get('/metrics', (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(register.metrics());
});

app.get('/', async (req, res) => {
  requestCounter.labels(os.hostname).inc();
  res.send('OK')
})

const port = 4000;
app.listen(port, () => {
  requestCounter.labels(os.hostname).inc();
  console.log(`Server listening on port ${port}`);
});
