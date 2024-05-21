#!/bin/bash
set -euo pipefail

export AWS_PROFILE=opxs-dev

export AWS_REGION=us-east-1
export NEXT_PUBLIC_API_ORIGIN=https://opxs-dev.omnius-labs.com
export NEXT_PUBLIC_GOOGLE_OAUTH2_CLIENT_ID='220874586151-ui4d5vkvbngtm0fjqu719o28ef5j3p23.apps.googleusercontent.com'

npm ci
npm run build

aws s3 sync --delete --exact-timestamps --region us-east-1 ./out "s3://opxs.v1.dev.web"
aws cloudfront create-invalidation --region us-east-1 --distribution-id "E6K0SSVZT5NIC" --paths "/*"
