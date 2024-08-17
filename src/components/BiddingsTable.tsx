"use client";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React from "react";

const BiddingsTable = () => {
  const { records } = useAppSelector((state: RootState) => state.game);
  return (
    <Table>
      <TableHead>
          <TableHeadCell>Index</TableHeadCell>
          <TableHeadCell>bid</TableHeadCell>
          <TableHeadCell>result</TableHeadCell>
      </TableHead>
      <TableBody>
        {records && records.length > 0 ?records.map((item, index) => (
          <TableRow key={index}>
            <TableCell>{index}</TableCell>
            <TableCell>{item.biddingPoints}</TableCell>
            <TableCell>{item.result}</TableCell>
          </TableRow>
        )) : null}
      </TableBody>
    </Table>
  );
};

export default BiddingsTable;
