import { ST_USER_INFO } from "../constants/storageItems";

/**
 * GET CURRENT USER INFORMATION FROM THE LOCAL STORAGE
 */
export function getCurrentUser() {
  var user = localStorage.getItem(ST_USER_INFO);
  try {
    user = user ? JSON.parse(user) : null;
  } catch (e) {
    user = null;
  }
  return user;
}
