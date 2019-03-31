const fs = require('fs');
const getopts = require('getopts');

let opts = getopts(process.argv.slice(2), {
    string: ['f', 'file', 'filename', 't', 'target', 'targetfile']
});
let filename = opts.f || opts.file || opts.filename || './source.txt';
let output = opts.t || opts.target || opts.targetfile || './target.txt';

let lines = [];

let fuged = ''
// fs.access(filename, err => {
//     if(err) {
//         console.warn('File not exists: ', filename);
//     }

//     let reader = fs.createReadStream(filename, {
//         encoding: 'utf8'
//     });

//     reader.on('data', data => {
//         let dataArray = data.split('\n')
//         lines.push(dataArray);
//     });
//     reader.on('error', err => {
//         return err;
//     })
//     reader.on('end', () => {
//         fuged = lines.map(line => {
//             line = line.replace('"', '\"')
//             return `"${line}"`;
//         }).join();
//         writeToFile(output, fuged);
//     })
//     // reader.read();
//     // fs.createReadStream(filename).pipe(process.stdout);
// });
fuged = fs.readFileSync(filename);
lines = fuged.toString().replace('"', '\"').split('\n');
lines = lines.map(item => {
    return `"${item}"`
})

// lines.unshift('[')
// lines.push(']');

let content = `[\n  ${lines.join(',\n  ')}\n]`;
console.log(content);
writeToFile(output, content);


function writeToFile(filename, content) {
    fs.access(filename, err => {
        if (err) {
            console.warn(err);
        }
    });
    let writer = fs.createWriteStream(filename);
    writer.write(content);
}



// let lines = fs.readFileSync(filename);

// console.log(lines.toString());
// let linesArray = lines.toString().replace('"', '\"').split('\n')
// console.log(linesArray);

// let fugedLines = '';

// let length = linesArray.length
// let len = length - 1;

// if(len > 0) {
//     for(let i = 0; i < len; i ++) {
//         fugedLines += `"${linesArray[i]}"\n`;
//     }
// }

// fs.open('./target.txt', 'w+', (err, desc) => {
//     if(err) {
//         throw new Error('Write error:', err)
//     }
//     // console.log(desc);


// })


// // check for existence
// // fs.access(, function (err) { callback })