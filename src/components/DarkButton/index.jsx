import React, {PropTypes} from 'react';
import styles from './styles.scss';

import {Link} from 'react-router';

/**
 * A button component with different options:
 *
 * @link      Render the component as an <a> instead of <button>.
 * @outline   Don't fill the button.
 * @external  Internal buttons use react-router's Link instead of <a> or <button>.
 * @children  Text to display inside the button.
 * @href      A link to redirect to.
 */
class DarkButton extends React.Component {

  static propTypes = {
    link: PropTypes.bool,
    outline: PropTypes.bool,
    external: PropTypes.bool,
    children: PropTypes.string,
    href: PropTypes.string,
    style: PropTypes.object
  }

  static defaultProps = {
    link: false,
    outline: false,
    external: false,
    children: '',
    href: '#',
    style: {}
  }

  handleClick() {
    document.location = this.props.href;
  }

  render() {
    const className = this.props.outline ? styles.outline : styles.filled;

    if (!this.props.link) {
      return (
        <button
          onClick={this.handleClick}
          className={className}
          style={this.props.style}>{this.props.children}
        </button>
      );
    } else if (this.props.external) {
      return (
        <a
          href={this.props.href}
          className={className}
          style={this.props.style}>{this.props.children}
        </a>
      );
    } else {
      return (
        <Link
          to={this.props.href}
          className={className}
          style={this.props.style}>{this.props.children}
        </Link>
      );
    }
  }

}

export default DarkButton;
