import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

export default function Test({columns, rows, editRowsModel, handleEditRowsModelChange, onCellEditStop, pageSize}) {

  return (
    <div className={`w-full text-center`} key={Math.random()}>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize ? pageSize : 10}
        checkboxSelection
        disableSelectionOnClick
        editRowsModel={editRowsModel}
        onEditRowsModelChange={handleEditRowsModelChange}
        onCellEditStop={onCellEditStop}
        autoHeight
      />
      {/* <code>editRowsModel: {JSON.stringify(editRowsModel)}</code> */}
    </div>
  );
}
