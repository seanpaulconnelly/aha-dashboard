
### A dashboard for your Aha.io product

##### Overview

- User enters release number and clicks 'Load dashboard'
- Calls Aha API - `/api/v1/releases/:release_id`
	- Gets metadata (name, start date, release date, link to Aha)
	- Gets original estimated velocity (original_estimate)
	- Gets actual velocity (work_done)
- Calls Aha API - `/api/v1/releases/:release_id/features`
	- Gets a list of feature metadata (name, link to Aha, workflow status, original estimate)
	- Gets assigned user
- Internally - tallies features assigned to each user
	- How many stories does Joe Bob have (shipped and not shipped)
	- How many total points does Joe Bob have (shipped and not shipped)
	- How many stories are unassigned
	- How many total points are unassigned


### Note: Aha requires an https connection

- Generate a self signed certificate ([here are instructions](https://gist.github.com/trcarden/3295935))
- `gem install foreman`
- Create a Procfile, add `web: bundle exec thin start -p 3001 --ssl --ssl-key-file ~/.ssl/server.key --ssl-cert-file ~/.ssl/server.crt`
- Create a .env file and add: 

```
AHA_API_KEY=
AHA_REDIRECT_URI=https://localhost.ssl:3001/
AHA_SUBDOMAIN=
AHA_PRODUCT_KEY=
```

- `foreman start`
- visit https://localhost.ssl:3001