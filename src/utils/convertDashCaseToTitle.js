export default function (value) {
  let title = value.replace('.md', '')

  return title.split('-')
    .map(part => part.charAt(0).toUpperCase() + part.substr(1).toLowerCase())
    .join(' ')
}