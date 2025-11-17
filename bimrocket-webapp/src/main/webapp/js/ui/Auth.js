/**
 * Auth.js
 *
 * @author i2cat
 */

import { Controls } from "./Controls.js";

export class Auth
{
  static addAuthButtons(parentElement)
  {
    Controls.addButton(parentElement, "auth_valid", "button.auth_valid", () => Auth.loginWithValid());

    Controls.addButton(parentElement, "auth_gicar", "button.auth_gicar", () => Auth.loginWithGicar());
  }

  static loginWithValid()
  {
    console.log("Oauth con Valid");
  }

  static loginWithGicar()
  {
    console.log("Oauth con Gicar");
  }
}
