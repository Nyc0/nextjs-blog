---
title: 'Slight-side-step'
date: '2023-04-04'
---

Since 2011, I have the domain name grymonprez.com. My previous blog which hadn't been updated since 2016 was using it. I decided to check what it would take to re-use it. 

Page custom domains
    https://da-sha1.me/configuration/2019/03/03/redirect-custom-domain-to-github-pages.html
    Pros:
    Cons:

Custom OVH action
    https://github.com/pitscher/ovh-deploy-hosting-action 
    After looking into entrypoint.sh I understood that it was not doing what I wanted. How that gave me an simple example on how a action template can work.

Custom FTP action to upload the generatic static website to a remote server
    https://github.com/marketplace/actions/ftp-deploy

    DNS and Multisite configuration
    https://docs.ovh.com/gb/en/hosting/multisites-configuring-multiple-websites/#step-1-access-multisite-management 

    CSS issues
        New .yml file
                https://docs.github.com/en/actions/using-workflows/reusing-workflows & secret scope
                TODO: FTPS doesn't seem to work with OVH hosting

        Next.config.js configuration changes
            const isFTPVersion = process.env.ftpVersion || false

            if (isGithubActions && !isFTPVersion) {
            // trim off `<owner>/`
            const repo = process.env.GITHUB_REPOSITORY.replace(/.*?\//, '')

            assetPrefix = `/${repo}/`
            basePath = `/${repo}`
            }
