import * as pulumi from "@pulumi/pulumi";
import * as digitalocean from "@pulumi/digitalocean";

const domain = new digitalocean.Domain("ndsq-domain", {
  name: "ndsquared.net",
});

const cluster = new digitalocean.KubernetesCluster("ndsq-cluster", {
  name: "ndsquared-prod-sf03",
  autoUpgrade: true,
  region: digitalocean.Region.SFO3,
  version: digitalocean.getKubernetesVersions().then((p) => p.latestVersion),
  nodePool: {
    name: "default",
    size: digitalocean.DropletSlug.DropletS1VCPU1GB,
    nodeCount: 3,
  },
  tags: ["ndsquared"],
});
