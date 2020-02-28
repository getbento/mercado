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

```
cd bentbdev
python3 -m venv venv
source venv/bin/activate
bentodev start littlespain
```

If session expired, remove `bentodev/venv/lib/python3.7/site-packages/bentodev/config/base_config.json`
