export default {
  template: `<span style="display: flex; height: 100%; width: 100%; align-items: center;">
      <img v-for="images in arr" :src="src" style="display: block; width: 15px; height: auto; max-height: 50%;" />
      </span>`,
  data: function () {
      return {
          arr: [],
          src: 'https://www.ag-grid.com/example-assets/pound.png',
          priceMultiplier: 1,
      };
  },
  beforeMount() {
      this.updateDisplay(this.params);
  },
  methods: {
      refresh(params) {
          this.updateDisplay(params);
      },
      updateDisplay(params) {
        if (params.value > 5000000) {
          this.priceMultiplier = 2
        }
        if (params.value > 10000000) {
          this.priceMultiplier = 3
        }
        if (params.value > 25000000) {
          this.priceMultiplier = 4
        }
        if (params.value > 20000000) {
          this.priceMultiplier = 5
        }
        this.arr = new Array(this.priceMultiplier);
      },
  },
};