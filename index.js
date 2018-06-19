const xah_flatten_array = ((array1, n) =>
{

/* [
 flatten nested array n levels. n default to 1
 n can be large, such as thousands. because when array no longer has element that's array, the function return it immediately

 http://xahlee.info/js/js_array_flatten.html
 version 2017-09-23
 copyright: free use, must include link and credit

 ] */

    if ( n === undefined ) { n = 1; }
    if ( n > 0 &&
         Array.prototype.some.call(array1, Array.isArray )
       ) {
        return xah_flatten_array(Array.prototype.concat.apply([],array1), n-1); }
    else {
        return array1; }
});


var app = new Vue({
  el: '#app',
  mounted: function() {
    var self = this;
    monographs = xah_flatten_array(monographs, 1);
    self.nextKana();

    self.intervalFunction = setInterval(function() {
      self.nextKana();
    }, self.interval);
  },
  data: {
    message: '',
    kana: '',
    interval: 1300,
    checkboxHiragana: true,
    checkboxKatakana: false,
    kanaCssClass: '',
  },
  methods: {
    nextKana: function() {
      var item = monographs[Math.floor(Math.random()*monographs.length)];
      if(item == this.kana) {
        this.nextKana();
        return;
      }

      this.kana = "";

      var self = this;
      //this.kana = item[1];
      setTimeout(function() {
        self.kana = item[self.whichIndex];
      }, 400);
    }
  },
  watch: {
    kana: function() {
      this.kanaCssClass = 'zoomOutLeft';
    },
    checkboxHiragana: function() {
      if(this.checkboxHiragana === true) {
        this.checkboxKatakana = false;
      } else {
        this.checkboxKatakana = true;
      }
    },
    checkboxKatakana: function() {
      if(this.checkboxKatakana === true) {
        this.checkboxHiragana = false;
      } else {
        this.checkboxHiragana = true;
      }
    },
    interval: function() {
      var self = this;
      clearInterval(self.intervalFunction);
      self.intervalFunction = setInterval(function() {
        self.nextKana();
      }, self.interval);
    }

  },
  computed: {
   // a computed getter
    whichIndex: function () {
     // `this` points to the vm instance
     if(this.checkboxHiragana === true) {
       return 1;
     } else if (this.checkboxKatakana === true) {
       this.checkboxHiragana = false;
       return 2;
     } else {
       return 1;
     }
   }
 }
})
