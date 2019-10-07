
1 GET DATA

- DOWNLOAD THE LASTET DATASET FROM: http://popstats.unhcr.org/en/persons_of_concern AND SAVE IT TO "\00_preprocessing_process\00_raw_data"

- In this file, replace the 3 first column titres:
	year,destination,origin,..........

- Replace manually in the download file
	CuraÃ§ao by Curaçao
	CÃ§ d'Ivoire by Côte d'Ivoire

2 CLEAN DATA 

- RUN THE \00_preprocessing_process\01_raw_data_clean\clean_rawdata.py 
	*Set input values to:
		"inputCsv" INPUT PATH
	*Set output values to:
		"outputCsv" OUTPUT PATH

3 AGGREGATE DATA AND SAVE AS JSON
- RUN THE \00_preprocessing_process\02_raw_data_processed\run.js
	*Set INPUT values to:
		"pathInput" INPUT PATH: hierarchy.json, geojson.json, and data.CSV
	$Set OUTPUT values to:
		"pathOutput" OUTPUT DATA.JSON


4 GEOJSON DATA
- ONLY IF NECESSARY