export default function getIsLoggedIn () {
  if (localStorage.getItem('access_token')) return true;
  return false;
}