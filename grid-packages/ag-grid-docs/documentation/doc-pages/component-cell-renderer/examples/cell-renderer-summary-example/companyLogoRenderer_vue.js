export default {
  template: 
    `
    <span style="display: flex; height: 100%; width: 100%; align-items: center;">
      <img :src="'https://www.ag-grid.com/example-assets/space-company-logos/' + cellValueLowerCase + '.png'" style="display: block; width: 25px; height: auto; max-height: 50%; margin-right: 12px; filter: brightness(1.1);" />
    </span>
    `,
    data: function () {
      return {
        cellValue: '',
        cellValueLowerCase: ''
      };
    },
    beforeMount() {
      this.cellValue = this.params.value;
      this.cellValueLowerCase = this.params.value.toLowerCase();
    },
};
