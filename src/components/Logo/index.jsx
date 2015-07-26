import React, {PropTypes} from 'react';
import classNames from 'classnames';
import styles from './styles.scss';

/**
 * The beautiful Fou logo created with the Azedo typeface.
 *
 * @styled    Whether the logo should be styled by default.
 * @outline   Add a border around the text.
 * @children  Replace the default text.
 * @className Add classes to the element.
 */
class Logo extends React.Component {

  static propTypes = {
    styled: PropTypes.bool,
    outline: PropTypes.bool,
    children: PropTypes.string,
    className: PropTypes.string
  }

  static defaultProps = {
    styled: false,
    outline: false,
    children: '',
    className: ''
  }

  render() {
    const className = classNames(styles.type, this.props.className, {
      [styles.outline]: this.props.outline,
      [styles.styled]: this.props.styled
    });

    if (this.props.children) {
      return (<span className={className}>{this.props.children}</span>);
    } else {
      return (
        <span className={className}>
          <span className={styles.f}>F</span>
          <span className={styles.o}>O</span>
          <span className={styles.u}>U</span>
        </span>
      );
    }
  }

}

export default Logo;
