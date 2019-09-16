function getPercentajeVariation(curr,prev){
	let variation = Math.abs(curr-prev);
	let x = ((variation*100)/prev);
	return x;
}


function getPointAnomalyBy(timeSerieValues,percentaje){

	let aryResult = [];
	for (let i=1;i<timeSerieValues.length;i++){

		let currTS = timeSerieValues[i];
		let prevTS = timeSerieValues[(i-1)];

		let currTSValue = currTS.value;
		let prevTSValue = prevTS.value;

		let currVariation = getPercentajeVariation(currTSValue,prevTSValue);

		if(isFinite(currVariation) && currTSValue>0 && prevTSValue>0){

			if(currVariation>=percentaje){
				// console.log(currVariation,currTSValue,prevTSValue)
				aryResult.push({
					"date":currTS.date,
					"relationRelative":(currTSValue>prevTSValue)?1:0
				});
			}
		}
		
	}

	// }

	return aryResult;

}

function getPointDetectionByThreshold(timeSerieValues, threshold){
	let aryResult = [];

	// singleTimeSerieValues.forEach(){
		// category: ""
		// components: (3) [{…}, {…}, {…}]
		// coordinates: {x1: 287.0747657544685, y1: 383.0923821000915, x2: 338.4429603345466, y2: 394.3576932518433}
		// date: Tue Jan 01 1980 00:00:00 GMT+0100 (heure normale d’Europe centrale) {}
		// key: "R0_5_0_19"
		// overlaping: true
		// text: []
		// value: 193140
		// y: 193140
		// y0: 27485812.5
	// }

	for(let i=1; i<timeSerieValues.length;i++){

		let currTS = timeSerieValues[i];
		let prevTS = timeSerieValues[(i-1)];
		let relativeValue = currTS.value - prevTS.value;
		let absRelationReference = Math.abs(relativeValue);
		
		if(absRelationReference>threshold){
			aryResult.push({
				"date":currTS.date,
				"relationRelative":(relativeValue>0)?1:0 //1 up; 0 down
			});
		}

	}
	
	return aryResult;

}

