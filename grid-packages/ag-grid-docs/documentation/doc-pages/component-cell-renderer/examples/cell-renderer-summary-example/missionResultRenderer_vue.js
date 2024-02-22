export default {
  template: 
    `
    <span style="display: flex; justify-content: center; height: 100%; align-items: center;">
      <img
        :alt="params.value"
        :src="'https://www.ag-grid.com/example-assets/icons/' + cellValue + '.png'"
        style="width: auto; height: auto;"
      />
    </span>
    `,
    data: function () {
      return {
        cellValue: ''
      };
    },
    beforeMount() {
      this.cellValue = this.params.value ? 'tick-in-circle' : 'cross-in-circle';
    },
};
