$(document).ready(function () {});

function getURL() {
  //generate random sprites and seeds, seeds is a set of 4 random characters
  let spritesList = [
    "male",
    "female",
    "human",
    "identicon",
    "bottts",
    "avataars",
    "jdenticon",
    "gridy",
    "micah",
  ];

  let randomSprites = spritesList[Math.floor(Math.random() * 9)];

  function makeSeed() {
    let randomString = "";
    let letters = "abcdefghijklmnopqrstuvwxyz";
    for (let i = 0; i < 4; i++) {
      randomString += letters.charAt(Math.floor(Math.random() * 26));
    }
    return randomString;
  }

  let randomURL = `https://avatars.dicebear.com/api/${randomSprites}/${makeSeed()}.svg`;

  this.src = randomURL;
}

$("#profileImg").click(getURL);