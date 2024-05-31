//Small file for testing shows data

const data = require("./shows.json");


for(let i = 0; i < data.length; i++) {
  console.log("Checking", i);
  if(data[i]["id"] !== i+1){
    console.log("here", i+2);
  }
}