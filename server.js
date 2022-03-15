const path = require('path')
const express = require('express')
const morgan = require('morgan')

const PORT = 3000
const app = express()

const TRUSTED_SITE = 'https://pp-demo-trusted-site.glitch.me/'
const NAVIGATED_SITE = "https://pp-demo-trusted-iframe-nav.glitch.me/"
const DEMO_FEATURE = 'geolocation'

const POLICIES = {
  'all-allowed': '*',
  'none-allowed': '()',
  'some-allowed': `(self "${TRUSTED_SITE}")`,
  'same-allowed': '(self)',
  'nav-allowed': `(self "${TRUSTED_SITE}" "${NAVIGATED_SITE}")`,
}

const buildPermissionsPolicyHeader = (feature, demoName) => {
  return {
    'Permissions-Policy': `${feature}=${POLICIES[demoName]}`
  }
}

app.use(morgan('tiny'))
app.use(express.static('public', {extensions: ['js', 'css', 'png']}));

app.get('/demo/:name?', (req, res) => {
  const { name } = req.params

  if (name) {
    res.set(buildPermissionsPolicyHeader(DEMO_FEATURE, name));
  }

  res.sendFile(path.join(__dirname, 'public', `index.html`));
})

app.get("/explainer/:name", (req, res) => {
  const { name } = req.params;
  res.sendFile(path.join(__dirname, "public", "explainer", `${name}.html`));
});


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
