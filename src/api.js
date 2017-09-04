import {KJUR, KEYUTIL} from 'jsrsasign'

// api stuff
const generateJWT = (rsa) => {
  const prv = KEYUTIL.getKey(rsa)
  const jwt = KJUR.jws.JWS.sign(
    'RS256',
    {'alg': 'RS256'},
    {iss: 578, iat: Math.floor(Date.now() / 1000), exp: Math.floor(Date.now() / 1000) + 60},
    prv
  )
  return jwt
}

export const setRSA = (rsa) => localStorage.setItem('rsa', rsa)
export const removeRSA = () => localStorage.removeItem('rsa')
export const hasRSA = () => localStorage.getItem('rsa') !== null || localStorage.getItem('rsa') === ''

export const getData = () => {
  const rsa = localStorage.getItem('rsa') || null
  if (!rsa) { return Promise.reject('no key - no dice') }
  const fetchInit = {
    method: 'POST',
    headers: new Headers({
      'Accept': 'application/vnd.github.machine-man-preview+json',
      'Authorization': 'Bearer ' + generateJWT(rsa)
    })
  }
  return fetch('https://api.github.com/installations/2689/access_tokens', fetchInit)
    .then((response) => response.json()).then((data) => {
      if (data.token) {
        // hooray!
        const fetchConfig = {
          method: 'GET',
          headers: new Headers({
            'Accept': 'application/vnd.github.machine-man-preview+json',
            'Authorization': 'Bearer ' + data.token
          }),
          qs: {ref: 'db'}
        }
        return fetch('https://api.github.com/repos/heinburger/gh-db/contents/gh-db.json', fetchConfig)
          .then((response) => response.json()).then((data) => {
            return JSON.parse(atob(data.content))
          })
      }
    })
}
