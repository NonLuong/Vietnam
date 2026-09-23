const isLocalDevelopment = location.hostname === 'localhost' || location.hostname === '127.0.0.1'

if ('serviceWorker' in navigator && isLocalDevelopment) {
  window.addEventListener('load', () => {
    void Promise.all([
      navigator.serviceWorker.getRegistrations().then(registrations => Promise.all(registrations.map(registration => registration.unregister()))),
      'caches' in window ? caches.keys().then(keys => Promise.all(keys.map(key => caches.delete(key)))) : Promise.resolve([])
    ]).then(() => {
      if (navigator.serviceWorker.controller) window.location.reload()
    }).catch(() => undefined)
  }, {once:true})
} else if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    void navigator.serviceWorker.register('/sw.js').then(registration=>{
      registration.addEventListener('updatefound',()=>{
        const worker=registration.installing
        worker?.addEventListener('statechange',()=>{
          if(worker.state!=='installed'||!navigator.serviceWorker.controller||document.querySelector('.app-update-banner'))return
          const banner=document.createElement('div')
          banner.className='app-update-banner'
          banner.setAttribute('role','status')
          banner.innerHTML='<span>มีเวอร์ชันใหม่พร้อมใช้งาน</span><button type="button">อัปเดตตอนนี้</button>'
          banner.querySelector('button')?.addEventListener('click',()=>window.location.reload())
          document.body.append(banner)
        })
      })
    }).catch(() => undefined)
  }, {once:true})
}
