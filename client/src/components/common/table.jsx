import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ columns, data, onSort, sortColumn }) => {
  return (
    <div className="table-responsive-xl">
      <table id="servers" className="table table-stripped table-hover">
        <TableHeader
          columns={columns}
          onSort={onSort}
          sortColumn={sortColumn}
        />
        <TableBody data={data} columns={columns} />
      </table>
    </div>
  );
};

export default Table;
