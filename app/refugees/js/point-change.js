

//1 The probabilistc density of two consecutive intervals is calculed SEPARATELY 
//2 The ratio of these probabilist densities is computed

function getPointDetection(timeSerie, threshold){
	let aryReference = [];
	let aryResult = [];
	
	// console.log(timeSerie);

	// Step 1
	for(let i=1; i<timeSerie.length;i++){
		let key = timeSerie[i];
		let currVal = timeSerie[i];
		let befVal = timeSerie[(i-1)];
		let reference = getAvg(currVal.value,befVal.value);
			
		aryReference.push({
			"date":currVal.date,
			"reference":reference,
			"key": key
		});
	}
	
	//or use filter
	//Step2
	for(let i=1; i<aryReference.length;i++){
		let currVal = aryReference[i];
		let befVal = aryReference[(i-1)];
		let abs = Math.abs(currVal.reference - befVal.reference);
		if(abs>threshold){
			aryResult.push({
				date:currVal.date,
				key:currVal.key
			});
//			aryResult.push({
//				"date":currVal.date,
//				"std":currVal.std
//			})
		}
	}
		
	return aryResult;
}

