export default function (value) {
  let dashCaseValue = value.replace('/', '-')
  dashCaseValue = dashCaseValue.replace(/\s\s+/g, ' ')

  dashCaseValue = dashCaseValue
    .split(' ')
    .map(part => part.toLowerCase())
    .join('-')
  
  return dashCaseValue + '.md'
}
