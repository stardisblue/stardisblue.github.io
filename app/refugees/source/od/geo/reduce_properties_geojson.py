import sys
import json

inputFileGeoJSON = sys.argv[1]
outputFileGeoJSON = sys.argv[2]

with open(inputFileGeoJSON,"r") as f:
	data=json.load(f)


newFeatures = []
for feature in data["features"]:
	newFeatures.append({
		"type":feature["type"],
		"id":feature["id"],
		"properties":{
			"name":feature["properties"]["NAME"]
		},
		"geometry":feature["geometry"]
	})

parserGeoJSON = {
	"type" : data["type"],
	"features" : newFeatures		
}

with open(outputFileGeoJSON,"w") as o:
	o.write(json.dumps(parserGeoJSON))

