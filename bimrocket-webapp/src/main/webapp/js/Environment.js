/* Environment.js */

export const Environment =
{
  SERVER_URL : "http://localhost:9090/bimrocket-server",
  SERVER_ALIAS : "bimrocket",
  MODULES : ["base", "bim", "gis"],
  AUTH_ENVIRONMENT : {
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
        redirectUri: "...",
      },
    },
  }
};
