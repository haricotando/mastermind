const filter = new PIXI.ColorMatrixFilter()
filter.colorTone(5,1, 0xFFFFFF, 0xFF0000, true);
noiseFilter.noise = 0.7
noiseFilter.seed = 0.8
startScreen.filters = [filter];

gsap.delayedCall(1, ()=>{
    this.add('1234', '1H / 2B', false);
});

.call(this.resetKeyPads.bind(this), null, 1);

.call(()=>{
    this.resetKeyPads();
}, null, 0.4);

gsap.to(".rect", {
    autoAlpha: 0
  })

  gsap.to(element, {
    scale: 1.2,
    duration: 0.5,
    overwrite: true, // オーバーライトの指定
  });

  gsap.to(this.box, {pixi:{tint:false}, duration:0.4, ease:'expo'})
  https://ics.media/entry/220822/