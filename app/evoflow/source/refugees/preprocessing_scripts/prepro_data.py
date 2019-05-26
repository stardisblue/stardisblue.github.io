import csv


inputCsv = "../classeur.csv"
outputCsv = "../output.csv"

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
    "bosnia and herzegovina":"bosnia"
}

countriesToRemove=["various/unknown"]

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
        