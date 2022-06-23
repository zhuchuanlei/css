dev(){
    npm config set sass_binary_site http://npm.taobao.org/mirrors/node-sass -g
    npm config delete registry -g
    npm config delete registry
    npm install
    npm run start
}

  dev