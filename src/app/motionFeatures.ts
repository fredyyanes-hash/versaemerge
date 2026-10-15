// Motion's animation features, loaded in their own chunk so they don't block
// the first paint. domMax (rather than domAnimation) because the Merch grid
// uses layout animations.
export { domMax as default } from 'motion/react';
