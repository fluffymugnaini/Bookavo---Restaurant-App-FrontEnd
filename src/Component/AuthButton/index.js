import React from "react";
import LoginButton from "../LoginButton";
import LogoutButton from "../LogoutButton";
import UserProfile from "../UserProfile";
import { useAuthContext } from "../../authContext";
import css from './authButton.module.css';

function AuthButton() {
  const [isAuthenticated] = useAuthContext();

  if (isAuthenticated) {
    return (
      <div className={css.restaurantLogin}>
        <LogoutButton />
        <UserProfile />
      </div>
    );
  }
  return (
    <div className={css.restaurantLogin}>
      <LoginButton />
    </div>
  );
}

export default AuthButton;
