import json

#hierarchy path
hierarchy_path = '../hierarchy.json'

#geojson
geojson_path = '../geojsons/geojson_regions.json'

def reader_json(json_path):
    with(open(json_path,'r')) as reader:
        reader_json = json.load(reader)
    return reader_json

def writer_json(json_path, json_data):
    with(open(json_path,'w')) as writer:
        writer.write(json.dumps(json_data)) 

def find_name_in_node(curr_node,name_search):
    global resultado
    if 'children' in curr_node:
        for child in curr_node['children']:
            if child['name'] == name_search:
                resultado = curr_node['name']
                break
            
            find_name_in_node(child,name_search)
        
hierarchy = reader_json(hierarchy_path)['ranges']
features = reader_json(geojson_path)['features']
for feature in features:
    name_search = feature['properties']['name']
    resultado = ""
    find_name_in_node(hierarchy,name_search)
    feature['properties']['STATE'] = resultado
    if resultado=="":
        print('for',name_search)


#writter the new geojson with STATE property
data = {"type":"FeatureCollection", 'features':features}
writer_json(geojson_path,data)