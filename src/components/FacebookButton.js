import React from "react";
import SocialLogin from "react-social-login";
import { FacebookLoginButton } from "react-social-login-buttons";


class FacebookButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <FacebookLoginButton   onClick={triggerLogin} {...props}>
        {children}
      </FacebookLoginButton>
    );
  }
}


export default SocialLogin(FacebookButton);



