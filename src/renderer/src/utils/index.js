export function downloadFile(downfile) {
  const tmpLink = document.createElement('a')
  const objectUrl = URL.createObjectURL(downfile)

  tmpLink.href = objectUrl
  tmpLink.download = downfile.name
  tmpLink.target = '_blank'
  document.body.appendChild(tmpLink)
  tmpLink.click()

  document.body.removeChild(tmpLink)
  URL.revokeObjectURL(objectUrl)
}
