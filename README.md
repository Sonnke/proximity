# proximity

# Installations:

clone the project and run npm install

create a .env file for your database connection as follows:
DB_NAME=your database name
DB_HOST=yourhost
DB_USER=youruser
DB_PASSWORD=yourpassword

Run "npm run dev" and your database tables will be created automatically

# APIs
<ul>
<li>POST /api/raw/upload - upload your csv file</li>
<li>POST /api/raw/add - add single row</li>

BY DATE
<ul>

<li>POST /api/raw/bydate - return data by date</li>
<li>POST /api/raw/date/between - return data based on date range</li>
<li>POST /api/raw/date/before - return data that's less than a provided date</li>
<li>POST /api/raw/date/after - return data tha's greater than a provided date</li>
</ul>
BY TIME
<ul>
<li>POST /api/raw/bytime - return date by time</li>
<li>POST /api/raw/time/before - return data less than a provided minutes</li>
<li>POST /api/raw/time/after - return data greater than provided minutes</li>
<li>POST /api/raw/time/between - data from a provided range of minutes</li>
</ul>
By VENDOR

POST /api/raw/byvendor - get data by mac address vendor
<br>
PROCESS RAW DATA
<br>
GET /api/raw/process/data  - Get Vendor or manufactor by mac address and save to processed table  
