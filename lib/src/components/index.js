import {h, render} from 'preact';

import Button from './Button';

render(
  <div>
    <Button onClick={() => console.log('clicked')}>click me</Button>
  </div>,
  document.querySelector('.js-mount')
);
