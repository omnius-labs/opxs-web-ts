#!/bin/bash
set -euo pipefail

export AWS_PROFILE=opxs-dev

export AWS_REGION=us-east-1
export NEXT_PUBLIC_API_ORIGIN=https://opxs-dev.omnius-labs.com
export NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID='543239851072-5c1b1veprgf96h7nfp2g16614p0luqu0.apps.googleusercontent.com'

yarn install --immutable --immutable-cache --check-cache
yarn build

aws s3 sync --delete --exact-timestamps --region us-east-1 ./out "s3://opxs.v1.dev.web"
aws cloudfront create-invalidation --region us-east-1 --distribution-id "E6K0SSVZT5NIC" --paths "/*"
