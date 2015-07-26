import React, {PropTypes} from 'react';
import {Link} from 'react-router';

import styles from './styles.scss';
import classNames from 'classnames';

/**
 * A button component with different options:
 *
 * @link      Render the component as an <a> instead of <button>.
 * @light     White instead of black.
 * @outline   Don't fill the button.
 * @external  Internal buttons use react-router's Link instead of <a> or <button>.
 * @className Add classes to the element.
 * @children  Text to display inside the button.
 * @href      A link to redirect to.
 */
class Button extends React.Component {

  static propTypes = {
    link: PropTypes.bool,
    light: PropTypes.bool,
    outline: PropTypes.bool,
    external: PropTypes.bool,
    children: PropTypes.string,
    className: PropTypes.string,
    href: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    link: false,
    light: false,
    outline: false,
    external: false,
    children: '',
    className: '',
    href: '#',
    style: {}
  }

  handleClick() {
    document.location = this.props.href;
  }

  render() {
    const backStyle = this.props.outline ? styles.outline : styles.filled;
    const colorStyle = this.props.light ? styles.light : styles.dark;

    if (!this.props.link) {
      return (
        <button
          onClick={this.handleClick.bind(this)}
          className={classNames(backStyle, colorStyle, this.props.className)}
          style={this.props.style}>{this.props.children}
        </button>
      );
    } else if (this.props.external) {
      return (
        <a
          href={this.props.href}
          className={classNames(backStyle, colorStyle, this.props.className)}
          style={this.props.style}>{this.props.children}
        </a>
      );
    } else {
      return (
        <Link
          to={this.props.href}
          className={classNames(backStyle, colorStyle, this.props.className)}
          style={this.props.style}>{this.props.children}
        </Link>
      );
    }
  }

}

export default Button;
