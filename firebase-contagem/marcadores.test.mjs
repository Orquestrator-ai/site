import {before,after,test} from "node:test";
import {readFileSync} from "node:fs";
import assert from "node:assert/strict";
import {initializeTestEnvironment,assertSucceeds,assertFails} from "@firebase/rules-unit-testing";
import {getDoc,collection,getDocs,doc,setDoc,updateDoc,deleteDoc} from "firebase/firestore";
const chave="a".repeat(43),projeto="demo-contagem-marcador";
let env;
before(async()=>{env=await initializeTestEnvironment({projectId:projeto,firestore:{rules:readFileSync(new URL("./firestore.rules",import.meta.url),"utf8"),host:"127.0.0.1",port:8187}});await env.clearFirestore();});
after(async()=>env.cleanup());
const user=uid=>env.authenticatedContext(uid,{email:uid+"@example.test",auth_time:1700000000,firebase:{sign_in_provider:"google.com"}}).firestore();
function ref(db,uid="operador",segredo=chave){ return doc(db,"admins",uid,"contagemLeituras",segredo); }
test("GET sem login só conhece um marcador válido e o proprietário habilitado, sem expor UID por tentativa aleatória",async()=>{
 const anon=env.unauthenticatedContext().firestore(),admin=user("operador"),outro=user("outro");
 await env.withSecurityRulesDisabled(async c=>{await setDoc(doc(c.firestore(),"admins","operador"),{enabled:true});await setDoc(doc(c.firestore(),"admins","outro"),{enabled:true});});
 await assertFails(getDoc(ref(anon))); await assertFails(getDoc(ref(anon,"inexistente")));
 await assertFails(setDoc(ref(outro),{v:1}));
 await assertFails(setDoc(ref(anon),{v:1}));await assertFails(setDoc(ref(admin),{v:1,uid:"qualquer"}));
 await assertFails(setDoc(ref(admin,"operador","curta"),{v:1})); await assertSucceeds(setDoc(ref(admin),{v:1}));
 const r=await assertSucceeds(getDoc(ref(anon)));assert.deepEqual(r.data(),{v:1});
 await assertFails(getDocs(collection(anon,"admins","operador","contagemLeituras"))); await assertFails(getDocs(collection(admin,"admins","operador","contagemLeituras")));
 await assertFails(getDoc(doc(anon,"admins","operador")));
 await assertFails(updateDoc(ref(admin),{v:2}));await assertFails(deleteDoc(ref(outro)));
 await env.withSecurityRulesDisabled(c=>setDoc(doc(c.firestore(),"admins","operador"),{enabled:false}));
 await assertFails(getDoc(ref(anon)));await assertFails(setDoc(ref(admin,"operador","b".repeat(43)),{v:1}));
 await env.withSecurityRulesDisabled(c=>setDoc(doc(c.firestore(),"admins","operador"),{enabled:true}));
 await assertSucceeds(deleteDoc(ref(admin)));await assertFails(getDoc(ref(anon)));
});

test("API real de marcadores confirma o REST do emulador, repetição após perda de resposta e revogação",async()=>{
 const {fonteDosMarcadores}=await import("../../backend/contagem/servidor/marcador-firebase.mjs");
 const {createMockUserToken}=await import("@firebase/util");
 const db=env.authenticatedContext("operador-rest",{email:"a@example.test",auth_time:1700000000,firebase:{sign_in_provider:"google.com"}}).firestore();
 await env.withSecurityRulesDisabled(c=>setDoc(doc(c.firestore(),"admins","operador-rest"),{enabled:true}));
 const uid="operador-rest", marcador="r".repeat(43), exp=Math.floor(Date.now()/1000);
 const token=createMockUserToken({sub:uid,email:"a@example.test",iat:exp,exp:exp+3600,auth_time:exp,firebase:{sign_in_provider:"google.com"}},projeto);
 const fonte=fonteDosMarcadores({requisitar:(url,opts)=>{
   const local=url.replace("https://firestore.googleapis.com/v1/projects/orquestrator-61836","http://127.0.0.1:8187/v1/projects/"+projeto);
   return fetch(local,opts);
 }});
 assert.equal(await fonte.criar(uid,marcador,token),200);
 assert.equal(await fonte.conferir(uid,marcador),200);
 assert.equal(await fonte.criar(uid,marcador,token),200);
 await env.withSecurityRulesDisabled(c=>setDoc(doc(c.firestore(),"admins",uid),{enabled:false}));
 assert.equal(await fonte.conferir(uid,marcador),403);
});
