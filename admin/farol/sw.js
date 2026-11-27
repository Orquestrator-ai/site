const destino = new URL("/admin/farol/",self.location.origin).href;
self.addEventListener("install",event=>event.waitUntil(self.skipWaiting()));
self.addEventListener("activate",event=>event.waitUntil(self.clients.claim()));
self.addEventListener("push",event=>{
  let dado={};
  try {dado=event.data?.json() || {};} catch {}
  const titulo=typeof dado.titulo==="string"?dado.titulo.slice(0,120):"Farol";
  const corpo=typeof dado.corpo==="string"?dado.corpo.slice(0,320):"Consulte o estado dos sites Orquestrator.";
  const id=typeof dado.id==="string"?dado.id.slice(0,150):undefined;
  event.waitUntil((async()=>{
    await self.registration.showNotification(titulo,{body:corpo,icon:"./icone-192.png",tag:id});
    if(dado.tipo==="teste"){
      if(typeof dado.recibo==="string" && dado.recibo.length>0 && dado.recibo.length<4096){
        try { await fetch("https://orquestrator-contagem.netlify.app/api/farol/avisos/recebido",{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({recibo:dado.recibo}),credentials:"omit",referrerPolicy:"no-referrer",cache:"no-store",redirect:"error"}); } catch {}
      }
      const janelas=await self.clients.matchAll({type:"window",includeUncontrolled:true});
      for(const janela of janelas)if(janela.url.startsWith(destino))janela.postMessage({tipo:"farol-teste-exibido"});
    }
  })());
});
self.addEventListener("notificationclick",event=>{
  event.notification.close();
  event.waitUntil((async()=>{
    const janelas=await self.clients.matchAll({type:"window",includeUncontrolled:true});
    const existente=janelas.find(j=>j.url.split(/[?#]/,1)[0]===destino);
    if(existente){await existente.focus();return;}
    await self.clients.openWindow(destino);
  })());
});
