export default function (file) {
  return file.type === 'file'
    && file.name.endsWith('.md')
}