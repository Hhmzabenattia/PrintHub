import React from "react";
import SocialLogin from "react-social-login";
import { GoogleLoginButton  } from "react-social-login-buttons";


class GoogleButton extends React.Component {
  render() {
    const { children, triggerLogin, ...props } = this.props;
    return (
      <GoogleLoginButton   onClick={triggerLogin} {...props}>
        {children}
      </GoogleLoginButton>
    );
  }
}


export default SocialLogin(GoogleButton);
