function centerGameObjects (target) {
  const objects = Array.isArray(target) ? target : [target]
  objects.forEach(function (object) {
    object.anchor.setTo(0.5)
  })
}

export {
  centerGameObjects
}
