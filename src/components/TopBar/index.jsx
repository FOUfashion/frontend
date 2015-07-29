import React, {PropTypes} from 'react';
import {Avatar} from 'material-ui';
import AppStore from '../../stores/AppStore';

import Item from './Item';
import Logo from '../Logo';
import Paper from '../Paper';

import pureRender from 'pure-render-decorator';
import classNames from 'classnames';
import styles from './styles.scss';

@pureRender
class TopBar extends React.Component {

  static propTypes = {
    className: PropTypes.string
  }

  static contextTypes = {
    getStore: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const appStore = this.context.getStore(AppStore);
    console.log('wtf!!', appStore);

    if (appStore.isSignedIn()) {
      console.log('yess!!!');
      this.state.account = appStore.getAccount();
    }

    console.log('dcomponentDidMount');
    this.context.getStore(AppStore).addChangeListener(this._onStoreChange);
  }

  componentWillReceiveProps() {
    console.log('componentWillReceiveProps', {
      account: this.context.getStore(AppStore).getAccount()
    });
    this.setState({
      account: this.context.getStore(AppStore).getAccount()
    });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.context.getStore(AppStore).removeChangeListener(this._onStoreChange);
  }

  _onStoreChange = () => {
    console.log('_onStoreChange', {
      account: this.context.getStore(AppStore).getAccount()
    });
    this.setState({
      account: this.context.getStore(AppStore).getAccount()
    });
  }

  render() {
    const {className, ...props} = this.props;
    const classes = classNames(styles.topBar, className);
    console.log('this.state', this.state);

    const userItem = this.state.account ? (
      <Item href="/me" float="right" className={styles.profileItem}>
        <Avatar size={28}>{this.state.account.profile.name.first[0]}</Avatar>
        <span className={styles.profileName}>{this.state.account.profile.name.first}</span>
      </Item>
    ) : undefined;

    return (
      <Paper className={classes} {...props}>
        <Item href="/feed" float="left">
          <Logo className={styles.logo} styled />
        </Item>

        <Item href="/logout" float="right">
          <img src={require('../../images/actions/exit.svg')} />
        </Item>

        <Item href="/settings" float="right">
          <img src={require('../../images/actions/cog.svg')} />
        </Item>

        <Item href="/messages" float="right">
          <img src={require('../../images/actions/messages.svg')} />
        </Item>

        <Item href="/notifications" float="right">
          <img src={require('../../images/actions/bell.svg')} />
        </Item>

        {userItem}
      </Paper>
    );
  }

}

export default TopBar;
