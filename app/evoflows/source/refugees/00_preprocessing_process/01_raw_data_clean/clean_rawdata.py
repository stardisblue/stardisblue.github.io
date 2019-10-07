import csv
import os
import re #REG


inputCsv = "../00_raw_data/unhcr_popstats_export_persons_of_concern_all_data_until_2018.csv"
inputTmpCleanCsv = "../00_raw_data/tmpClean.csv" #create automatic over the preprocess and delete after finish
outputCsv = "../02_raw_data_processed/input/data.csv"

# 1
# DELETE THESE COUNTRIES FROM DATA.CSV
# BECAUSE THE GEOJSON DOES NOT HAVE THE COORDINATES AS THEY ARE SMALL COUNTRIES
countriesToRemove=["various/unknown","montserrat","bonaire","american samoa","svalbard and jan mayen","wallis and futuna islands","norfolk island",
                    "mayotte","anguilla","saint-pierre-et-miquelon","guadeloupe","british virgin islands","sint maarten (dutch part)",
                    "us virgin islands","aruba","cook islands","liechtenstein","holy see (the)","niue","french polynesia","turks and caicos islands",
                    "marshall islands","gibraltar","cayman islands","micronesia (federated states of)","palau","saint kitts and nevis","nauru",
                    "bermuda","san marino","antigua and barbuda","monaco","dominica","tonga","tuvalu","martinique","saint vincent and the grenadines",
                    "barbados","french guiana","bahrain","malta","maldives","grenada","seychelles","stateless","tibetan","china macao sar",
                    "wallis and futuna islands ","wallis and futuna islands","palestinian","curaçao","ròunion","réunion","","",""]


# 2
# CHANGE THIS COUNTRIES
# TO MATCH WITH THE GEOJSON FILE
countriesToChangeNames = {
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
    currCountry = country.lower()
    if currCountry in countriesToChangeNames:
        currCountry = countriesToChangeNames.get(currCountry)
    return currCountry

#The tmpCsv file without possible quotes
fclean = open(inputTmpCleanCsv, "w")

#Cleaning possible quotes in the inputCSV file
with(open(inputCsv,'r')) as inputFile:
    for row in inputFile:
        findQuotes = re.findall("\"", row)
        if len(findQuotes)>=1:
            #If there is quotes
            row = re.sub("\"", "", row)
            row = re.sub(", ", " ", row)
            row = re.sub(" ,", " ", row)
        fclean.write(row)
    fclean.close()

#The outputCSV
f= open(outputCsv,'w',newline='')
#The CSV writter of the outputCSV
data_writer = csv.writer(f,delimiter=",")
with (open(inputTmpCleanCsv,'r')) as inputFile:
    data_reader = csv.reader(inputFile,delimiter=',') #,doublequote=False
    # data_reader = csv.reader(inputFile,delimiter=',',quotechar='"', quoting=csv.QUOTE_MINIMAL)
    for row in data_reader:
        origin = preprocessing(row[1])
        destination = preprocessing(row[2])
        if origin not in countriesToRemove and destination not in countriesToRemove:
            data_writer.writerow([row[0],origin,destination,row[3],row[4],row[5],row[6],row[7],row[8],row[9]])

#Delete the inputTmpCSV
if os.path.exists(inputTmpCleanCsv):
    os.remove(inputTmpCleanCsv)
