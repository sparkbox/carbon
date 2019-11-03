// focus visible has very low support, so it's included unconditionally
import 'focus-visible';

function loadScript(path, cb) {
  var s = document.createElement('script');
  if (typeof cb === 'function') s.onload = cb;
  s.src = path;
  document.head.appendChild(s);
}

function loadPolyfills(cb) {
  // load Promise first
  if (!('Promise' in window)) {
    loadScript(window.__PROMISE_POLYFILL__, () => {
      loadOtherPolyfills().then(cb).catch(cb);
    });
  } else {
    loadOtherPolyfills().then(cb).catch(cb);
  }
}

function loadOtherPolyfills() {
  const polyfills = [];

  // add polyfills as needed here
  // if (!('Map' in window)) polyfills.push(import('core-js/features/map'));
  // if (!('Set' in window)) polyfills.push(import('core-js/features/set'));
  // if (!('Symbol' in window)) polyfills.push(import('core-js/features/symbol'));

  return Promise.all(polyfills);
}

export default loadPolyfills;
