const compressImage = async (file, { quality = 1, type = file.type }) => {
  // Get as image data
  const imageBitmap = await createImageBitmap(file)

  // Draw to canvas
  const canvas = document.createElement('canvas')
  canvas.width = imageBitmap.width
  canvas.height = imageBitmap.height
  const ctx = canvas.getContext('2d')
  ctx.drawImage(imageBitmap, 0, 0)

  // Turn into Blob
  const blob = await new Promise((resolve) =>
    canvas.toBlob(resolve, type, quality)
  )

  // Turn Blob into File
  return new File([blob], file.name, {
    type: blob.type,
  })
}

const generatePassword = (length) => {
  const charset =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
  let retVal = ''
  for (let i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n))
  }
  return retVal
}

const randomInt = (min, max) => {
  return Math.round(Math.random() * (max - min) + min)
}

const randomElement = (arr) => {
  return arr[Math.round(Math.random() * (arr.length - 1))]
}

module.exports = {
  compressImage,
  generatePassword,
  randomInt,
  randomElement,
}
