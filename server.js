const path = require('path')
const express = require('express')

const PORT = 3000
const app = express()

app.use('/public', express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.set({
    'Permissions-Policy': 'camera=("https://valuable-short-food.glitch.me/")',
  })

  res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

app.get('/nested', (req, res) => {
  res.set({
    'Permissions-Policy': 'camera=("https://valuable-short-food.glitch.me/")',
  })

  res.sendFile(path.join(__dirname, 'public', 'nested.html'));
})

// app.use('/', express.static('public'));


app.get('/camera-allowed', (req, res) => {
  res.set({
    // 'Feature-Policy': 'camera *',
  })

  res.sendFile(path.join(__dirname, 'public', 'camera', 'allowed.html'));
})

app.get('/camera-disallowed', (req, res) => {
  res.set({
    "Feature-Policy": "camera 'none'",
  })

  res.set({
    'Permissions-Policy': 'camera=()',
  })

  res.sendFile(path.join(__dirname, 'public', 'camera', 'disallowed.html'));
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
