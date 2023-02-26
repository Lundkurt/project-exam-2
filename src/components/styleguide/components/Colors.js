import React from "react";

function Colors() {
  return (
    <div className="sg-colors">
      <div class="colorscheme">
        <div class="color">
          <div class="colorblock colorblock-primary"></div>
          <p>hex:ff6f00</p>
          <p>rbg:225,111,0</p>
          <p>details</p>
        </div>
      </div>
      <div class="colorscheme">
        <div class="color">
          <div class="colorblock colorblock-second"></div>
          <p>hex: fffff</p>
          <p>rbg: 255,255,255</p>
          <p>Fonts</p>
        </div>
      </div>
      <div class="colorscheme">
        <div class="color">
          <div class="colorblock colorblock-third"></div>
          <p>hex: 242424</p>
          <p>rbg: 36,36,36</p>
          <p>Background</p>
        </div>
      </div>
      <div class="colorscheme">
        <div class="color">
          <div class="colorblock colorblock-fourth"></div>
          <p>hex: 3e3e3e</p>
          <p>rbg: 62,62,62</p>
          <p>component bg</p>
        </div>
      </div>
    </div>
  );
}

export default Colors;
