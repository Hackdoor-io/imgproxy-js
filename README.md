<img src="/docs/cover.png?v=2" />

**JavaScript** library for generating **ImageProxy** urls **both on browser and server**.

# Installation

```bash
npm i -s @jsmonday/imgproxy
# or
yarn add @jsmonday/imgproxy
```

# Usage

```js
import ImgProxy from "@jsmonday/imgproxy";

const proxy = new ImgProxy({ 
  key:  process.env.IMGPROXY_KEY, 
  salt: process.env.IMGPROXY_SALT, 
  url:  process.env.IMGPROXY_URL
});

const myResizedImage = proxy
                        .image("https://example.com/img.jpg")
                        .width(500)
                        .height(500)
                        .extension("png")

console.log(myResizedImage.get()); // => "<imgproxy url>"

```

# Methods
`@jsmonday/imgproxy` currently does not support all the **imgproxy** methods (it will do in the near future).

- `.image(<string>)`: The image to be resized
- `.width(<number>)`: Resize Width
- `.height(<number>)`: Resize height
- `.extension(<string>)`: The resized image extension
- `.gravity(<string>)`: The resize gravity
- `.enlarge(<number>`: Enlarge image
- `.resizeType(<string)`: The resize type


# License
[MIT](/LICENSE.md)