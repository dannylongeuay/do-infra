import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const domain = new digitalocean.Domain("ndsq-domain", {
  name: "ndsquared.net",
});

const www = new digitalocean.DnsRecord("www", {
  domain: domain.name,
  type: "CNAME",
  value: "@",
  name: "www",
});

const cluster = new digitalocean.KubernetesCluster("ndsq-cluster", {
  name: "ndsquared-prod-sf03",
  autoUpgrade: true,
  region: digitalocean.Region.SFO3,
  version: digitalocean.getKubernetesVersions().then((p) => p.latestVersion),
  nodePool: {
    name: "default",
    size: digitalocean.DropletSlug.DropletS1VCPU2GB,
    nodeCount: 3,
  },
  tags: ["ndsquared"],
});

const contentBucket = new digitalocean.SpacesBucket("ndsq-content", {
  region: digitalocean.Region.SFO3,
  name: "ndsq-content",
  acl: "public-read",
});

const contentCert = new digitalocean.Certificate("ndsq-content-cert", {
  type: "lets_encrypt",
  domains: ["static.ndsquared.net"],
});

const contentCdn = new digitalocean.Cdn("ndsq-content-cdn", {
  origin: contentBucket.bucketDomainName,
  customDomain: "static.ndsquared.net",
  certificateName: contentCert.name,
});
