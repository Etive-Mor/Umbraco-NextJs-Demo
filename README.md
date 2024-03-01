# Umbraco-NextJs-Demo

## Run the apps



### Run the Umbraco application 
`dotnet run --project "UmbracoNextJsDemo.Site"` 

- The site should launch at http://localhost:59970/umbraco/login
  - Username: demo@example.com
  - Password: Test123456@
  - These are configured in appsettings.json
- uSync is configured to run on first build, but if it doesn't, sign into Umbraco and visit the dashboard http://localhost:59970/umbraco#/settings/usync/dashboard?mculture=en-US and click *Everything -> Import -> All* to create the content

### Run the NextJS frontend application

- The umbraco site must be running before the next.js client will build

`npm run dev --prefix .\umbraco-next-js-demo-client\`