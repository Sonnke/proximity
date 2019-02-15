# proximity

# Installations:

clone the project and run <strong>npm install</strong><br>

Your dashboard is located at: <strong>localhost:8080</strong>

create a .env file for your database connection as follows:
<ol>
<li>DB_NAME=your database name</li>
<li>DB_HOST=yourhost</li>
<li>DB_USER=youruser</li>
<li>DB_PASSWORD=yourpassword</li>
</ol>
Run <strong>npm run dev</strong> and your database tables will be created automatically

# APIs
<ul>
<li>POST /api/raw/upload - upload your csv file (arguments :csv)</li>
<li>POST /api/raw/add - add single row (arguments: <strong>{mac_address, date,minutes}</strong>)</li>

<h2>BY DATE</h2>
<ul>

<li><strong>GET /api/raw/bydate/:date/:limit </strong>- return data by date</li>
<li><strong>GET /api/raw/date/between/:from/:to </strong>- return data based on date range</li>
<li><strong>GET /api/raw/date/before/:before</strong> - return data that's less than a provided date</li>
<li><strong>GET /api/raw/date/after/:after</strong> - return data tha's greater than a provided date</li>
</ul>
<h2>BY TIME</h2>
<ul>
<li><strong>GET /api/raw/bytime/:time</strong>- return date by time</li>
<li><strong>GET /api/raw/time/before/:before</strong> - return data less than provided minutes</li>
<li><strong>GET /api/raw/time/after/:after </strong>- return data greater than provided minutes</li>
<li><strong>GET /api/raw/time/between/:from/:to </strong>- data from a provided range of minutes</li>
</ul>
<h2>By VENDOR</h2>

<strong>GET /api/raw/byvendor/:vendor</strong> - get data by vendor or manufacture
<br>
<h2>PROCESS RAW DATA</h2>
<br><br>
<strong>GET /api/raw/process/data</strong>  - Get Vendor or manufacture by mac address and save to processed table
<code>
const Mac = new MacToVendor()

Mac.GetVendorByMac("90:8D:78:10:CC:25").then((vendor)=>{
    console.log(vendor)
})
</code><br>OR
<code>
const Mac = new MacToVendor()
const vendor = await Mac.GetVendorByMac("90:8D:78:10:CC:25")
</code>
