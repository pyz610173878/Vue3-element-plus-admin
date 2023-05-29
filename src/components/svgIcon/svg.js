

// // 获取当前svg目录所有为.svg结尾的文件
// const svgFiles = import.meta.globEager('./icons/*.svg')

// // 解析获取的.svg文件的文件名称，并返回
// for (const path in svgFiles) {
//   const svgFile = svgFiles[path]
//   console.log(`SVG File: ${path}`)
//   console.log(svgFile)
// }


// Import all .svg files in the 'icon' directory
const svgModules = import.meta.globEager('./icon/*.svg')

// svgModules is an object where keys are the file paths and values are the modules
const svgFiles = Object.keys(svgModules).map(filePath => svgModules[filePath])

// Now svgFiles is an array of all your SVG files
console.log(svgFiles)
