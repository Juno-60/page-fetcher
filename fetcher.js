// --------------------------------------------------
//                  USE SYNTAX:
// node fetcher.js http://<WEBSITE>.com ./<FILE>.html
// --------------------------------------------------

// -- import required filesystem and network node packages
const fs = require('fs');
const net = require('net');

// -- Begin Here
const fetcher = function(URL, filePath) {
  // -- set command line arguments at index 2 and 3 to 
  // -- URL and filePath variables respectively
  URL = process.argv[2];
  filePath = `${process.argv[3]}`;
  // -- create connection to host
  const conn = net.createConnection({
    // -- host can't start with http. substring removes protocol characters.
    host: `${URL.substring(7)}`,
    port: 80,
  });
  conn.setEncoding('UTF8');
  // -- Request the goodies
  conn.on('connect', () => {
    console.log(`Connected to server!`);
    conn.write(`GET / HTTP/1.1\r\n`);
    conn.write(`Host: ${URL.substring(7)}\r\n`);
    conn.write(`\r\n`);
  });
  // -- Write recieved goods (a+ to append to existing, or creates a file)
  conn.on('data', (data) => {
    fs.writeFile(`${filePath}`, data, err => {
      if (err) {
        console.error(err)
        return;
      }
      else return console.log(`Downloaded and saved ${data.length} bytes to ${filePath}!`);
    })
    conn.end();
  })
;}

fetcher();