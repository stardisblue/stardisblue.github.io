
function getTimeWindow(start, stop, polaridad, step){
		//step :  (every N minutes/hours/days/months or years)
		let timeWindow; 
		switch(polaridad.toLowerCase()){
			case "m":
				timeWindow = d3.time.minutes(start, stop, step);
				break;
			case "h":
				timeWindow = d3.time.hours(start, stop, step);
				break;
			case "d":
				timeWindow = d3.time.days(start, stop, step);
				break;
			case "b":
				timeWindow = d3.time.months(start, stop, step);
				break;
			case "y":
				timeWindow = d3.time.years(start, stop, step);
				break;
			default:
				console.log("polarity problem")
				break;
		}
		return timeWindow;
}

function getTimeRound(start, polaridad){
	let timeRound; 
	switch(polaridad.toLowerCase()){
		case "m":
			timeRound = d3.time.minute.round(start);
			break;
		case "h":
			timeRound = d3.time.hour.round(start);
			break;
		case "d":
			timeRound = d3.time.day.round(start);
			break;
		case "b":
			timeRound = d3.time.month.round(start);
			break;
		case "y":
			timeRound = d3.time.year.round(start);
			break;
		default:
			console.log("gettimeRound")
			break;
	}
	return timeRound;
}

//interval.offset(date, step)
function getTimeOffset(start, offset, polaridad){
	let timeOffset; 
	switch(polaridad.toLowerCase()){
		case "m":
			timeOffset = d3.time.minute.offset(start, offset);
			break;
		case "h":
			timeOffset = d3.time.hour.offset(start, offset);
			break;
		case "d":
			timeOffset = d3.time.day.offset(start, offset);
			break;
		case "b":
			timeOffset = d3.time.month.offset(start, offset);
			break;
		case "y":
			timeOffset = d3.time.year.offset(start, offset);
			break;
		default:
			console.log("getTimeOffset")
			break;
	}
	return timeOffset;
}


function getTimePolarity(polaridad){
	let timePolarity
	switch(polaridad.toLowerCase()){
		case "m":
			timePolarity = d3.time.minutes;
			break;
		case "h":
			timePolarity = d3.time.hours;
			break;
		case "d":
			timePolarity = d3.time.days;
			break;
		case "b":
			timePolarity = d3.time.months;
			break;
		case "y":
			timePolarity = d3.time.years;
			break;
		default:
			console.log("Error in getTimePolarity")
			break;
	}
	return timePolarity;
}


function printLog(startDate, methodName){
	if(opts.log){
		console.log(methodName + ": " +(Date.now()-startDate)/1000 + " seg.");
	}
}

function getBrowser() {
	  if( navigator.userAgent.indexOf("Chrome") != -1 ) {
	    return "Chrome";
	  } else if( navigator.userAgent.indexOf("Opera") != -1 ) {
	    return "Opera";
	  } else if( navigator.userAgent.indexOf("MSIE") != -1 ) {
	    return "IE";
	  } else if( navigator.userAgent.indexOf("Firefox") != -1 ) {
	    return "Firefox";
	  } else { 
	    return "unknown";
	  }
}



function getAvg(...arg){
	let sum = 0;
	for(let value of arg){
		sum +=value;
	}
	return sum / arg.length;
}

// Ref math.js library
function getStd(...arg){
	return math.std(arg);
}



// function standardDeviation(values){
//   var avg = average(values);
  
//   var squareDiffs = values.map(function(value){
//     var diff = value - avg;
//     var sqrDiff = diff * diff;
//     return sqrDiff;
//   });
  
//   var avgSquareDiff = average(squareDiffs);
 
//   var stdDev = Math.sqrt(avgSquareDiff);
//   return stdDev;
// }
 
// function average(data){
//   var sum = data.reduce(function(sum, value){
//     return sum + value;
//   }, 0);
 
//   var avg = sum / data.length;
//   return avg;
// }

// function median(values) {

//     values.sort( function(a,b) {return a - b;} );

//     var half = Math.floor(values.length/2);

//     if(values.length % 2)
//         return values[half];
//     else
//         return (values[half-1] + values[half]) / 2.0;
// }


/* Return number of minutes in brush object */
function calculeNumIntervals(brushObject, polarityTemporal, stepTemporal) {
	var result;
	switch (polarityTemporal) {
	case "m":result = d3.time.minutes(brushObject.extent()[0], brushObject.extent()[1], stepTemporal).length;
		break;
	case "h":result = d3.time.hours(brushObject.extent()[0],brushObject.extent()[1], stepTemporal).length;
		break;
	case "d":result = d3.time.days(brushObject.extent()[0], brushObject.extent()[1],stepTemporal).length;
		break;
	case "b":result = d3.time.months(brushObject.extent()[0],brushObject.extent()[1], stepTemporal).length;
		break;
	case "y":result = d3.time.years(brushObject.extent()[0],brushObject.extent()[1], stepTemporal).length;
		break;
	}
	return result;
}


function getNumberOfLabels(polarityTemporal, i, j){
	
	var lenghtRange =  rangesDomainFocus[i].values[j].range[1]-rangesDomainFocus[i].values[j].range[0];
	var numberOfIntervals = intervals(polarityTemporal, i);
	var lenghtLabel;
	var numberOfLabels;
	
	lenghtLabel = getTextWidth(" 00:00 ","20px Arial");
		
	numberOfLabels = Math.floor(lenghtRange/lenghtLabel);

	//If the number of labels to put is bigger than the number of intervales
	if(numberOfLabels > numberOfIntervals){
		numberOfLabels = numberOfIntervals;
	}
	
	return numberOfLabels;
}


function getNumIntervalsDistortion(polarityTemporal, i, j,sDisLeft, sDisRight){
	var numInterval = intervals(polarityTemporal, i);
	var taille = rangesDomainFocus[i].values[j].range[1]-rangesDomainFocus[i].values[j].range[0];
	var sizeLabel; // = getTextSize("00:00","10px Arial");
	if(i==1){//distortion left
		taille = sDisLeft;
		if(j%2==1){
			sizeLabel = getTextWidth(" 00:00 ","20px Arial") *2
		}else{
			sizeLabel = 1000000000;
		}
	}else if(i==3){//distortion right
		taille = sDisRight;
		if(j%2==1){
			sizeLabel = getTextWidth(" 00:00 ","20px Arial") *2
		}else{
			sizeLabel = 1000000000;
		}
	}
	
	var x = numInterval/(taille / sizeLabel); //numInterval/
	//Cada cuantos intervalos de tiempo se ponen el axis label
	//Ex: return 3; =  cada 10 minutos
	return Math.floor(x);
	
}




function intervals(polarityTemporal, i){
	var interval;
	switch (polarityTemporal) { 
		case "m":
			switch (i) { 
				case 0:
					interval = (d3.time.minutes(brushContextNorLeft.extent()[0],
							brushContextNorLeft.extent()[1])).length;
					break;
				case 1:
					interval = (d3.time.minutes(brushContextDisLeft.extent()[0],
							brushContextDisLeft.extent()[1])).length;
					break;
				case 2:
					interval = (d3.time.minutes(brushContext.extent()[0],
							brushContext.extent()[1])).length;
					break;
				case 3:
					interval = (d3.time.minutes(brushContextDisRight.extent()[0],
							brushContextDisRight.extent()[1])).length;
					break;
				case 4:
					interval = (d3.time.minutes(brushContextNorRight.extent()[0],
							brushContextNorRight.extent()[1])).length;
					break;
			}
			break;
		case "h":
			switch (i) { 
				case 0:
					interval = (d3.time.hours(brushContextNorLeft.extent()[0],
							brushContextNorLeft.extent()[1])).length;
					break;
				case 1:
					interval = (d3.time.hours(brushContextDisLeft.extent()[0],
							brushContextDisLeft.extent()[1])).length;
					break;
				case 2:
					interval = (d3.time.hours(brushContext.extent()[0],
							brushContext.extent()[1])).length;
					break;
				case 3:
					interval = (d3.time.hours(brushContextDisRight.extent()[0],
							brushContextDisRight.extent()[1])).length;
					break;
				case 4:
					interval = (d3.time.hours(brushContextNorRight.extent()[0],
							brushContextNorRight.extent()[1])).length;
					break;
			}
		break;			
		case "d":
			switch (i) { 
				case 0:
					interval = (d3.time.days(brushContextNorLeft.extent()[0],
							brushContextNorLeft.extent()[1])).length;
					break;
				case 1:
					interval = (d3.time.days(brushContextDisLeft.extent()[0],
							brushContextDisLeft.extent()[1])).length;
					break;
				case 2:
					interval = (d3.time.days(brushContext.extent()[0],
							brushContext.extent()[1])).length;
					break;
				case 3:
					interval = (d3.time.days(brushContextDisRight.extent()[0],
							brushContextDisRight.extent()[1])).length;
					break;
				case 4:
					interval = (d3.time.days(brushContextNorRight.extent()[0],
							brushContextNorRight.extent()[1])).length;
					break;
			}
		break;					
		case "b":
			switch (i) { 
				case 0:
					interval = (d3.time.months(brushContextNorLeft.extent()[0],
							brushContextNorLeft.extent()[1])).length;
					break;
				case 1:
					interval = (d3.time.months(brushContextDisLeft.extent()[0],
							brushContextDisLeft.extent()[1])).length;
					break;
				case 2:
					interval = (d3.time.months(brushContext.extent()[0],
							brushContext.extent()[1])).length;
					break;
				case 3:
					interval = (d3.time.months(brushContextDisRight.extent()[0],
							brushContextDisRight.extent()[1])).length;
					break;
				case 4:
					interval = (d3.time.months(brushContextNorRight.extent()[0],
							brushContextNorRight.extent()[1])).length;
					break;
			}
		break;	
		case "y":
			switch (i) { 
				case 0:
					interval = (d3.time.years(brushContextNorLeft.extent()[0],
							brushContextNorLeft.extent()[1])).length;
					break;
				case 1:
					interval = (d3.time.years(brushContextDisLeft.extent()[0],
							brushContextDisLeft.extent()[1])).length;
					break;
				case 2:
					interval = (d3.time.years(brushContext.extent()[0],
							brushContext.extent()[1])).length;
					break;
				case 3:
					interval = (d3.time.years(brushContextDisRight.extent()[0],
							brushContextDisRight.extent()[1])).length;
					break;
				case 4:
					interval = (d3.time.years(brushContextNorRight.extent()[0],
							brushContextNorRight.extent()[1])).length;
					break;
			}
		break;				
	}
	return interval;
}

function removeOverlapping(data){
	//DATA STRUCTURE
	//data.element.forEach(function(element){
		// element.key = key;
		// element.overlaping = false;
		// element.coordinates = {"x1":x1,"y1":y1,"x2":x2,"y2":y2};;
	// })
	data.forEach(function(element){

		let rangeOthers = data.filter(function(elementToFilter){
			return element.key != elementToFilter.key;
		});

		let rectElement = {left: element.coordinates.x1, 
							 bottom: element.coordinates.y1, 
							 right: element.coordinates.x2, 
							  top: element.coordinates.y2};
							  
		rangeOthers.forEach(function(elementOther){
			if(!elementOther.overlaping){
				var rectElementOther = {
						left: elementOther.coordinates.x1, 
						bottom: elementOther.coordinates.y1, 
						right: elementOther.coordinates.x2, 
						top: elementOther.coordinates.y2} 
				if(intersectRect(rectElement, rectElementOther)){
					element.overlaping = true;
				}
			}
		});
	});

	//To get just text label that are not overlapping
	return data.filter(element=>element.overlaping == false);
}


//Get text width
function getTextWidth(text, font){
	d3.select("body").append("canvas").attr("id",'myCanvas');
	var c=document.getElementById('myCanvas');
	var ctx=c.getContext('2d');
	ctx.font=font;
	var m=ctx.measureText(text);
	d3.selectAll("#myCanvas").remove();
	return m.width;
}

function intersectRect(r1, r2) {
	  return !(r2.left > r1.right || 
	           r2.right < r1.left || 
	           r2.bottom > r1.top ||
	           r2.top < r1.bottom);
}

function moyenneTableau(arr) {
	  var somme = 0;
	  for (var i = 0, j = arr.length; i < j; i++) {
	    somme += arr[i];
	  }
	  return somme / arr.length;
}

function exportToCsv(filename, rows) {
    var processRow = function (row) {
        var finalVal = '';
        for (var j = 0; j < row.length; j++) {
            var innerValue = row[j] === null ? '' : row[j].toString();
            if (row[j] instanceof Date) {
                innerValue = row[j].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (j > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };

    var csvFile = '';
    for (var i = 0; i < rows.length; i++) {
        csvFile += processRow(rows[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) { // IE 10+
        navigator.msSaveBlob(blob, filename);
    } else {
        var link = document.createElement("a");
        if (link.download !== undefined) { // feature detection
            // Browsers that support HTML5 download attribute
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
}

