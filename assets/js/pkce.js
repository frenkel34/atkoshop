function generateCodeVerifier() {
    var code_verifier = generateRandomString(128)
    writeLog('-> a code code_verifier was generated: '+ code_verifier)
    return code_verifier
}
function generateRandomString(length) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
function generateCodeChallenge(code_verifier) {
    var code_challenge = base64URL(CryptoJS.SHA256(code_verifier));
    writeLog('-> a code code_challenge was generated: '+ code_challenge);
    return code_challenge 
}

function base64URL(string) {
    return string.toString(CryptoJS.enc.Base64).replace(/=/g, '').replace(/\+/g, '-').replace(/\//g, '_')
}