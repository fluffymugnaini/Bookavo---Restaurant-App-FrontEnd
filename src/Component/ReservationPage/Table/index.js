import { useSortBy, useTable, useFilters } from "react-table";
import css from './table.module.css';
import React from 'react';

function Table({columns, data}){
    function TextFilter({
    column: { filterValue, preFilteredRows, setFilter },
   }) {
    const count = preFilteredRows.length
    return (
      <input
        value={filterValue || ''}
        onChange={e => {
          setFilter(e.target.value || undefined)
        }}
        placeholder={`Search ${count} bookings...`}
      />
    )
   }
  const defaultColumn = React.useMemo(
    () => ({
      Filter: TextFilter,
    }),
    []
   )

  const {
    getTableProps, // table props from react-table
    getTableBodyProps, // table body props from react-table
    headerGroups, // headerGroups, if your table has groupings
    rows, // rows for the table based on the data passed
    prepareRow, // Prepare the row (this function needs to be called for each row before getting the row props)
  
} = useTable({
    columns,
    data,
    defaultColumn
  },
  useFilters, useSortBy
  );

  /* 
    Render the UI for your table
    - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
  */
  return (
      <div className={css.container}>
    
    <table {...getTableProps()}>
      <thead className={css.tableHeading}>
          {/* <div className = {css.titles}> */}
        {headerGroups.map(headerGroup => (
          <tr className={css.headings} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
            //   <th {...column.getHeaderProps()}>{column.render("Header")}</th>
             <div className={css.individualHeadings}>
            <th
  {...column.getHeaderProps(column.getSortByToggleProps())}
  className={
    column.isSorted
      ? column.isSortedDesc
        ? "sort-desc"
        : "sort-asc"
      : ""
    }
>
  {column.render("Header")}
</th>

            {column.canFilter ? column.render('Filter') : null}
            </div>))}

          </tr>
        ))}
        {/* </div> */}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <tr className={css.rowData} {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")}</td>;
              })}
            </tr>
          );
        })}
      </tbody>

    </table>
    </div>
  );
}


export default Table;