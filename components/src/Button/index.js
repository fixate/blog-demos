import {h, Component} from 'preact';
import Radium from 'radium';

const styles = {
  base: {
    color: '#fff',

    // Adding interactive state couldn't be easier! Add a special key to your
    // style object (:hover, :focus, :active, or @media) with the additional rules.
    ':hover': {
      background: 'blue',
    },
  },

  primary: {
    background: 'skyblue',
  },

  warning: {
    background: 'hotpink',
  },
};

const Button = ({children, onClick}) =>
  <button style={[styles.base, styles.primary]} onClick={onClick}>
    {children}
  </button>;

export default Radium(Button);
