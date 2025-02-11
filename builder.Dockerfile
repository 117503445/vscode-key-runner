FROM node:23.7.0
# FROM registry.cn-hangzhou.aliyuncs.com/117503445-mirror/sync:linux.amd64.docker.io.library.node.23.7.0

# RUN npm config set registry https://registry.npmmirror.com/
RUN npm install -g pnpm vsce
# RUN pnpm config set registry https://registry.npmmirror.com/

WORKDIR /workspace

ENTRYPOINT [ "/workspace/scripts/build-in-docker.sh" ]