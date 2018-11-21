  # Set EB BUCKET as env variable
  EB_BUCKET=elasticbeanstalk-us-west-2-295078398723
  aws configure set default.region us-west-2
  eval $(aws ecr get-login --no-include-email --region us-west-2)
  docker --version
  # Build docker image based on dockerfile-prod
  # NO SPACES between scopes e.g. scopes-1,scopes-2,scopes-3
  docker build -t dbsites/ethiq -f Dockerfile-prod --build-arg DATABASE_MIGRATIONS=0 --build-arg DATABASE_SCOPES= .
  # Push built image to ECS
  docker tag dbsites/ethiq:latest 295078398723.dkr.ecr.us-west-2.amazonaws.com/ethiq:$TRAVIS_COMMIT
  docker push 295078398723.dkr.ecr.us-west-2.amazonaws.com/ethiq:$TRAVIS_COMMIT
  # Replace the <VERSION> in Dockerrun file with travis SHA
  sed -i='' "s/<VERSION>/$TRAVIS_COMMIT/" Dockerrun.aws.json
  # Zip modified Dockerrun with any ebextensions
  zip -r ethiq-prod-deploy.zip Dockerrun.aws.json .ebextensions
  # Upload zip file to s3 bucket
  aws s3 cp ethiq-prod-deploy.zip s3://$EB_BUCKET/ethiq-prod-deploy.zip
  # Create a new application version with new Dockerrun
  aws elasticbeanstalk create-application-version --application-name ethiq --version-label $TRAVIS_COMMIT --source-bundle S3Bucket=$EB_BUCKET,S3Key=ethiq-prod-deploy.zip
  # Update environment to use new version number
  aws elasticbeanstalk update-environment --environment-name ethiq-prod --version-label $TRAVIS_COMMIT