export function useAuth() {
  const user = JSON.parse(localStorage.getItem("items"));
  return {
    isAuth: user ? true : false,
    email: user ? user.email : null,
    token: user ? user.stsTokenManager.accessToken : null,
    id: user ? user.uid : null,
  };
}

export function useUserAdmin() {
  const user = JSON.parse(localStorage.getItem("items"));
  let adminLogin = false;
  if (user ? user.uid === "8okTMYakF0gaFX8W2AeqAFqWqyw1" : false) {
    adminLogin = true;
  } else {
    adminLogin = false;
  }
  return { adminLogin: adminLogin };
}
