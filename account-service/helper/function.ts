const isUrl = (path) => {
  const regex = /^https?:\/\/(?:[a-zA-Z0-9.-]+(?:\:[0-9]+)?)?(?:\/[^\s]*)?$/;
  return path ? regex.test(path) : false;
}

export { isUrl }