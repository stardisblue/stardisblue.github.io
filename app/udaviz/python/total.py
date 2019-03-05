import json
import csv

with open("input.json", encoding="utf8") as jsonFile:
    x = json.load(jsonFile)


output_csv = csv.writer(open("output.csv", "w+",newline='',encoding="utf-8"))
# Write CSV Header, If you dont need that, remove this line
output_csv.writerow(["date", "category", "text"])
for k in x["data"]:
    print(k)
    output_csv.writerow([k["date_time"],k["value"],k["text"]])

#with open("new_csv.csv","w+") as empleado_file:
#	employee_writer = csv.writer(empleado_file, delimiter=',', quotechar='"', quoting=csv.QUOTE_MINIMAL)

#	for row in x["data"]:
#		print(row)
#		employee_writer.writerow(["","",""])
