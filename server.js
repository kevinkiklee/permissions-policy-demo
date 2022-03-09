const path = require('path')
const express = require('express')
const morgan = require('morgan')

const PORT = 3000
const app = express()

const TRUSTED_SITE = 'https://pp-demo-trusted-site.glitch.me/'
const NAVIGATED_SITE = 'https://pp-demo-trusted-site.glitch.me/'
const DEMO_FEATURE = 'geolocation'

const POLICIES = {
  'all-allowed': '*',
  'none-allowed': '()',
  'some-allowed': `(self "${TRUSTED_SITE}")`,
  'same-origin-allowed': '(self)',
  'iframe-nav-allowed': `(self "${TRUSTED_SITE}" "${NAVIGATED_SITE}")`,
}

const buildPermissionsPolicyHeader = (feature, demoName) => {
  return {
    'Permissions-Policy': `${feature}=${POLICIES[demoName]}`
  }
}

app.use(morgan('tiny'))
app.use(express.static('public', {extensions: ['js', 'css']}));

app.get('/demo/:demoName', (req, res) => {
  const { demoName } = req.params

  res.set(buildPermissionsPolicyHeader(DEMO_FEATURE, demoName))
  res.sendFile(path.join(__dirname, 'public', `demo.html`));
})

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
