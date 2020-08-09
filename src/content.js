import Vue from 'vue';

// This constant is safe, it's just a string in base 64 that we will use below.
const messageToShow =
  'IyMjIyMjICAjIyMjIyMjIyAjIyMjIyMjIyAgIyMjIyMjIyMgICAgIyMjICAgICMjICAgICAjIyAjIyMjIyMjIyAjIyMjIyMjIyAgICAgIAojIyAgICAjIyAgICAjIyAgICAjIyAgICAgIyMgIyMgICAgICAgICAjIyAjIyAgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgIyMgICAgIAojIyAgICAgICAgICAjIyAgICAjIyAgICAgIyMgIyMgICAgICAgICMjICAgIyMgICMjICAgICAjIyAjIyAgICAgICAjIyAgICAgIyMgICAgIAogIyMjIyMjICAgICAjIyAgICAjIyMjIyMjIyAgIyMjIyMjICAgIyMgICAgICMjICMjICAgICAjIyAjIyMjIyMgICAjIyMjIyMjIyAgICAgIAogICAgICAjIyAgICAjIyAgICAjIyAgICMjICAgIyMgICAgICAgIyMjIyMjIyMjICAjIyAgICMjICAjIyAgICAgICAjIyAgICMjICAgICAgIAojIyAgICAjIyAgICAjIyAgICAjIyAgICAjIyAgIyMgICAgICAgIyMgICAgICMjICAgIyMgIyMgICAjIyAgICAgICAjIyAgICAjIyAgIyMjIAogIyMjIyMjICAgICAjIyAgICAjIyAgICAgIyMgIyMjIyMjIyMgIyMgICAgICMjICAgICMjIyAgICAjIyMjIyMjIyAjIyAgICAgIyMgIyMj';

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log('got a message');
  debugger;
  // Once we receive a message from the popup
  if (request.msg) {
    // If message has the `action` key `print_in_console`
    if (request.msg.action === 'print_in_console') {
      // print awesome text on console
      console.log(`%c ${atob(messageToShow)}`, 'color:#38B549;');
    } else if (request.msg.action === 'change_body_color') {
      // message contains different `action` key. This time it's a `change_body_color`.
      document.body.style.background = request.msg.value;
    }
  }
});

// console.log('content.js');

window.onload = function() {
  // Do stuff
  console.log('loadeeed');
  // document.querySelectorAll('body')[0].style.backgroundColor = '#000';
  init();
};

// document.querySelectorAll('body')[0].style.backgroundColor = '#333';

// document.addEventListener('click', () => init());

var target = document.querySelector('body');

var div = document.createElement('div');
div.innerHTML = `

<section id="chromevj-controls" class="chromevj-controls">
  ChromeVJ: 
  <button @click="toggleChromeVJ()">Turn {{on === true? "off" : "on"}}</button>

  {{message}} {{keysDown}}<br>

  <div>
    Speed: {{settings.row0}}
  </div>
  <div>
    backgroundColor: {{settings.backgroundColor}}
  </div>
</section>

<section id="chromevj-overlay" class="chromevj-overlay">
  <div class="box" v-for="(div, key) in divs">
    <div class="child" :style="div.style" v-bind:class="{ 'leaving': !div.on }">asdf {{div.on}}


    </div>
  </div>
</section>`;
div.id = 'chromevj';
target.insertBefore(div, target.firstChild);

function init() {
  window.app = new Vue({
    el: '#chromevj',
    data: {
      on: false,
      message: 'Hello Vue!',
      settings: {
        row0: -1,
        row1: 0,
        row2: 0,
        row3: 0,
        backgroundColor: 'hsl(0,0,0)',
        speed: 0,
      },
      config: {
        row0: [49, 50, 51, 52, 53, 54, 55, 56, 57, 58],
        row2: [65, 83, 68, 70, 71, 72, 74, 75, 76, 186],
        rowHome: ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';'],
        row1: ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        row3: ['z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/'],
      },
      style: {
        backgroundColor: 'black',
        transition: '',
      },
      divs: [],
      keysDown: [],
    },
    methods: {
      toggleChromeVJ() {
        if (this.on === false) {
          window.addEventListener('keydown', this.handleKeyboardEvent);
          window.addEventListener('keyup', this.handleKeyboardEventUp);
          this.on = true;
        } else {
          window.removeEventListener('keydown', this.handleKeyboardEvent);
          window.removeEventListener('keyup', this.handleKeyboardEventUp);
          this.on = false;
        }
      },
      getRandomNumerBetween(min, max) {
        return Math.random() * (max - min) + min;
      },
      handleKeyboardEventUp(event) {
        var index = this.keysDown.indexOf(event.key);
        this.keysDown.splice(index, 1);

        // find the div associated with the key unpressing and set to off
        this.divs.forEach(div => {
          if (div.key == event.key) div.on = false;
        });

        // Delete the div permanently
        var vm = this;
        setTimeout(function() {
          vm.divs.splice(index, 1);
        }, 3000);
      },
      handleKeyboardEvent(event) {
        if (this.keysDown.indexOf(event.key) >= 0) {
          return;
        }

        this.keysDown.push(event.key);

        //

        switch (event.keyCode) {
          // Numbers 123457890
          case 49:
            this.settings.row0 = 0;
            break;
          case 50:
            this.settings.row0 = 1;
            break;
          case 51:
            this.settings.row0 = 2;
            break;
          case 52:
            this.settings.row0 = 3;
            break;
          case 53:
            this.settings.row0 = 4;
            break;
          case 54:
            this.settings.row0 = 5;
            break;
          case 55:
            this.settings.row0 = 6;
            break;
          case 56:
            this.settings.row0 = 7;
            break;
          case 57:
            this.settings.row0 = 8;
            break;
          case 58:
            this.settings.row0 = 9;
            break;
        }
        // if (this.config.row0.indexOf(event.keyCode) >= 0) {
        //   // this.style.transition = `background-color 0s ease ${this.settings.row0}s`;
        //   return;
        // }

        switch (event.keyCode) {
          // Homerow Colors asdfghjkl;
          case 65:
            this.settings.row2 = 0;
            break;
          case 83:
            this.settings.row2 = 1;
            break;
          case 68:
            this.settings.row2 = 2;
            break;
          case 70:
            this.settings.row2 = 3;
            break;
          case 71:
            this.settings.row2 = 4;
            break;
          case 72:
            this.settings.row2 = 5;
            break;
          case 74:
            this.settings.row2 = 6;
            break;
          case 75:
            this.settings.row2 = 7;
            break;
          case 76:
            this.settings.row2 = 8;
            break;
          case 186:
            this.settings.row2 = 9;
            break;
        }

        //  Keys above home row
        // they type q and get back indexOf('q')
        if (this.config.row1.indexOf(event.key) > -1) {
          console.log('yarr');
        }

        if (this.config.row2.indexOf(event.keyCode) >= 0 || this.config.row1.indexOf(event.key) >= 0 || this.config.row3.indexOf(event.key) >= 0) {
          var h = ((360 / 10) * this.settings.row2 + this.getRandomNumerBetween(0, 36)).toFixed(2);
          var s = this.getRandomNumerBetween(90, 100).toFixed(2) + '%';
          var l = this.getRandomNumerBetween(45, 51).toFixed(2) + '%';
          var color = `hsl(${h},${s},${l})`;
          console.log('keyCode ', event.keyCode, color);
          // this.style.backgroundColor = color;
          var size1 = this.getRandomNumerBetween(10, 200);
          var size2 = this.getRandomNumerBetween(1, 2);
          var angle = this.getRandomNumerBetween(0, 360);

          // if the key is not already down
          if (this.keysDown.indexOf(event.key) > -1) {
            this.divs.push({
              style: {
                backgroundColor: color,
                // animationName: "fadeOut",
                // animationDuration: ".5s"

                background: `repeating-linear-gradient(
    ${angle}deg,
    transparent,
    transparent ${size1}px,
    ${color} ${size1}px,
    ${color} ${size1 * size2}px
  )`,
              },
              on: true,
              key: event.key,
            });
          }

          return;
        }
      },
    },
    created() {
      // const component = this;
      // this.handler = function (e) {
      //   component.$emit("keydown", e);
      // };
    },
    beforeDestroy() {
      window.removeEventListener('keydown', this.handleKeyboardEvent);
      window.removeEventListener('keyup', this.handleKeyboardEventUp);
    },
  });
}
