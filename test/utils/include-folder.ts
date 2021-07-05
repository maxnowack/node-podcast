// https://www.npmjs.com/package/include-folder
import fs from "fs";

export interface Options {
  preserveFilenames?: boolean;
}

export interface Probs {
  [prop: string]: number;
}

export function includeFolder(
  folderName: string,
  filter: RegExp,
  options: Options = {}
) {
  folderName = folderName.replace(/\/$/, "");

  if (!filter) {
    filter = /^[^.].*$/;
  }

  if (typeof options !== "object") {
    options = {};
  }

  const source = includeFolder.buildSource(folderName, filter, options);
  return new Function("require", "__dirname", source)(require, folderName);
}

includeFolder.normalize = function (name: string) {
  const chars = [];
  let nextUpper = false;
  let i = 0;
  const l = name.length;

  for (; i < l; i++) {
    const c = name.charAt(i);
    if (/\w/.test(c)) {
      chars.push(nextUpper ? c.toUpperCase() : c);
      nextUpper = false;
    } else {
      nextUpper = true;
    }
  }
  name = chars.join("");
  return name;
};

includeFolder.stripExtension = function (fileName: string) {
  return fileName.replace(/^\./, "").replace(/\.[^/.]+$/, "");
};

includeFolder.buildSource = function (
  folderName: string,
  filterRegEx: RegExp,
  options: Options = {}
) {
  const files = fs.readdirSync(folderName);
  const allProps: Probs = {};
  const filter = filterRegEx.test.bind(filterRegEx);
  const fields = files.filter(filter).map(function (fileName) {
    let name = includeFolder.normalize(includeFolder.stripExtension(fileName));

    if (options && options.preserveFilenames === true) {
      name = fileName;
    }

    if (name in allProps) {
      allProps[name]++;
      name += "_" + allProps[name];
    } else {
      allProps[name] = 0;
    }

    return (
      'self["' +
      name +
      '"] = fs.readFileSync("' +
      folderName +
      "/" +
      fileName +
      '","utf8");'
    );
  });

  return (
    "var self={}," +
    'fs = require("fs");\n' +
    fields.join("\n") +
    "\nreturn self"
  );
};
