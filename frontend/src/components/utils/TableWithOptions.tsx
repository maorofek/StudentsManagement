import React from "react";
import {
  TableSortLabel,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
  Table,
} from "@mui/material";
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
  handleObjectCreateOpen: Function;
  handleObjectDelete: Function;
}) {
  return (
    <TableContainer sx={{ minWidth: 440, maxHeight: 500 }}>
      <Table>
        <TableHead>
          <TableRow>
            {TABLE_HEAD.map((headCell: any) => (
              <TableCell key={headCell.id}>
                <TableSortLabel active={false} direction="asc">
                  {headCell.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {objects.map((obj: any) => (
            <TableRow key={obj.id}>
              {TABLE_HEAD.filter(
                (headCell: any) => !IDS_TO_FILTER_OUT.has(headCell.id)
              ).map((headCell: any) => (
                <TableCell key={`tc${obj.id}-${headCell.id}`}>
                  {obj[headCell.id]}
                </TableCell>
              ))}
              <TableCell>
                <MoreMenu
                  onDelete={() => handleObjectDelete(obj)}
                  onEdit={() => handleObjectCreateOpen(obj)}
                  onView={() => handleObjectCreateOpen(obj, true)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
