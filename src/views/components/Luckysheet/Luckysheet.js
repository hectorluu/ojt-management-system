import React, { useEffect } from 'react';

function Luckysheet({ data = [] }) {

  useEffect(() => {
    const luckysheet = window.luckysheet;
    let options = {
      container: "luckysheet",
      showinfobar: false,
      showtoolbar: false,
      ShowstatisticBar: false,
      editable: false,
      cellRightClickConfig: {
        copy: false, // copy
        copyAs: false, // copy as
        paste: false, // paste
        insertRow: false, // insert row
        insertColumn: false, // insert column
        deleteRow: false, // delete the selected row
        deleteColumn: false, // delete the selected column
        deleteCell: false, // delete cell
        hideRow: false, // hide the selected row and display the selected row
        hideColumn: false, // hide the selected column and display the selected column
        rowHeight: false, // row height
        columnWidth: false, // column width
        clear: false, // clear content
        matrix: false, // matrix operation selection
        sort: false, // sort selection
        filter: false, // filter selection
        chart: false, // chart generation
        image: false, // insert picture
        link: false, // insert link
        data: false, // data verification
        cellFormat: false // Set cell format
      },
      sheetRightClickConfig: {
        delete: false, //Delete
        copy: false, //Copy
        rename: false, //Rename
        color: false, //Change color
        hide: false, //Hide, unhide
        move: false, //Move to the left, move to the right
      },
      showsheetbarConfig: {
        add: false,
        menu: false,
        sheet: true,
      },
      hook: {
        cellUpdateBefore: function (cell, position, sheetFile, ctx) {
          return false;
        }
      },
    };
    if (data.length > 0) {
      options = {
        ...options,
        data: data,
      }
    }
    luckysheet.create(options);
  }, [data]);

  const luckyCss = {
    margin: '0px',
    padding: '0px',
    width: '100%',
    height: '100vh',
    left: '0px',
    top: '0px'
  }
  return (
    <div
      id="luckysheet"
      style={luckyCss}
    ></div>
  )
}

export default Luckysheet