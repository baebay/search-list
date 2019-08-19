module.exports = {
  apps: [{
    name: 'seabay-cart',
    script: './server/server.js',
  }],
  deploy: {
    production: {
      user: 'ross',
      host: '134.209.69.8',
      key: '~/.ssh/rosscalimlim.me',
      ref: 'origin/master',
      repo: 'git@github.com:seabay-hratx42-fec/shopping-cart.git',
      path: '/home/ross/server/shopping-cart',
      'post-deploy': 'npm install && npx webpack --config ./webpack.config.js && pm2 startOrRestart ecosystem.config.js',
    },
  },
};