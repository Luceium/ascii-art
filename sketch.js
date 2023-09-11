const density = 'Ñ@#W$9876543210?!abc;:+=-,._ ';

let tmpImage, picArr;
function preload() {
  const parent = "photos/"
  tmpImage = loadImage(parent + "editedMiniProfile.png");
  picArr = [];
  picArr.push(loadImage(parent + "editedMiniProfile.png"));
  picArr.push(loadImage(parent + "editedSmallProfile.png"));
  picArr.push(loadImage(parent + "edited100Profile.png"));
}

let h, w;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  
  dodraw();
}

let lines = [];
function dodraw() {
  background(0);
  //image(tmpImage, 0, 0, width, height);
  
  tmpImage.loadPixels();
  h = height / tmpImage.height;
  w = width / tmpImage.width;
  
  for (let x = 0; x < tmpImage.width; x++) {
    for (let y = 0; y < tmpImage.height; y++) {
      //each row has width many pixels plus the pixel we're on times 4 for all 4 values. (rgba)
      const pixelIndex = (x + (y * tmpImage.width)) * 4;
      const r = tmpImage.pixels[pixelIndex + 0];
      const g = tmpImage.pixels[pixelIndex + 1];
      const b = tmpImage.pixels[pixelIndex + 2];
      const a = tmpImage.pixels[pixelIndex + 3];
      
      //using percivied luminance calulation from Poynton, Charles (2003). Digital Video and HDTV: Algorithms and Interfaces. Morgan Kaufmann. ISBN 1-55860-792-7.
      const brightness = (0.2126*r + 0.7152*g + 0.0722*b);
      // const avrgBrightness = (r+b+g)/3;
      
      noStroke();
      fill(0,255,0);
      textSize(w);
      let brightnessCharIndex =
          floor(map(brightness, 255, 0, 0, density.length - 1 ));
      if (a != 0) {
        text(density.charAt(brightnessCharIndex), x * w, y * h);
      }
    }
  }
}

let i = 0;
function changePic() {
  console.log("click");
  i++;
  i %= picArr.length;
  tmpImage = picArr[i];
  dodraw();
}

const body = document.body.onclick = changePic;