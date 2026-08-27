
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/ibrahim-portfolio/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/ibrahim-portfolio"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 8244, hash: '160fcb5198f79ef372a9079e2bc08fc7c458db1b764f67f91c245fff304ecb46', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 972, hash: 'bdfe24181bba2a41850e18adc80b06d326d30378cd748bbaa19040d503055bdc', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 93632, hash: '66fdbf80fd57dfc67b0787f8b7a621e04404dce8bf70682f0cae1cf4c8b7b410', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-VQR4ADOH.css': {size: 7702, hash: 'NdohVUenO+Q', text: () => import('./assets-chunks/styles-VQR4ADOH_css.mjs').then(m => m.default)}
  },
};
