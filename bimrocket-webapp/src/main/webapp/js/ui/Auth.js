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
    "http://localhost:8181": {
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
        redirectUri: "https://preprod.bim.i2cat.net/bimrocket-server/api/oauth2/authCode/keycloak",
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

  static currentConfig = null;

  static init()
  {
    const origin = window.location.origin;

    Auth.currentConfig = Auth.AUTH_ENVIRONMENT[origin];

    if (!Auth.currentConfig)
    {
      console.warn("No hay config definida");
      return;
    }

    console.log(`Autenticación en: ${origin}`);
    window.addEventListener("message", Auth.handleAuthToken);
  }

  static addAuthButtons(parentElement)
  {
    const container = document.createElement("div");
    parentElement.appendChild(container);

    const providers = Object.keys(Auth.currentConfig);

    providers.forEach((provider) =>
    {
      const buttonLabel = provider.toUpperCase();

      Controls.addButton(
        container,
        `auth_${provider}`,
        buttonLabel,
        () => Auth.login(provider),
      );
    });
  }

  static login(providerName)
  {
    console.log(`Oauth con ${providerName}`);
    const config = Auth.currentConfig?.[providerName];

    if (!config) throw new Error ("Config. inválida o entorno no soportado");

    Auth.openAuthPopup(config);
  }

  static openAuthPopup(config)
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
    if (!event.data) return;

    const { accessToken, username } = event.data;

    const authEvent = new CustomEvent("auth-success", {
      detail: {
        username: username,
        password: accessToken,
      },
    });
    window.dispatchEvent(authEvent);
  }
}



