
### A dashboard for your Aha.io product

Provides a snapshot view of a current release cycle for Product Managers or CTOs.

### Setup instructions

- Estimate using story points in Aha!
- Set up your workflow statuses in Aha! to be the following:
	- In Backlog, Sprint Backlog, Working..., Testing issues, Code Review, On Staging, Ready to ship, Shipped
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