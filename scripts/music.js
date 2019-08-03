const sound = new Howl({
  src: ['/music/明月天涯.mp3'],
  loop: true,
  volume: 0.2
})

sound.once('load', function() {
  sound.play()
})

sound.on('end', function() {
  console.log('Finished!')
})

// sound.play()
