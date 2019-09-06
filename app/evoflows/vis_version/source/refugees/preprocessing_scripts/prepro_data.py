import csv


inputCsv = "../raw/Bclasseur_1960_2017.csv"
outputCsv = "../data.csv"

# 1
# DELETE THIS COUNTRIES FROM THE DATA.CSV
# BECAUSE THE GEOJSON DOES NOT HAVE THE COORDINATES
countriesToRemove=["various/unknown","montserrat","bonaire","american samoa","svalbard and jan mayen","wallis and futuna islands","norfolk island",
                    "mayotte","anguilla","saint-pierre-et-miquelon","guadeloupe","british virgin islands","sint maarten (dutch part)",
                    "us virgin islands","aruba","cook islands","liechtenstein","holy see (the)","niue","french polynesia","turks and caicos islands",
                    "marshall islands","gibraltar","cayman islands","micronesia (federated states of)","palau","saint kitts and nevis","nauru",
                    "bermuda","san marino","antigua and barbuda","monaco","dominica","tonga","tuvalu","martinique","saint vincent and the grenadines",
                    "barbados","french guiana","bahrain","malta","maldives","grenada","seychelles","stateless","tibetan","china. macao sar",
                    "wallis and futuna islands ","wallis and futuna islands","palestinian","curaçao","ròunion","","","",""]


# 2
# CHANGE THIS COUNTIES
# TO MATCH WITH THE GEOJSON FILE
countriesToChange =	{
    "venezuela (bolivarian republic of)": "venezuela",
    "bolivia (plurinational state of)": "bolivia",
    "united rep. of tanzania":"tanzania",
    "iran (islamic rep. of)":"iran",
    "the former yugoslav republic of macedonia":"macedonia",
    "rep. of moldova":"moldova",
    "lao people's dem. rep.":"laos",
    "russian federation":"russia",
    "dem. rep. of the congo":"dr congo",
    "bosnia and herzegovina":"bosnia",
	"dem. people's rep. of korea":"north korea",
	"rep. of korea":"south korea",
	"syrian arab rep.":"syria",
    "côte d'ivoire":"ivory coast",
    "serbia and kosovo (s/res/1244 (1999))":"serbia"
}


def preprocessing(country):
    tt = country.lower()
    if tt in countriesToChange:
        tt = countriesToChange.get(tt)
    return tt

f= open(outputCsv,'w',newline='')
data_writer = csv.writer(f,delimiter=",")

with (open(inputCsv,'r')) as inputFile:
    data_reader = csv.reader(inputFile,delimiter=',')
    for row in data_reader:
        origin = preprocessing(row[1])
        destination = preprocessing(row[2])
        if origin not in countriesToRemove and destination not in countriesToRemove:
            data_writer.writerow([row[0],origin,destination,row[3],row[4],row[5],row[6],row[7],row[8],row[9]])
        