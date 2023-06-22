import React, { useState } from "react";
import {
  TableSortLabel,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Table,
  Box,
} from "@mui/material";
import { visuallyHidden } from "@mui/utils";

import MoreMenu from "../utils/MoreMenu";

const IDS_TO_FILTER_OUT = new Set(["more"]);

export default function TableWithOptions({
  objects,
  TABLE_HEAD,
  handleObjectCreateOpen,
  handleObjectDelete,
}: {
  objects: any[];
  TABLE_HEAD: any;
  handleObjectCreateOpen?: Function;
  handleObjectDelete?: Function;
}) {
  const [orderBy, setOrderBy] = useState("name");
  const [order, setOrder] = useState<"asc" | "desc">("asc");

  const handleRequestSort = (property: string) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const sortedObjects = React.useMemo(() => {
    const sortedArray = [...objects].sort((a, b) => {
      const aValue = a[orderBy];
      const bValue = b[orderBy];

      if (aValue < bValue) {
        return order === "asc" ? -1 : 1;
      } else if (aValue > bValue) {
        return order === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });

    return sortedArray;
  }, [objects, orderBy, order]);
  return (
    <TableContainer sx={{ minWidth: 440, maxHeight: 500 }}>
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_HEAD.map((headCell: any) => (
              <TableCell
                key={headCell.id}
                sortDirection={false ? "asc" : "desc"}
              >
                <TableSortLabel
                  hideSortIcon
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : "desc"}
                  onClick={() => {
                    handleRequestSort(headCell.id);
                  }}
                >
                  {headCell.label}
                  {orderBy === headCell.id ? (
                    <Box sx={{ ...visuallyHidden }}>
                      {order === "desc"
                        ? "sorted descending"
                        : "sorted ascending"}
                    </Box>
                  ) : null}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedObjects.map((obj: any) => (
            <TableRow key={obj.id}>
              {TABLE_HEAD.filter(
                (headCell: any) => !IDS_TO_FILTER_OUT.has(headCell.id)
              ).map((headCell: any) => (
                <TableCell key={`tc${obj.id}-${headCell.id}`}>
                  {obj[headCell.id]}
                </TableCell>
              ))}
              {handleObjectCreateOpen && handleObjectDelete && (
                <TableCell>
                  <MoreMenu
                    onDelete={() => handleObjectDelete(obj)}
                    onEdit={() => handleObjectCreateOpen(obj)}
                    onView={() => handleObjectCreateOpen(obj, true)}
                  />
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
