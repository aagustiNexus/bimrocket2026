/**
 * Auth.js
 *
 * @author i2cat
 */

import { Controls } from "./Controls.js";

export class Auth
{
  static AUTH_ENVIRONMENT = {
    // ! entorno local
    "http://127.0.0.1:5500": {
      keycloak: {
        authUrl: "https://iam.i2cat.net/auth/realms/SEG/protocol/openid-connect/auth",
        clientId: "bim",
        scope: "openid",
        redirectUri: "http://localhost:9090/bimrocket-server/api/oauth2/authCode/keycloak",
      },
    },
    // ! entorno pre-prod
    "https://preprod.bim.i2cat.net": {
      valid: {
        authUrl: "https://valid-pre.aoc.cat/o/oauth2/auth",
        clientId: "tramits.gencat.bim_fue.cat",
        scope: "autenticacio_usuari",
        redirectUri: "https://preprod.bim.i2cat.net/bimrocket-server/api/oauth2/authCode/valid",
      },
      gicar: {
        authUrl: "...",
        clientId: "...",
        scope: "...",
        redirectUri: "https://preprod.bim.i2cat.net/bimrocket-server/api/oauth2/authCode/gicar",
      },
      keycloak: {
        authUrl: "https://iam.i2cat.net/auth/realms/SEG/protocol/openid-connect/auth",
        clientId: "bim",
        scope: "openid",
        redirectUri: "http://localhost:9090/bimrocket-server/api/oauth2/authCode/keycloak",
      },
    },
    "https://bim.santfeliu.cat": {
      valid: {
        authUrl: "https://valid.aoc.cat/o/oauth2/auth",
        clientId: "...",
        scope: "autenticacio_usuari",
        redirectUri: "...",
      },
      gicar: {
        authUrl: "...",
        clientId: "...",
        scope: "...",
        redirectUri: "",
      },
    },
  };

  static currentOrigin = "";
  static currentConfig = null;

  static init()
  {
    Auth.currentOrigin = window.location.origin;
    Auth.currentConfig = Auth.AUTH_ENVIRONMENT[Auth.currentOrigin];

    if (!Auth.currentConfig)
    {
      console.warn("NO hay config definida");
      return;
    }

    console.log(`Autenticación en: ${Auth.currentOrigin}`);
    window.addEventListener("message", Auth.handleAuthToken);
  }

  static addAuthButtons(parentElement)
  {
    const container = document.createElement("div");
    parentElement.appendChild(container);

    Controls.addButton(container, "auth_valid", "VALID", () => Auth.loginWithValid());
    Controls.addButton(container, "auth_gicar", "GICAR", () => Auth.loginWithGicar());
    Controls.addButton(container, "auth_keycloak", "Keycloak", () => Auth.loginWithKeycloak());
  }

  static loginWithValid()
  {
    const config = Auth.currentConfig?.valid;

    if (config)
    {
      console.log("Oauth con valid");
      Auth.startLogin(config);
    }
    else
    {
      console.error("Config. inválida");
    }
  }

  static loginWithGicar()
  {
    console.log("Oauth con Gicar");
  }

  static loginWithKeycloak()
  {
    const config = Auth.currentConfig?.keycloak;

    if (config)
    {
      console.log("Oauth con Keycloak");
      Auth.startLogin(config);
    }
    else
    {
      console.error("Config. inválida");
    }
  }

  static startLogin(config)
  {
    const params = new URLSearchParams();

    params.append("response_type", "code");
    params.append("client_id", config.clientId);
    params.append("scope", config.scope);
    params.append("redirect_uri", config.redirectUri);

    const url = `${config.authUrl}?${params.toString()}`;

    const popupWidth = 900, popupHeight = 700;
    const left = (window.screen.width / 2) - (popupWidth / 2);
    const top = (window.screen.height / 2) - (popupHeight / 2);
    const options = `width=${popupWidth},height=${popupHeight},top=${top},left=${left}`;

    window.open(url, "authPopup", options);
  }

  static handleAuthToken(event)
  {
    // if (event.origin !== Auth.currentOrigin)
    // {
    //   console.warn(`Origen no coincide, ${event.origin}`);
    //   return;
    // }

    if (event.data && event.data.accessToken)
    {
      const servletToken = event.data.accessToken;

      console.log(`Backend token:, ${servletToken}`);
      localStorage.setItem("accessToken", servletToken);
    }
    else
    {
      console.log(`Fallo data del back: ${event.data}`);
    }
  }
}

