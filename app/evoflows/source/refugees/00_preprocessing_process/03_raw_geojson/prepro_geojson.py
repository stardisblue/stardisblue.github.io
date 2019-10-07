import json
from prepro_data import preprocessing

inputGeoJson = '../countries-hires-filter2.json'
outpuGeoJson = '../geojson.json'

data = {}
data['type']='FeatureCollection'
data['features']=[]


f= open(outpuGeoJson,'w')


with (open(inputGeoJson,'r')) as inputData:
    dataGeoJson = json.load(inputData)
    for feature in dataGeoJson['features']:
        feature['properties']['name'] = preprocessing(feature['properties']['name'])
        data['features'].append(feature)

    f.write(json.dumps(data,indent=4))
