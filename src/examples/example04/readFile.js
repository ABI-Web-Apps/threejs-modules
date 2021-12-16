var fs = require("fs");
var path = require("path");
var exec = require("child_process").exec;

function readFileFullPath(dir, filesList = []) {
  const files = fs.readdirSync(dir);
  // console.log(files);
  files.forEach((item, index) => {
    var fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      readFileList(path.join(dir, item), filesList); //递归读取文件
    } else {
      filesList.push(fullPath);
    }
  });
  return filesList;
}

function readFileName(dir, filesList = []) {
  filesList = fs.readdirSync(dir);
  // filesList = files;
  // console.log(filesList);
  return filesList;
}

function writeJson() {
  // const filesList = readFileName("../assets/images/dicom4/series-00001/");
  const filesList = readFileName("../assets/images/dicom1/");
  console.log(filesList);
  const data = JSON.stringify(filesList, null, 4);
  try {
    fs.writeFileSync("dicom.json", data);
    console.log("JSON data is saved.");
  } catch (error) {
    console.error(err);
  }
}

writeJson();
