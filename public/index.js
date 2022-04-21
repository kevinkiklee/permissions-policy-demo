const IFRAME_NAV_DEMO_NAME = 'nav-allowed'
const TRUSTED_ORIGIN_URL = 'https://pp-demo-trusted-site.glitch.me'
const UNTRUSTED_ORIGIN_URL = 'https://pp-demo-untrusted-site.glitch.me'
const urlParams = new URLSearchParams(window.location.search)

const demoContentContainerEl = document.querySelector('.demo-content-container')
const demoInnerContentEl = document.querySelector('.demo-inner-content')
const demoRunBtnEl = document.querySelector('.demo-run-btn')
const demoExplainerIframeEl = document.querySelector('.demo-explainer-iframe')
const navButtonEls = document.querySelectorAll('.demo-nav-btn')

const geoOptions = {
  timeout: 15000,
  maximumAge: 0,
}

const onGetPositionSuccess = ({ coords: { latitude, longitude } }) => {
  document.querySelector('.demo-geolocation-latitude').innerHTML = latitude
  document.querySelector('.demo-geolocation-longitude').innerHTML = longitude
}

const onGetPositionError = e => {
  const { message } = e

  if (e instanceof GeolocationPositionError) {
    document.querySelector('.demo-geolocation').innerHTML = `Failed to retrieve geolocation: ${message}`
  }

  console.warn(e)
}

const getPosition = () => {
  navigator.geolocation.getCurrentPosition(
    onGetPositionSuccess,
    onGetPositionError,
    geoOptions
  )
}

const setupChromeOnlyError = () => {
  navButtonEls.forEach(el => el.style.display = 'none')
  demoContentContainerEl.innerHTML =
    "Please visit this demo page in a Chromium-based browser. Permissions Policy is available only for Chromium. ";
}

const setIframeHeightToContent = iframeEl => () => {
  iframeEl.style.height = iframeEl.contentWindow.document.body.scrollHeight + 'px'
}

const setupRunDemoBtn = (demoName) => {
  demoRunBtnEl.onclick = () => {
    let trustedOriginUrl = TRUSTED_ORIGIN_URL;

    if (demoName === IFRAME_NAV_DEMO_NAME) {
      trustedOriginUrl += "?shouldNavigate=true";
    }

    document.querySelector(".demo-trusted-iframe").src = trustedOriginUrl;
    document.querySelector(".demo-untrusted-iframe").src = UNTRUSTED_ORIGIN_URL;

    demoInnerContentEl.style.display = 'inherit'
    demoRunBtnEl.style.display = 'none'

    getPosition();
  }
};

const setupNavButtons = demoName => {
  navButtonEls.forEach(el => el.onclick = () => {
    window.open(`/demo/${el.dataset.name}`, '_self')
  })

  const currNavBtn = document.querySelector(`[data-name='${demoName}']`)
  currNavBtn.classList.add('mdl-button--colored')
  currNavBtn.classList.remove('mdl-button--raised')
  currNavBtn.onclick = () => {}
}

const setupExplainerIframe = demoName => {
  demoExplainerIframeEl.src = `/explainer/${demoName}`
  demoExplainerIframeEl.onload = setIframeHeightToContent(demoExplainerIframeEl)

}

const setupDemoIframes = demoName => {
  demoInnerContentEl.style.display = "none";

  if (demoName) {
    return
  }

  demoContentContainerEl.style.display = 'none'
  demoRunBtnEl.style.display = 'none'
}

const setupPage = () => {
  const [demoName] = window.location.href.split('/').reverse()

  if (!window.chrome) {
    setupChromeOnlyError()
    return
  }

  setupExplainerIframe(demoName)
  setupRunDemoBtn(demoName)
  setupNavButtons(demoName)
  setupDemoIframes(demoName)
}

setupPage()
