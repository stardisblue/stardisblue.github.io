import json
from prepro_data import preprocessing

inputHierarchyJson = '../hierarchy.json'
outpuHierarchyJson = '../hier.json'

# NO TERMINADO

data = {}
data['ranges']={}

def a(rango):
    dataRango = .append({"name":"erick"})
    print(rango["name"])
    if "children" in rango:
        for r in rango["children"]:
            a(r)




with(open(inputHierarchyJson,'r')) as inputJson:
    hierarchyJson = json.load(inputJson)
    for rango in hierarchyJson["ranges"]["children"]:
        a(rango)
        
print(data)
