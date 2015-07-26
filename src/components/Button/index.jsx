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
 * @children  Text to display inside the button.
 * @className Add classes to the element.
 * @type      Button type.
 * @href      A link to redirect to.
 * @style     Apply styles on the base components.
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
    type: PropTypes.string,
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
    type: 'button',
    style: {}
  }

  handleClick() {
    document.location = this.props.href;
  }

  render() {
    const fillClass = this.props.outline ? styles.outline : styles.filled;
    const colorClass = this.props.light ? styles.light : styles.dark;
    const className = classNames(fillClass, colorClass, this.props.className);

    if (!this.props.link) {
      return (
        <button
          className={className}
          type={this.props.type}
          onClick={this.handleClick.bind(this)}
          style={this.props.style}>{this.props.children}
        </button>
      );
    } else if (this.props.external) {
      return (
        <a
          className={className}
          href={this.props.href}
          style={this.props.style}>{this.props.children}
        </a>
      );
    } else {
      return (
        <Link
          className={className}
          to={this.props.href}
          style={this.props.style}>{this.props.children}
        </Link>
      );
    }
  }

}

export default Button;
