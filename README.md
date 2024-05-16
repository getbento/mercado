#MLS Git and Push
```
Version 1.4
Map changes from February 2020
```
Push to bitbucket

Push to GitHub for bento:

  * master for live
  * staging branch for staging (http://littlespain-staging.getbento.com/)


To develop:

developers.getbento.com

(pip install bentodev for new install)

If session expired, remove `bentodev/venv/lib/python3.7/site-packages/bentodev/config/base_config.json`

## Installing Dependencies

```bash
# change into the source directory
cd _sensei_src/
```

```bash
# use the correct node version
nvm use
```

Check if bower is installed. If not:

```bash
# install bower
npm install bower -g
```

```bash
# install dependencies
bower install
npm install
```
## Developing Locally

In order to view changes locally, the theme configurations must be rebuilt. Check the [Developing With Themes](https://getbentobox.atlassian.net/wiki/spaces/E/pages/338886657/Developing+with+Themes) guide for more information.

then navigate to:
``` bash
https://littlespain.localtest.me:8000/
```

