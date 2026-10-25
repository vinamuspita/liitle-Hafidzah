/* Little Hafizah service worker: app works offline; recitation audio is cached after it is played once */
const VERSION='lh-v1';
const SHELL=['./','index.html','style.css','data.js','core.js','app.js','manifest.webmanifest','icons/icon-192.png','icons/apple-touch-icon.png'];
self.addEventListener('install',e=>e.waitUntil(caches.open(VERSION).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==VERSION&&k!=='lh-audio').map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);
 if(u.hostname.includes('everyayah.com')||/\.(mp3|m4a)$/.test(u.pathname)){e.respondWith(caches.open('lh-audio').then(c=>c.match(r).then(hit=>hit||fetch(r).then(res=>{if(res.ok||res.type==='opaque')c.put(r,res.clone());return res}))));return}
 if(u.origin===location.origin&&!u.pathname.includes('/data/quran/')){e.respondWith(fetch(r).then(res=>{const c=res.clone();caches.open(VERSION).then(x=>x.put(r,c));return res}).catch(()=>caches.match(r)));return}
 if(u.hostname.includes('fonts.')){e.respondWith(caches.match(r).then(hit=>hit||fetch(r).then(res=>{const c=res.clone();caches.open(VERSION).then(x=>x.put(r,c));return res})))}});
