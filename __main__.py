"""A DigitalOcean Python Pulumi program"""

import pulumi
import pulumi_digitalocean as do

domain = do.Domain('ndsquared', name='ndsquared.net')

pulumi.export('domain_name', domain.name)
