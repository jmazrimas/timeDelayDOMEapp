var fs = require('fs');
var domeInputs = {}

var readDOMEInputs = function() {
  // Read in variables from DOME
  inData = fs.readFileSync('in.txt', 'utf8');
  inputs = inData.split("\n");
  for(var i=0; i<inputs.length; i++){
    line = inputs[i];
    nameVal = line.split("=");

    if(nameVal.length > 1){
      varName = nameVal[0].trim();
      varValue = nameVal[1].trim();
      domeInputs[varName] = varValue;
    }

  }
}

readDOMEInputs();

fs.writeFile('out.txt', '', 'utf8', function(err) {
  if(err) return console.log(err);
});

domeInputs['timeToWait'] = domeInputs['timeToWait'] > 1 ? domeInputs['timeToWait'] : 1
var delayTime = (domeInputs['timeToWait']/3)*1000
var i = 1

function writeOutput(){
  var outputData = 'Interval'+i+' = '+parseInt(delayTime*i)+'ms\n'

  fs.appendFile('out.txt', outputData, function (err) {
    if(err) return console.log(err);
  });

  i++

  if (i<4){
    setTimeout(writeOutput, delayTime)
  }

}

setTimeout(writeOutput, delayTime)
