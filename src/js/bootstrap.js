import loadPolyfills from './polyfills';

loadPolyfills(() => import('./main' /* webpackChunkName: 'main' */));
