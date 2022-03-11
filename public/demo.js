const IFRAME_NAV_DEMO_NAME = 'iframe-nav-allowed'
const TRUSTED_ORIGIN_URL = "https://pp-demo-trusted-site.glitch.me"
const UNTRUSTED_ORIGIN_URL = "https://pp-demo-untrusted-site.glitch.me"
const urlParams = new URLSearchParams(window.location.search)

const geoOptions = {
  timeout: 15000,
  maximumAge: 0,
}

function onGetPositionSuccess({ coords: { latitude, longitude } }) {
  document.querySelector(".demo-geolocation-latitude").innerHTML = latitude
  document.querySelector(".demo-geolocation-longitude").innerHTML = longitude
}

function onGetPositionError(e) {
  const { message } = e

  if (e instanceof GeolocationPositionError) {
    document.querySelector(".demo-geolocation").innerHTML = `Failed to retrieve geolocation: ${message}`
  }

  console.warn(e)
}

async function getPosition() {
  navigator.geolocation.getCurrentPosition(
    onGetPositionSuccess,
    onGetPositionError,
    geoOptions
  )
}

function setupPage() {
  const [demoName] = window.location.href.split('/').reverse()
  document.querySelector(".demo-explainer-iframe").src = `/explainer/${demoName}`

  let trustedOriginUrl = TRUSTED_ORIGIN_URL
  if (demoName === IFRAME_NAV_DEMO_NAME) {
    trustedOriginUrl += '?shouldNavigate=true'
  }

  document.querySelector(".demo-trusted-iframe").src = trustedOriginUrl
  document.querySelector(".demo-untrusted-iframe").src = UNTRUSTED_ORIGIN_URL
}

setupPage()
getPosition()
