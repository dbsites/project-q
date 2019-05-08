# 1. Removes image from local environment
# 2. Rebuilds image with updated package.json

echo -e "\033[1;33m'CTRL + Z' to kill this script\033[0m"

echo -e "\033[1;36mRemoving existing image from local environment...\033[0m"
docker image rm dbsites/ethiq-dependencies --force
echo -e "\033[1;36mRebuilding image with updated package.json...\033[0m"
docker build -t dbsites/ethiq-dependencies -f Dockerfile-dev .
echo -e "\033[1;32mDone!\033[0m"
echo -e "\033[1;33mREMINDER: 'docker push dbsites/ethiq-dependencies' once you're satisfied with the new dependencies. This will push your image to DockerCloud for everyone else to use.\033[0m"
