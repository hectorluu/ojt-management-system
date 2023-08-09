import React, { useRef, useState } from 'react';
import { IgrDataGrid } from 'igniteui-react-grids';
import { IgrDataGridModule } from 'igniteui-react-grids';
import { IgrTemplateColumn } from 'igniteui-react-grids';
import { IgrTextColumn } from 'igniteui-react-grids';
import { IgrNumericColumn } from 'igniteui-react-grids';
import { IgrDateTimeColumn } from 'igniteui-react-grids';
import { IgrImageColumn } from 'igniteui-react-grids';
import { IgrGridColumnOptionsModule } from 'igniteui-react-grids';
// import { IgrTemplateCellUpdatingEventArgs } from 'igniteui-react-grids';
// import { IgrGridCellValueChangingEventArgs } from 'igniteui-react-grids';
// import { IgrGridRowEditEndedEventArgs } from 'igniteui-react-grids';
// import { EditModeType } from 'igniteui-react-grids';
import { DataGridSharedData } from 'logic/utils/DataGridSharedData';
import { useEffect } from 'react';

IgrDataGridModule.register();
IgrGridColumnOptionsModule.register();

const EvaluateExcelPage = () => {
  const data = DataGridSharedData.getEmployees();
  const gridRef = useRef(null);
  const [editMode, setEditMode] = useState(1);
  const [excelEditMode, setExcelEditMode] = useState(1);

  const canCommit = gridRef.current?.canCommit || false;
  const canUndo = gridRef.current?.canUndo || false;
  const canRedo = gridRef.current?.canRedo || false;

  useEffect(() => {
    console.log(data);
  },[data]);
  const handleCommitClick = () => {
    gridRef.current.commitEdits();
    // request a new render so the undo/redo buttons update.
  };

  const handleUndoClick = () => {
    gridRef.current.undo();
    // request a new render so the undo/redo buttons update.
  };

  const handleRedoClick = () => {
    gridRef.current.redo();
    // request a new render so the undo/redo buttons update.
  };

  const handleEditModeChange = (event) => {
    gridRef.current.cancelEdits();
    setEditMode(parseInt(event.target.value));
  };

  const handleExcelEditModeChange = (event) => {
    gridRef.current.editModeClickAction = parseInt(event.target.value);
    setExcelEditMode(parseInt(event.target.value));
  };

  const handleCellValueChanging = (s, e) => {
    console.log("change",e);
    console.log("slagi",s);
    console.log("data", data[e.editID]);
    // request a new render so the undo/redo buttons update.
    setTimeout(() => {});
  };

  const handleRowEditEnded = (s, e) => {
    console.log("end",e);
    // request a new render so the state updates.
  };

  const handleDeleteRowClick = (e) => {
    const button = e.target;
    const viewIndex = parseInt(button.id);
    const rowItem = gridRef.current.actualDataSource.getItemAtIndex(viewIndex);
    gridRef.current.removeItem(rowItem);
    // request a new render so the state updates.
  };

  const handleDeleteCellUpdating = (s, e) => {
    const content = e.content;
    if (content.childElementCount === 0) {
      const button = document.createElement('button');
      button.innerText = 'Delete';
      button.addEventListener('click', handleDeleteRowClick);
      content.appendChild(button);
    }

    const button = content.children[0];
    button.disabled = e.cellInfo.isDeleted;
    button.id = e.cellInfo.dataRow.toString();
  };

  return (
    <div className="container sample">
      <div className="options horizontal">
        <button disabled={!canCommit} onClick={handleCommitClick}>
          Commit
        </button>
        <button disabled={!canUndo} onClick={handleUndoClick}>
          Undo
        </button>
        <button disabled={!canRedo} onClick={handleRedoClick}>
          Redo
        </button>
        <label>
          Edit Mode:
          <select value={editMode} onChange={handleEditModeChange}>
            <option value="0">None</option>
            <option value="1">Cell</option>
            <option value="2">CellBatch</option>
            <option value="3">Row</option>
          </select>
        </label>
        <label>
          Excel Style Editing:
          <select value={excelEditMode} onChange={handleExcelEditModeChange}>
            <option value="1">SingleClick</option>
            <option value="2">DoubleClick</option>
          </select>
        </label>
      </div>
      <IgrDataGrid
        ref={gridRef}
        height="calc(100% - 40px)"
        width="100%"
        defaultColumnMinWidth={120}
        autoGenerateColumns={false}
        dataSource={data}
        activationMode="Cell"
        editModeClickAction="SingleClick"
        selectionMode="SingleRow"
        selectionBehavior="ModifierBased"
        isColumnOptionsEnabled="true"
        cellValueChanging={handleCellValueChanging}
        rowEditEnded={handleRowEditEnded}
      >
        <IgrTextColumn field="Name" headerText="fullName" width="*>150" />
        <IgrTextColumn field="Street" headerText="Street" width="*>160" />
        <IgrTextColumn field="City" headerText="City" width="*>120" />
        <IgrNumericColumn
          field="Salary"
          headerText="Salary"
          width="*>120"
          positivePrefix="$"
          showGroupingSeparator="true"
        />
        <IgrImageColumn
          field="Photo"
          headerText="Photo"
          contentOpacity="1"
          horizontalAlignment="center"
          width="*>110"
        />
        <IgrDateTimeColumn field="Birthday" headerText="Date of Birth" width="*>170" />
        <IgrTemplateColumn
          isColumnOptionsEnabled="false"
          field="DeleteColumn"
          headerText="Delete Row"
          width="80"
          cellUpdating={handleDeleteCellUpdating}
        />
      </IgrDataGrid>
    </div>
  );
};

export default EvaluateExcelPage;