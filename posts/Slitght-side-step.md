---
title: 'Slight-side-step'
date: '2023-04-04'
---

Since 2011, I have the domain name grymonprez.com. My previous blog which hadn't been updated since 2016 was using it. I decided to check what it would take to re-use [nicolas.grymonprez.com](nicolas.grymonprez.com).

This can be achieved in a few way, you can point you domain, subdomain to the GitHub Page and update the GitHub Page custom domain settings. This really handy post allowed me to do that: [Redirect custom domain to github pages](https://da-sha1.me/configuration/2019/03/03/redirect-custom-domain-to-github-pages.html).
However this was coming with a con that would not allow me to use another domain for another project. I am not sure if i would need it for any future projects but that's not something I wanted to trade of. Since my domain name comes with a hosting space, ftp and database I decided to use that.

My hosting provider is OVH and I quickly found
[OVH deploy hosting action](https://github.com/pitscher/ovh-deploy-hosting-action). However, after looking into [entrypoint.sh](https://github.com/Nyc0/ovh-deploy-hosting-action/blob/master/entrypoint.sh) I understood that it was not doing what I wanted. It's not actually deploying the static website. I could have looked at creating and action and updating it but I looked for a FTP action instead. I will keep this as an simple example on how an action template can work.

Custom [FTP action](https://github.com/marketplace/actions/ftp-deploy) to upload the generatic static website to a remote server was easy to set up. I am still trying to figure out an issue with ftps.
Since my hosting was set up against my WordPress website, I had to configure the URL to point to a different directory within the www directory. I used [Multisites configuration](https://docs.ovh.com/gb/en/hosting/multisites-configuring-multiple-websites/#step-1-access-multisite-management) wiki page to achieve it.

Once set up I had CSS issues. The CSS wasn't loading as the HTML was looking for the code withing my GitHub repo name. Since I was initially deploying the website to GitHub pages I had to update the assetPrefix and basePath when the build process was ran by a GitHub action. 

```
const isGithubActions = process.env.GITHUB_ACTIONS || false

if (isGithubActions) {
```

Removing the variable and if statement would solve the issue. However I wanted to keep the GitHub Page, maybe as a disaster recovery option 😅.

Here is my updated code with a new variable and an updated logical condition. 

```
const isFTPVersion = const isFTPVersion = process.env.ftpVersion || false

if (isGithubActions && !isFTPVersion) {
```

process.env.ftpVersion has to be added a [ftp-blog.yml](https://github.com/Nyc0/nextjs-blog/blob/main/.github/workflows/ftp-blog.yml) and since I wanted to keep deploying to GitHub pages, I created another Build and Deploy workflow to FTP the newly build website that isn't definying assetPrefix and basePath.

A push to the main branch starts [build-and-deploy-blog.yml](https://github.com/Nyc0/nextjs-blog/blob/main/.github/workflows/build-and-deploy-blog.yml), which then use workflow [ftp-blog.yml](https://github.com/Nyc0/nextjs-blog/blob/main/.github/workflows/ftp-blog.yml). The hiccup I encountered was related to the unavailability of the repository secrets. This was fixed after reading the following help page: [reusing workflows](https://docs.github.com/en/actions/using-workflows/reusing-workflows). The secret either have to be inherited or passed to the reused workflow, I have decided to explicitly pass it.
