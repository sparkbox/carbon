// webpack will load styles with JS in development
// in production, this will be extracted and loaded as a proper CSS file
import './css/styles.scss';

import loadPolyfills from './polyfills';

loadPolyfills(() => import('./js/main' /* webpackChunkName: 'main' */));
