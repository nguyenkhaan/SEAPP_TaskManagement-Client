function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const chars = [
  // a - z
  'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',

  // A - Z
  'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z',

  // 0 - 9
  '0','1','2','3','4','5','6','7','8','9'
]
const makeCode = (n) => {
    let s = '' 
    for (let i = 0; i < n; ++i) s += chars[randomInt(0 , chars.length - 1)]
    return s 
}
export {makeCode}