const TRUSTED_ORIGIN_URL = "https://pp-demo-trusted-site.glitch.me";
const UNTRUSTED_ORIGIN_URL = "https://pp-demo-untrusted-site.glitch.me";
const urlParams = new URLSearchParams(window.location.search);

const geoOptions = {
  timeout: 15000,
  maximumAge: 0,
};

function onGetPositionSuccess({ coords: { latitude, longitude } }) {
  document.querySelector(".demo-geolocation-latitude").innerHTML = latitude;
  document.querySelector(".demo-geolocation-longitude").innerHTML = longitude;
}

function onGetPositionError(e) {
  const { message } = e

  if (e instanceof GeolocationPositionError) {
    document.querySelector(".demo-geolocation").innerHTML = 
      `Failed to retrieve geolocation: ${message}`
  }

  console.warn(e)
}

async function getPosition() {
  navigator.geolocation.getCurrentPosition(
    onGetPositionSuccess,
    onGetPositionError,
    geoOptions
  );
}

function setAction() {
  const actionParam = urlParams.get("action");
  const trustedOriginUrl = new URL(TRUSTED_ORIGIN_URL);
  const untrustedOriginUrl = new URL(UNTRUSTED_ORIGIN_URL);

  // switch (actionParam) {
  //   case "trusted-origin":
  //     trustedOriginUrl.searchParams.append("shouldTriggerAction", "true");
  //     break;
  //   case "untrusted-origin":
  //     untrustedOriginUrl.searchParams.append("shouldTriggerAction", "true");
  //     break;
  //   case "trusted-nested-origin":
  //     trustedOriginUrl.searchParams.append("shouldTriggerNestedAction", "true");
  //     break;
  //   case "iframe-nav-origin":
  //     trustedOriginUrl.searchParams.append("shouldNavigate", "true");
  //     break;
  // }

  document.querySelector(".demo-trusted-iframe").src = trustedOriginUrl;
  document.querySelector(".demo-untrusted-iframe").src = untrustedOriginUrl;
}

setAction()
getPosition()

// export { getPosition, setAction };
