import * as path from "path";
import { parse } from "csv-parse/sync";
import * as fs from "fs";

// //** 
//  * @param filepath 
//  *
//  * @returns 
//  */

function readCsv(filepath: string): any[] {
  // read a file
  const cxvDataStr = fs.readFileSync(filepath, { encoding: "utf-8" });

  // parse data to get desired values
  const csvDataArr = parse(cxvDataStr, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return csvDataArr;
}

export default {readCsv};