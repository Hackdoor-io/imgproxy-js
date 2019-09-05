const ImgProxy = require("../index");
require("dotenv").config();

const proxy = new ImgProxy({ 
  key:  process.env.IMGPROXY_KEY, 
  salt: process.env.IMGPROXY_SALT, 
  url:  process.env.IMGPROXY_URL
});

test('Test imgProxy URL generator', () => {

  const img1 = proxy
                .image("https://images.unsplash.com/photo-1567629230779-ca428a942998?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80")
                .width(500)
                .height(600)
                .extension("png")
                .gravity("ce")
                .enlarge(1)
                .resizeType("fill")

  const img2 = proxy
                .image("https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1314&q=80")
                .width(100)
                .height(100)
                .extension("jpg")
                .gravity("ce")
                .enlarge(1)
                .resizeType("fill")
  
  expect(img1.get()).toBe("https://imgproxy.jsmonday.dev/ClRdcGzLfNJA10TtFbe_aDGv6FYZwfSmBg8hk3sJMXY/fill/500/600/ce/1/aHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1Njc2MjkyMzA3NzktY2E0MjhhOTQyOTk4P2l4bGliPXJiLTEuMi4xJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU1EZDkmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz0xMjM0JnE9ODA");
  expect(img2.get()).toBe("https://imgproxy.jsmonday.dev/XN2Wo3hi-_oilW0hLxd864r1aMy_pzvF_pgtwXiIRYk/fill/100/100/ce/1/aHR0cHM6Ly9pbWFnZXMudW5zcGxhc2guY29tL3Bob3RvLTE1Njc2MjA5MDU3MzItMmQxZWM3YWI3NDQ1P2l4bGliPXJiLTEuMi4xJml4aWQ9ZXlKaGNIQmZhV1FpT2pFeU1EZDkmYXV0bz1mb3JtYXQmZml0PWNyb3Amdz0xMzE0JnE9ODA");

});