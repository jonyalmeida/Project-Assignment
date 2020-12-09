# Step 1
## Parse respondents' data into usable format
- read data from file
- split data per line
- split line per ',' to obtain data by category
- save data in object in the format of, 1 entry with multiple key + value pairs 

# Step 2
## Match respondents parsed data to project requirements
- match industries' (there are 'x' industries listed in the project requirements --> keep count of number of industries a respondent matches with the requirements, use # of matches as matching score factor)
-  match job title
- calculate distance of respondents to different cities in requirements (include distance as a matching score factor)
- filter out any respondent whose distance to cities is larger than 100km

# Step 3
## Output results ordered by matching score
- develop matching score algorithm
- order results
- output

