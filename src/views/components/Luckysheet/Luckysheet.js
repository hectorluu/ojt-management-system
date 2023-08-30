import React from 'react';
class Luckysheet extends React.Component {

  componentDidMount() {
    const luckysheet = window.luckysheet;
    luckysheet.create({
      container: "luckysheet",
      showinfobar: false,
    });
  }
  render() {
    const luckyCss = {
      width: '100vh',
      height: '100vh',
    }
    return (
      <div
        id="luckysheet"
        style={luckyCss}
      ></div>
    )
  }
}

export default Luckysheet