# 1. Enter docker container in bash and run npm install to update package.json
# 2. Removes image from local environment
# 3. Rebuilds image with updated package.json

echo -e "\033[1;33m'CTRL + Z' to kill this script\033[0m"
# If first argument is dev and second argument is not empty
if [ $1 = "dev" ] && [ ! -z $2 ]; then
  DEV=true
  # Grab all arguments after dev and assign to variable
  PACKAGE=${@:2}
# If first argument is not empty
elif [ ! -z $1 ]; then
  DEV=false
  # Grab all arguments and assign to variable
  PACKAGE=$@
else
  echo -e "\033[00;31mMake sure to format the command properly:\033[0m"
  echo "- Dev dependency(ies): 'npm run add-dep dev <PACKAGE1> <PACKAGE2> ...'."
  echo "- Regular dependency(ies): 'npm run add-dep <PACKAGE1> <PACKAGE2> ...'"
  exit 1
fi

# Enter into the Docker container in bash and run npm install --save/dev
if [ $DEV = true ]; then
  echo -e "\033[1;36mInstalling '$PACKAGE' in docker container as dev dependency(ies)...\033[0m"
  docker-compose run --rm --service-ports bash npm install --save-dev $PACKAGE || { echo -e "\033[00;31mnpm install failed\033[0m" ; exit 1; }
else
  echo -e "\033[1;36mInstalling '$PACKAGE' in docker container as dependency(ies)...\033[0m"
  docker-compose run --rm --service-ports bash npm install --save $PACKAGE || { echo -e "\033[00;31mnpm install failed\033[0m" ; exit 1; }
fi

echo -e "\033[1;32mpackage.json has been updated\033[0m"
echo -e "\033[1;36mRemoving existing image from local environment...\033[0m"
docker image rm dbsites/ethiq-dependencies --force
echo -e "\033[1;36mRebuilding image with updated package.json...\033[0m"
docker build -t dbsites/ethiq-dependencies -f Dockerfile-dev .
echo -e "\033[1;32mDone!\033[0m"
echo -e "\033[1;33mREMINDER: 'docker push dbsites/ethiq-dependencies' once you're satisfied with the new dependencies. This will push your image to DockerCloud for everyone else to use.\033[0m"
