# DigitalOcean Infrastructure As Code

This repo manages the following [DigitalOcean](https://www.digitalocean.com/) resources:

- Kubernetes cluster with 3 nodes
- `ndsquared.net` domain
- CDN (includes cert and bucket)
- Bucket for Terraform state

[Pulumi](https://www.pulumi.com/) is used to create and manage the DigitalOcean resources.

[Helm](https://helm.sh/) is used to deploy the following packages:

- [Cert Manager](https://cert-manager.io/docs/)
  - Obtain, renew, and use SSL certificates
- [External DNS](https://github.com/kubernetes-sigs/external-dns)
  - Control DNS records dynamically
- [External Secrets](https://external-secrets.io)
  - Integrate with secret management systems
- [Metrics Server](https://github.com/kubernetes-sigs/metrics-server)
  - Collect resource metrics from Kubelets and expose them in the Kubernetes api server
- [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/)
  - Reverse proxy/load balancer

## Local development

The following environment variables need to be set to run pulumi/helm commands:

```
export DIGITALOCEAN_TOKEN=*************
export PULUMI_ACCESS_TOKEN=*************
export SPACES_ACCESS_KEY_ID=*************
export SPACES_SECRET_ACCESS_KEY=*************
```

Bootstrap and pulumi commands:

```
❯ make

help                           View help information
asdf-bootstrap                 Install all tools through asdf-vm
npm-bootstrap                  Install npm packages
preview                        Preview pulumi changes
up                             Deploy pulumi changes
deps                           Update helm dependencies
```

Apply Cert Manager CRDs:

```
kubectl apply -f https://github.com/jetstack/cert-manager/releases/download/v1.6.1/cert-manager.crds.yaml
```

Install helm packages:

```
helm upgrade core helm/core/ --install --namespace core --create-namespace --set external-dns.digitalocean.apiToken=$DIGITALOCEAN_TOKEN
```
