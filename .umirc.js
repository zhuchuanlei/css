import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [{ path: '/', component: '@/pages/index' }],
  history: { type: 'hash' },
  hash: true,
  fastRefresh: {},
  // base: '/gm-web/ol-anc/',
  publicPath: './',
});
