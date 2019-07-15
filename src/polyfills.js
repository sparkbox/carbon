import 'focus-visible';

const polyfills = [];

// requried for React in <= IE 11
if (!('Map' in global)) polyfills.push(import('core-js/features/map'));
if (!('Set' in global)) polyfills.push(import('core-js/features/set'));

export const loaded = Promise.all(polyfills);
