export const CLIENT_ID = "600565809598-nc2uj2mk853cmf4ocrumc45kcd13qmev.apps.googleusercontent.com";
export const CLIENT_SECRET = "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";

export const API_BASE_URL = 'http://localhost:8080';

// export const ACCESS_TOKEN = "accessToken";

export const OAUTH2_REDIRECT_URI = "http://localhost:3000/login/oauth2/redirect"
// keys.redirectUri;

export const GOOGLE_AUTH_URL = API_BASE_URL + "/oauth2/authorize/google?redirect_uri=" + OAUTH2_REDIRECT_URI;