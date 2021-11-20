import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

// Create a DigitalOcean resource (Domain)
const domain = new digitalocean.Domain("ndsq-domain", {
  name: "ndsquared.net",
});

// Export the name of the domain
export const domainName = domain.name;
