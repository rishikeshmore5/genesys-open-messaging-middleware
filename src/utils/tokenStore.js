let accessToken = null;
let expiresAt = null;

export function getToken() {
    if (
        accessToken &&
        expiresAt &&
        Date.now() < expiresAt
    ) {
        return accessToken;
    }

    return null;
}

export function saveToken(token, expiresIn) {
    accessToken = token;

    // Refresh 60 seconds before expiry
    expiresAt = Date.now() + ((expiresIn - 60) * 1000);
}

export function clearToken() {
    accessToken = null;
    expiresAt = null;
}