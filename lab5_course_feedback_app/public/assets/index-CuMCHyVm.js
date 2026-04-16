const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/three.module-DAop_Gea.js","assets/chunk-CnxtX0uT.js","assets/OrbitControls-4cVIXzAE.js"])))=>i.map(i=>d[i]);
import{n as e,t}from"./chunk-CnxtX0uT.js";(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var n,r,i=e((()=>{n=class{constructor(){this.groups=this.getInitialData()}getInitialData(){return[{id:1,src:`https://cdn-icons-png.flaticon.com/512/1995/1995571.png`,groupName:`IU5-31B`,specialty:`Веб-разработка`,description:`Помощь с дз по веб-разработке. Консультации по HTML, CSS, JavaScript`,services:[`Веб-разработка`,`HTML/CSS`,`JavaScript`],price:1500,format:`Онлайн`,rating:4.9,students:24,teacher:`Анна Иванова`,contact:`@iu5_31b_help`,experience:`3 года`,startDate:`2026-04-15`},{id:2,src:`https://cdn-icons-png.flaticon.com/512/5968/5968292.png`,groupName:`IU5-42B`,specialty:`JavaScript`,description:`Помощь с задачами по JavaScript. Объяснение сложных тем, разбор домашних заданий`,services:[`JavaScript`,`React`,`Node.js`],price:1200,format:`Онлайн`,rating:4.8,students:18,teacher:`Дмитрий Петров`,contact:`@iu5_42b_js`,experience:`2 года`,startDate:`2026-04-20`},{id:3,src:`https://cdn-icons-png.flaticon.com/512/919/919825.png`,groupName:`IU5-53B`,specialty:`Node.js`,description:`Бэкенд разработка на Node.js. Помощь с курсовыми проектами и API`,services:[`Node.js`,`Express`,`MongoDB`],price:1800,format:`Офлайн`,rating:4.7,students:12,teacher:`Сергей Козлов`,contact:`@iu5_53b_backend`,experience:`2.5 года`,startDate:`2026-05-01`},{id:4,src:`https://cdn-icons-png.flaticon.com/512/1260/1260667.png`,groupName:`IU5-64B`,specialty:`React`,description:`Современная React разработка. Помощь с проектами и объяснение хуков`,services:[`React`,`Redux`,`Next.js`],price:2e3,format:`Онлайн`,rating:5,students:20,teacher:`Елена Смирнова`,contact:`@iu5_64b_react`,experience:`3 года`,startDate:`2026-04-10`},{id:5,src:`https://cdn-icons-png.flaticon.com/512/5968/5968705.png`,groupName:`IU5-75B`,specialty:`Python`,description:`Python для анализа данных. Помощь с задачами по pandas, numpy`,services:[`Python`,`Pandas`,`NumPy`],price:1300,format:`Онлайн`,rating:4.6,students:15,teacher:`Михаил Воронов`,contact:`@iu5_75b_python`,experience:`2 года`,startDate:`2026-04-25`}]}getGroups(){return this.groups}addGroup(e){this.groups.push(e)}deleteGroup(e){this.groups=this.groups.filter(t=>t.id!==e)}merge(...e){let t={};for(let n of e)if(n&&typeof n==`object`)for(let e in n)e in t||(t[e]=n[e]);return t}isEqual(e,t){if(typeof e!=typeof t)return!1;if(e===null||t===null||e===void 0||t===void 0)return e===t;if(Array.isArray(e)&&Array.isArray(t)){if(e.length!==t.length)return!1;for(let n=0;n<e.length;n++)if(!this.isEqual(e[n],t[n]))return!1;return!0}if(Array.isArray(e)||Array.isArray(t))return!1;if(typeof e==`object`&&typeof t==`object`){let n=Object.keys(e),r=Object.keys(t);if(n.length!==r.length)return!1;for(let r of n)if(!this.isEqual(e[r],t[r]))return!1;return!0}return e===t}isPalindrome(e){if(!e||typeof e!=`string`)return!1;let t=e.toLowerCase().replace(/[^а-яa-z0-9]/g,``);return t===t.split(``).reverse().join(``)}},r=new n})),a,o=e((()=>{i(),a=class{constructor(e){this.parent=e}getStars(e){let t=``,n=Math.floor(e);for(let e=1;e<=5;e++)t+=e<=n?`⭐`:`☆`;return t}getHTML(e){let t=this.getStars(e.rating),n=r.isPalindrome(e.groupName)?`<span class="badge bg-success ms-2">🔁 Палиндром</span>`:`<span class="badge bg-secondary ms-2">❌ Не палиндром</span>`,i=e.services.map(e=>`<span class="service-tag">${e}</span>`).join(``);return`
            <div class="col-md-4 mb-4" data-group-id="${e.id}">
                <div class="card group-card h-100">
                    <div class="card-body">
                        <div class="d-flex align-items-center mb-3">
                            <img src="${e.src}" width="50" height="50" alt="${e.groupName}">
                            <div class="ms-3">
                                <h5 class="card-title mb-0">
                                    ${e.groupName}
                                    ${n}
                                </h5>
                                <small class="text-muted">${e.specialty}</small>
                            </div>
                        </div>
                        <p class="card-text">${e.description}</p>
                        <div class="services-tags mb-2">
                            ${i}
                        </div>
                        <div class="rating mb-2">
                            ${t}
                            <small class="text-muted ms-2">${e.rating}/5</small>
                        </div>
                        <div class="d-flex justify-content-between align-items-center">
                            <div>
                                <span class="price">${e.price} ₽/час</span>
                                <small class="text-muted d-block">👥 ${e.students} студентов</small>
                            </div>
                            <div class="card-actions">
                                <button class="btn btn-primary btn-sm view-btn" data-id="${e.id}">
                                    Подробнее
                                </button>
                                <button class="btn btn-warning btn-sm edit-btn" data-id="${e.id}">
                                    Редактировать
                                </button>
                                <button class="btn btn-danger btn-sm delete-btn" data-id="${e.id}">
                                    Удалить
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}addListeners(e,t,n,r){let i=document.querySelector(`.view-btn[data-id="${e.id}"]`),a=document.querySelector(`.delete-btn[data-id="${e.id}"]`),o=document.querySelector(`.edit-btn[data-id="${e.id}"]`);document.querySelector(`.compare-toggle-btn[data-id="${e.id}"]`),i&&i.addEventListener(`click`,()=>t(e.id)),a&&a.addEventListener(`click`,()=>n(e.id)),o&&o.addEventListener(`click`,()=>r(e.id))}render(e,t,n,r){let i=this.getHTML(e,!0);this.parent.insertAdjacentHTML(`beforeend`,i),this.addListeners(e,t,n,r)}}})),s,c=e((()=>{i(),s=class{constructor(e){this.parent=e}getStars(e){let t=``,n=Math.floor(e);for(let e=1;e<=5;e++)t+=e<=n?`⭐`:`☆`;return t}formatDate(e){return new Date(e).toLocaleDateString(`ru-RU`,{day:`numeric`,month:`long`,year:`numeric`})}getHTML(e){let t=this.getStars(e.rating),n=r.isPalindrome(e.groupName),i=this.formatDate(e.startDate),a=n?`<span class="badge bg-success">🔁 Название-палиндром</span>`:`<span class="badge bg-secondary">❌ Не палиндром</span>`,o=e.services.map(e=>`<li><strong>${e}</strong> - помощь с лабораторными и проектами</li>`).join(``);return`
                <div class="card group-detail-card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="d-flex align-items-center mb-4">
                                    <img src="${e.src}" width="80" height="80" alt="${e.groupName}">
                                    <div class="ms-3">
                                        <h2 class="mb-2">${e.groupName}</h2>
                                        <p class="mb-1"><strong>${e.specialty}</strong></p>
                                        ${a}
                                    </div>
                                </div>

                                <div class="row mt-4">
                                    <div class="col-md-6">
                                        <h5>📋 Информация о группе</h5>
                                        <table class="table table-borderless">
                                            <tr>
                                                <td><strong>Описание услуг:</strong></td>
                                                <td>${e.description}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Услуги:</strong></td>
                                                <td><ul class="mb-0">${o}</ul></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Стоимость:</strong></td>
                                                <td class="price">${e.price} ₽/час</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Формат:</strong></td>
                                                <td>${e.format}</td>
                                            </tr>
                                        </table>
                                    </div>
                                    <div class="col-md-6">
                                        <h5>⭐ Рейтинг и контакты</h5>
                                        <table class="table table-borderless">
                                            <tr>
                                                <td><strong>Рейтинг:</strong></td>
                                                <td>${t} (${e.rating}/5)</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Студентов в группе:</strong></td>
                                                <td>${e.students}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Контакты:</strong></td>
                                                <td><code>${e.contact}</code></td>
                                            </tr>
                                            <tr>
                                                <td><strong>Преподаватель-куратор:</strong></td>
                                                <td>${e.teacher}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Опыт помощи:</strong></td>
                                                <td>${e.experience}</td>
                                            </tr>
                                            <tr>
                                                <td><strong>Начало сотрудничества:</strong></td>
                                                <td>${i}</td>
                                            </tr>
                                        </table>
                                    </div>
                                </div>

                                <div class="alert alert-info mt-3">
                                    <strong>Как связаться:</strong> Напишите в Telegram: ${e.contact} для получения консультации!
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `}render(e){this.parent.innerHTML=``;let t=this.getHTML(e);this.parent.insertAdjacentHTML(`beforeend`,t)}}})),l,u,d,f,p=e((()=>{l=`modulepreload`,u=function(e){return`/`+e},d={},f=function(e,t,n){let r=Promise.resolve();if(t&&t.length>0){let e=document.getElementsByTagName(`link`),i=document.querySelector(`meta[property=csp-nonce]`),a=i?.nonce||i?.getAttribute(`nonce`);function o(e){return Promise.all(e.map(e=>Promise.resolve(e).then(e=>({status:`fulfilled`,value:e}),e=>({status:`rejected`,reason:e}))))}r=o(t.map(t=>{if(t=u(t,n),t in d)return;d[t]=!0;let r=t.endsWith(`.css`),i=r?`[rel="stylesheet"]`:``;if(n)for(let n=e.length-1;n>=0;n--){let i=e[n];if(i.href===t&&(!r||i.rel===`stylesheet`))return}else if(document.querySelector(`link[href="${t}"]${i}`))return;let o=document.createElement(`link`);if(o.rel=r?`stylesheet`:l,r||(o.as=`script`),o.crossOrigin=``,o.href=t,a&&o.setAttribute(`nonce`,a),document.head.appendChild(o),r)return new Promise((e,n)=>{o.addEventListener(`load`,e),o.addEventListener(`error`,()=>n(Error(`Unable to preload CSS for ${t}`)))})}))}function i(e){let t=new Event(`vite:preloadError`,{cancelable:!0});if(t.payload=e,window.dispatchEvent(t),!t.defaultPrevented)throw e}return r.then(t=>{for(let e of t||[])e.status===`rejected`&&i(e.reason);return e().catch(i)})}})),m,h=e((()=>{p(),m=class{constructor(e,t=null,n=null){this.container=e,this.modelUrl=t,this.modelTitle=n||`3D Модель`,this.scene=null,this.camera=null,this.renderer=null,this.model=null,this.controls=null,this.animationId=null}async init(){console.log(`Инициализация 3D модели компьютера...`);let e=await f(()=>import(`./three.module-DAop_Gea.js`),__vite__mapDeps([0,1])),{OrbitControls:t}=await f(async()=>{let{OrbitControls:e}=await import(`./OrbitControls-4cVIXzAE.js`);return{OrbitControls:e}},__vite__mapDeps([2,1,0]));this.THREE=e,this.OrbitControls=t,this.setupScene(),this.setupLights(),this.createComputerModel(),this.animate(),console.log(`3D модель компьютера инициализирована`)}setupScene(){let e=this.container.clientWidth;this.scene=new this.THREE.Scene,this.scene.background=new this.THREE.Color(16119287),this.camera=new this.THREE.PerspectiveCamera(45,e/400,.1,1e3),this.camera.position.set(4,3,5),this.camera.lookAt(0,.5,0),this.renderer=new this.THREE.WebGLRenderer({antialias:!0}),this.renderer.setSize(e,400),this.renderer.setPixelRatio(window.devicePixelRatio),this.renderer.shadowMap.enabled=!0,this.container.innerHTML=``,this.container.appendChild(this.renderer.domElement),this.controls=new this.OrbitControls(this.camera,this.renderer.domElement),this.controls.enableDamping=!0,this.controls.dampingFactor=.05,this.controls.autoRotate=!1,this.controls.enableZoom=!0,this.controls.target.set(0,.8,0);let t=new this.THREE.GridHelper(8,20,8947848,13421772);t.position.y=-.5,this.scene.add(t)}setupLights(){let e=new this.THREE.AmbientLight(16777215,.6);this.scene.add(e);let t=new this.THREE.DirectionalLight(16777215,1);t.position.set(3,5,2),t.castShadow=!0,this.scene.add(t);let n=new this.THREE.PointLight(4482764,.3);n.position.set(0,2,2),this.scene.add(n);let r=new this.THREE.PointLight(16755302,.3);r.position.set(-2,2,-3),this.scene.add(r);let i=new this.THREE.PointLight(4013055,.2);i.position.set(0,-1,0),this.scene.add(i)}createComputerModel(){console.log(`Создание модели компьютера...`);let e=new this.THREE.Group,t=new this.THREE.Mesh(new this.THREE.BoxGeometry(.8,.08,.8),new this.THREE.MeshStandardMaterial({color:3355443,metalness:.7,roughness:.3}));t.position.y=.04,t.castShadow=!0,e.add(t);let n=new this.THREE.Mesh(new this.THREE.BoxGeometry(.15,.3,.15),new this.THREE.MeshStandardMaterial({color:4473924,metalness:.5}));n.position.y=.25,n.castShadow=!0,e.add(n);let r=new this.THREE.Mesh(new this.THREE.BoxGeometry(1.6,1.2,.1),new this.THREE.MeshStandardMaterial({color:2236962,metalness:.3,roughness:.2}));r.position.y=.9,r.castShadow=!0,e.add(r);let i=new this.THREE.Mesh(new this.THREE.BoxGeometry(1.4,.9,.02),new this.THREE.MeshStandardMaterial({color:4013055,emissive:1710730,emissiveIntensity:.5}));i.position.set(0,.9,.06),i.castShadow=!0,e.add(i);let a=new this.THREE.Mesh(new this.THREE.BoxGeometry(1.62,1.22,.02),new this.THREE.MeshStandardMaterial({color:1118481,metalness:.8}));a.position.set(0,.9,.04),e.add(a);let o=new this.THREE.Mesh(new this.THREE.BoxGeometry(.5,1.2,.5),new this.THREE.MeshStandardMaterial({color:3355443,metalness:.6}));o.position.set(-1.2,.6,-.3),o.castShadow=!0,e.add(o);let s=new this.THREE.Mesh(new this.THREE.CylinderGeometry(.08,.08,.02,8),new this.THREE.MeshStandardMaterial({color:65280,emissive:43520,emissiveIntensity:.3}));s.rotation.x=Math.PI/2,s.position.set(-1.2,1.1,-.05),e.add(s);let c=new this.THREE.Mesh(new this.THREE.BoxGeometry(.3,.05,.02),new this.THREE.MeshStandardMaterial({color:8947848}));c.position.set(-1.2,.7,-.05),e.add(c);let l=new this.THREE.Mesh(new this.THREE.BoxGeometry(1,.05,.4),new this.THREE.MeshStandardMaterial({color:4473924,roughness:.4}));l.position.set(0,.15,.8),l.castShadow=!0,e.add(l);let u=new this.THREE.MeshStandardMaterial({color:6710886});for(let t=0;t<3;t++)for(let n=0;n<8;n++){let r=new this.THREE.Mesh(new this.THREE.BoxGeometry(.07,.03,.07),u);r.position.set(-.3+n*.09,.19,.7+t*.1),r.castShadow=!0,e.add(r)}let d=new this.THREE.Mesh(new this.THREE.BoxGeometry(.12,.04,.2),new this.THREE.MeshStandardMaterial({color:5592405}));d.position.set(.9,.13,.9),d.castShadow=!0,e.add(d);let f=new this.THREE.Mesh(new this.THREE.SphereGeometry(.07,16,16),new this.THREE.MeshStandardMaterial({color:6710886}));f.position.set(.9,.19,.9),f.castShadow=!0,e.add(f);let p=new this.THREE.Mesh(new this.THREE.CylinderGeometry(.12,.1,.12,8),new this.THREE.MeshStandardMaterial({color:13468991}));p.position.set(1.2,.1,.5),p.castShadow=!0,e.add(p);let m=new this.THREE.MeshStandardMaterial({color:16777215,transparent:!0,opacity:.5});for(let t=0;t<3;t++){let n=new this.THREE.Mesh(new this.THREE.SphereGeometry(.03,4,4),m);n.position.set(1.18+t*.03,.2+t*.03,.48),e.add(n)}let h=[];for(let t=0;t<30;t++){let t=new this.THREE.Mesh(new this.THREE.SphereGeometry(.03,6,6),new this.THREE.MeshStandardMaterial({color:4013055,emissive:1710730,emissiveIntensity:.3}));t.position.set((Math.random()-.5)*4,Math.random()*2.5,(Math.random()-.5)*3),t.castShadow=!0,e.add(t),h.push(t)}this.particles=h,this.particleTime=0,this.scene.add(e),this.model=e,console.log(`Модель компьютера создана успешно`)}animate(){let e=()=>{this.animationId=requestAnimationFrame(e),this.particles&&(this.particleTime+=.01,this.particles.forEach((e,t)=>{e.position.y+=Math.sin(this.particleTime+t)*.002})),this.controls&&this.controls.update(),this.renderer&&this.scene&&this.camera&&this.renderer.render(this.scene,this.camera)};e()}resize(){if(!this.container||!this.camera||!this.renderer)return;let e=this.container.clientWidth;this.camera.aspect=e/400,this.camera.updateProjectionMatrix(),this.renderer.setSize(e,400)}setView(e){if(!(!this.camera||!this.controls)){switch(e){case`front`:this.camera.position.set(0,.8,4);break;case`left`:this.camera.position.set(-4,.8,0);break;case`right`:this.camera.position.set(4,.8,0);break;default:this.camera.position.set(4,3,5)}this.controls.target.set(0,.8,0),this.controls.update()}}zoomIn(){this.camera&&(this.camera.position.multiplyScalar(.9),this.controls.update())}zoomOut(){this.camera&&(this.camera.position.multiplyScalar(1.1),this.controls.update())}resetView(){this.camera.position.set(4,3,5),this.controls.target.set(0,.8,0),this.controls.update()}dispose(){this.animationId&&cancelAnimationFrame(this.animationId),this.controls&&this.controls.dispose(),this.renderer&&this.renderer.dispose(),this.container&&(this.container.innerHTML=``)}}})),g,_,v=e((()=>{g=class{async get(e){let t=await fetch(e);return{data:await t.json(),status:t.status}}async post(e,t){let n=await fetch(e,{method:`POST`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});return{data:await n.json(),status:n.status}}async patch(e,t){let n=await fetch(e,{method:`PATCH`,headers:{"Content-Type":`application/json`},body:JSON.stringify(t)});return{data:await n.json(),status:n.status}}async delete(e){return{status:(await fetch(e,{method:`DELETE`})).status}}},_=new g})),y,b,x=e((()=>{y=class{constructor(){this.baseUrl=`http://localhost:3005`}getGroups(){return`${this.baseUrl}/api/groups`}getGroupById(e){return`${this.baseUrl}/api/groups/${e}`}createGroup(){return`${this.baseUrl}/api/groups`}updateGroup(e){return`${this.baseUrl}/api/groups/${e}`}deleteGroup(e){return`${this.baseUrl}/api/groups/${e}`}},b=new y})),S,C=e((()=>{c(),h(),D(),v(),x(),S=class{constructor(e,t){this.parent=e,this.id=parseInt(t),this.threeDModel=null,this.groupData=null}get groupContainer(){return document.getElementById(`group-container`)}get modelContainer(){return document.getElementById(`model-container`)}getModelUrl(e){return{"IU5-31B":`https://threejs.org/examples/models/gltf/Horse.glb`,"IU5-42B":`https://threejs.org/examples/models/gltf/Duck.glb`,"IU5-53B":`https://threejs.org/examples/models/gltf/Flamingo.gltf`,"IU5-64B":`https://threejs.org/examples/models/gltf/Parrot.glb`,"IU5-75B":`https://threejs.org/examples/models/gltf/Stork.glb`}[e]||null}getHTML(){return`
            <div class="header">
                <div class="container">
                    <h1>📖 Детали группы</h1>
                    <button id="home-button" class="btn btn-home">Домой</button>
                </div>
            </div>
            <div class="container mt-4">
                <div class="row">
                    <div class="col-md-6">
                        <div class="card">
                            <div class="card-header bg-white">
                                <h5 class="mb-0">3D Превью модели</h5>
                            </div>
                            <div class="card-body p-0">
                                <div id="model-container" style="height: 400px; background: linear-gradient(135deg, #f5f5f7 0%, #e8e8ec 100%); border-radius: 12px;">
                                    <div class="text-center p-5">Загрузка 3D модели...</div>
                                </div>
                            </div>
                            <div class="card-footer bg-white">
                                <div class="d-flex justify-content-between flex-wrap gap-2">
                                    <div class="btn-group">
                                        <button class="btn btn-outline-primary btn-sm" id="view-front">Вид спереди</button>
                                        <button class="btn btn-outline-primary btn-sm" id="view-left">👈 Слева</button>
                                        <button class="btn btn-outline-primary btn-sm" id="view-right">👉 Справа</button>
                                    </div>
                                    <div class="btn-group">
                                        <button class="btn btn-outline-success btn-sm" id="zoom-in">➕ Приблизить</button>
                                        <button class="btn btn-outline-success btn-sm" id="zoom-out">➖ Отдалить</button>
                                        <button class="btn btn-outline-secondary btn-sm" id="reset-view">⟳ Сброс</button>
                                    </div>
                                </div>
                                <div class="text-center mt-2">
                                    <small class="text-muted">🖱️ Мышь - вращение | ПКМ - панорама | Колесико - зум</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div id="group-container">
                            <div class="text-center p-5">
                                <div class="spinner-border text-primary" role="status">
                                    <span class="visually-hidden">Загрузка...</span>
                                </div>
                                <p class="mt-2">Загрузка данных группы...</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- БЛОК СРАВНЕНИЯ -->
                <div class="row mt-4">
                    <div class="col-12">
                        <div class="card">
                            <div class="card-header bg-white">
                                <h5 class="mb-0">🔍 Сравнение с другой группой</h5>
                            </div>
                            <div class="card-body">
                                <div class="row">
                                    <div class="col-md-8">
                                        <select id="compare-group-select" class="form-control">
                                            <option value="">Выберите группу для сравнения...</option>
                                        </select>
                                    </div>
                                    <div class="col-md-4">
                                        <button id="compare-btn" class="btn btn-primary w-100">🔍 Сравнить</button>
                                    </div>
                                </div>
                                <div id="compare-result" class="mt-3" style="display: none;"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row mt-4">
                    <div class="col-12 text-center">
                        <button id="back-button" class="btn btn-secondary btn-lg">← Назад к группам</button>
                    </div>
                </div>
            </div>
        `}async getData(){try{let{data:e,status:t}=await _.get(b.getGroupById(this.id));t===200&&e?(this.groupData=e,this.renderData(),this.init3DModel(),this.setupComparison()):this.showError()}catch(e){console.error(`Ошибка:`,e),this.showError()}}showError(){this.groupContainer&&(this.groupContainer.innerHTML=`
                <div class="alert alert-danger">
                    ❌ Ошибка загрузки данных группы
                </div>
            `)}renderData(){if(console.log(`>>> renderData: НАЧАЛО функции`),console.log(`>>> renderData: this.groupData =`,this.groupData),console.log(`>>> renderData: this.groupContainer =`,this.groupContainer),this.groupData&&this.groupContainer){console.log(`>>> renderData: УСЛОВИЕ ВЫПОЛНЕНО, создаем компонент`);try{let e=new s(this.groupContainer);console.log(`>>> renderData: компонент создан`,e),e.render(this.groupData),console.log(`>>> renderData: render вызван успешно`)}catch(e){console.error(`>>> renderData: ОШИБКА!`,e)}}else console.error(`>>> renderData: УСЛОВИЕ НЕ ВЫПОЛНЕНО`),console.error(`groupData:`,this.groupData),console.error(`groupContainer:`,this.groupContainer);console.log(`>>> renderData: КОНЕЦ функции`)}async init3DModel(){if(this.modelContainer&&this.groupData){let e=this.getModelUrl(this.groupData.groupName);this.threeDModel=new m(this.modelContainer,e,this.groupData.groupName),await this.threeDModel.init(),this.setup3DControls()}}setup3DControls(){for(let[e,t]of Object.entries({"view-front":`front`,"view-left":`left`,"view-right":`right`}))document.getElementById(e)?.addEventListener(`click`,()=>this.threeDModel?.setView(t));document.getElementById(`zoom-in`)?.addEventListener(`click`,()=>this.threeDModel?.zoomIn()),document.getElementById(`zoom-out`)?.addEventListener(`click`,()=>this.threeDModel?.zoomOut()),document.getElementById(`reset-view`)?.addEventListener(`click`,()=>this.threeDModel?.resetView()),window.addEventListener(`resize`,()=>this.threeDModel?.resize())}setupComparison(){let e=document.getElementById(`compare-btn`),t=document.getElementById(`compare-group-select`),n=document.getElementById(`compare-result`);ajax.get(b.getGroups(),(e,n)=>{n===200&&e&&Array.isArray(e)&&(t.innerHTML=`<option value="">Выберите группу для сравнения...</option>`+e.filter(e=>e.id!==this.id).map(e=>`<option value="${e.id}">${e.groupName} (${e.specialty})</option>`).join(``))}),e&&t&&e.addEventListener(`click`,()=>{let e=t.value;if(!e){n.style.display=`block`,n.innerHTML=`<div class="alert alert-warning">⚠️ Выберите группу для сравнения!</div>`;return}ajax.get(b.getGroupById(e),(e,t)=>{if(t===200&&e&&this.groupData){let t=e,r=[];this.groupData.groupName!==t.groupName&&r.push({field:`Название`,current:this.groupData.groupName,compare:t.groupName}),this.groupData.specialty!==t.specialty&&r.push({field:`Специализация`,current:this.groupData.specialty,compare:t.specialty}),this.groupData.price!==t.price&&r.push({field:`Цена (₽/час)`,current:this.groupData.price,compare:t.price}),this.groupData.rating!==t.rating&&r.push({field:`Рейтинг`,current:`${this.groupData.rating}/5`,compare:`${t.rating}/5`}),this.groupData.format!==t.format&&r.push({field:`Формат`,current:this.groupData.format,compare:t.format}),this.groupData.students!==t.students&&r.push({field:`Студентов`,current:this.groupData.students,compare:t.students}),this.groupData.teacher!==t.teacher&&r.push({field:`Преподаватель`,current:this.groupData.teacher,compare:t.teacher});let i=``;i=r.length===0?`
                                <div class="alert alert-success">
                                    <strong>✅ ГРУППЫ ИДЕНТИЧНЫ!</strong><br>
                                    Все характеристики "${this.groupData.groupName}" и "${t.groupName}" совпадают.
                                </div>
                            `:`
                                <div class="alert alert-info">
                                    <strong>❌ НАЙДЕНЫ РАЗЛИЧИЯ:</strong>
                                    <table class="table table-sm mt-2 mb-0">
                                        <thead>
                                            <tr><th>Характеристика</th><th>${this.groupData.groupName}</th><th>${t.groupName}</th></tr>
                                        </thead>
                                        <tbody>
                                            ${r.map(e=>`<tr><td><strong>${e.field}</strong></td><td>${e.current}</td><td>${e.compare}</td></tr>`).join(``)}
                                        </tbody>
                                    </table>
                                </div>
                            `,n.style.display=`block`,n.innerHTML=i,n.scrollIntoView({behavior:`smooth`,block:`start`})}})})}clickBack(){this.threeDModel&&this.threeDModel.dispose(),new E(this.parent).render()}goHome(){this.threeDModel&&this.threeDModel.dispose(),new E(this.parent).render()}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),this.getData(),document.getElementById(`back-button`)?.addEventListener(`click`,()=>this.clickBack()),document.getElementById(`home-button`)?.addEventListener(`click`,()=>this.goHome())}}})),w,T=e((()=>{D(),v(),x(),w=class{constructor(e,t=null){this.parent=e,this.id=t,this.groupData=null}getHTML(){let e=!!this.id;return`
            <div class="header">
                <div class="container">
                    <h1>${e?`✏️ Редактирование группы`:`Добавление новой группы`}</h1>
                    <button id="home-button" class="btn btn-home">Домой</button>
                </div>
            </div>
            <div class="container mt-4">
                <div class="row justify-content-center">
                    <div class="col-md-8">
                        <div class="card">
                            <div class="card-body">
                                <form id="group-form">
                                    <div class="mb-3">
                                        <label for="groupName" class="form-label">Название группы *</label>
                                        <input type="text" class="form-control" id="groupName" required>
                                    </div>

                                    <div class="mb-3">
                                        <label for="specialty" class="form-label">Специальность *</label>
                                        <input type="text" class="form-control" id="specialty" required>
                                    </div>

                                    <div class="mb-3">
                                        <label for="description" class="form-label">Описание</label>
                                        <textarea class="form-control" id="description" rows="3"></textarea>
                                    </div>

                                    <div class="mb-3">
                                        <label for="price" class="form-label">Цена (₽/час) *</label>
                                        <input type="number" class="form-control" id="price" required>
                                    </div>

                                    <div class="mb-3">
                                        <label for="format" class="form-label">Формат *</label>
                                        <select class="form-control" id="format">
                                            <option value="Онлайн">Онлайн</option>
                                            <option value="Офлайн">Офлайн</option>
                                        </select>
                                    </div>

                                    <div class="mb-3">
                                        <label for="rating" class="form-label">Рейтинг</label>
                                        <input type="number" step="0.1" min="0" max="5" class="form-control" id="rating">
                                    </div>

                                    <div class="mb-3">
                                        <label for="students" class="form-label">Количество студентов</label>
                                        <input type="number" class="form-control" id="students">
                                    </div>

                                    <div class="mb-3">
                                        <label for="teacher" class="form-label">Преподаватель</label>
                                        <input type="text" class="form-control" id="teacher">
                                    </div>

                                    <div class="mb-3">
                                        <label for="contact" class="form-label">Контакт (Telegram)</label>
                                        <input type="text" class="form-control" id="contact">
                                    </div>

                                    <div class="mb-3">
                                        <label for="experience" class="form-label">Опыт работы</label>
                                        <input type="text" class="form-control" id="experience">
                                    </div>

                                    <div class="mb-3">
                                        <label for="services" class="form-label">Услуги (через запятую)</label>
                                        <input type="text" class="form-control" id="services" placeholder="Например: JavaScript, React, Node.js">
                                    </div>

                                    <div class="d-flex gap-2">
                                        <button type="submit" class="btn btn-primary flex-grow-1">
                                            ${e?`Сохранить изменения`:`Создать группу`}
                                        </button>
                                        <button type="button" id="cancel-button" class="btn btn-secondary">❌ Отмена</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `}async loadGroupData(){if(this.id)try{let{data:e,status:t}=await _.get(b.getGroupById(this.id));t===200&&e?(this.groupData=e,this.fillForm(e)):this.showNotification(`❌ Ошибка загрузки данных`,`error`)}catch{this.showNotification(`❌ Ошибка соединения`,`error`)}}fillForm(e){document.getElementById(`groupName`).value=e.groupName||``,document.getElementById(`specialty`).value=e.specialty||``,document.getElementById(`description`).value=e.description||``,document.getElementById(`price`).value=e.price||``,document.getElementById(`format`).value=e.format||`Онлайн`,document.getElementById(`rating`).value=e.rating||5,document.getElementById(`students`).value=e.students||0,document.getElementById(`teacher`).value=e.teacher||``,document.getElementById(`contact`).value=e.contact||``,document.getElementById(`experience`).value=e.experience||``,document.getElementById(`services`).value=(e.services||[]).join(`, `)}getFormData(){let e=document.getElementById(`services`).value,t=e?e.split(`,`).map(e=>e.trim()):[];return{groupName:document.getElementById(`groupName`).value,specialty:document.getElementById(`specialty`).value,description:document.getElementById(`description`).value,price:parseInt(document.getElementById(`price`).value)||0,format:document.getElementById(`format`).value,rating:parseFloat(document.getElementById(`rating`).value)||5,students:parseInt(document.getElementById(`students`).value)||0,teacher:document.getElementById(`teacher`).value,contact:document.getElementById(`contact`).value,experience:document.getElementById(`experience`).value,services:t,src:`https://cdn-icons-png.flaticon.com/512/3135/3135715.png`}}validateForm(e){return e.groupName?e.specialty?!e.price||e.price<=0?(this.showNotification(`❌ Введите корректную цену`,`error`),!1):!0:(this.showNotification(`❌ Введите специальность`,`error`),!1):(this.showNotification(`❌ Введите название группы`,`error`),!1)}updateGroup(e){ajax.patch(b.updateGroup(this.id),e,(e,t)=>{t===200?(this.showNotification(`✅ Группа успешно обновлена!`),setTimeout(()=>{new E(this.parent).render()},1500)):this.showNotification(`❌ Ошибка при обновлении группы`,`error`)})}updateGroup(e){ajax.patch(b.getGroupById(this.id),e,(e,t)=>{t===200?(this.showNotification(`✅ Группа успешно обновлена!`),setTimeout(()=>{new E(this.parent).render()},1500)):this.showNotification(`❌ Ошибка при обновлении группы`,`error`)})}async createGroup(e){try{let{data:t,status:n}=await _.post(b.createGroup(),e);n===201||n===200?(this.showNotification(`✅ Группа создана!`),setTimeout(()=>new E(this.parent).render(),1500)):this.showNotification(`❌ Ошибка создания`,`error`)}catch{this.showNotification(`❌ Ошибка соединения`,`error`)}}async updateGroup(e){try{let{data:t,status:n}=await _.patch(b.updateGroup(this.id),e);n===200?(this.showNotification(`✅ Группа обновлена!`),setTimeout(()=>new E(this.parent).render(),1500)):this.showNotification(`❌ Ошибка обновления`,`error`)}catch{this.showNotification(`❌ Ошибка соединения`,`error`)}}showNotification(e,t=`success`){let n=document.createElement(`div`);n.className=`notification-toast`,n.style.cssText=`
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${t===`error`?`#f8d7da`:`#d4edda`};
            color: ${t===`error`?`#721c24`:`#155724`};
            padding: 15px 20px;
            border-radius: 12px;
            z-index: 1000;
            border-left: 4px solid ${t===`error`?`#dc3545`:`#28a745`};
            animation: slideInRight 0.3s ease-out;
        `,n.innerHTML=e,document.body.appendChild(n),setTimeout(()=>n.remove(),3e3)}setupEventListeners(){let e=document.getElementById(`group-form`),t=document.getElementById(`cancel-button`),n=document.getElementById(`home-button`);e.addEventListener(`submit`,e=>{e.preventDefault();let t=this.getFormData();this.validateForm(t)&&(this.id?this.updateGroup(t):this.createGroup(t))}),t?.addEventListener(`click`,()=>{new E(this.parent).render()}),n?.addEventListener(`click`,()=>{new E(this.parent).render()})}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),this.setupEventListeners(),this.id&&this.loadGroupData()}}})),E,D=e((()=>{o(),C(),T(),v(),x(),E=class{constructor(e){this.parent=e,this.filterText=``,this.formatFilter=``,this.allGroups=[]}get groupsContainer(){return document.getElementById(`groups-container`)}showNotification(e,t=!1){let n=document.createElement(`div`);n.className=`notification-toast`,n.style.cssText=`
            position: fixed;
            top: 20px;
            right: 20px;
            background: white;
            padding: 15px 20px;
            border-radius: 12px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 1000;
            max-width: 400px;
            white-space: pre-line;
            font-family: monospace;
            font-size: 14px;
            border-left: 4px solid ${t?`#dc3545`:`#3d3bff`};
            animation: slideInRight 0.3s ease-out;
        `,n.innerHTML=e,document.body.appendChild(n),setTimeout(()=>{n.style.opacity=`0`,n.style.transition=`opacity 0.3s`,setTimeout(()=>n.remove(),300)},4e3)}getHTML(){return`
            <div class="header">
                <div class="container">
                    <h1>👥 Обратная связь по курсу</h1>
                    <div class="header-buttons">
                        <button id="home-button" class="btn btn-home">Домой</button>
                    </div>
                </div>
            </div>
            <div class="container">
                <div class="filters">
                    <div class="row">
                        <div class="col-md-5">
                            <input type="text" id="filter-input" class="filter-input"
                                   placeholder="🔍 Поиск по названию группы..." autocomplete="off">
                        </div>
                        <div class="col-md-4">
                            <select id="format-filter" class="filter-input">
                                ${[{value:``,label:`Все форматы`},{value:`Онлайн`,label:`Онлайн`},{value:`Офлайн`,label:`Офлайн`}].map(e=>`<option value="${e.value}">${e.label}</option>`).join(``)}
                            </select>
                        </div>
                        <div class="col-md-3">
                            <button id="add-button" class="btn btn-success w-100">+ Добавить</button>
                        </div>
                    </div>
                </div>
                <div id="groups-container" class="groups-grid">
                    <div class="text-center p-5">
                        <div class="spinner-border text-primary" role="status">
                            <span class="visually-hidden">Загрузка...</span>
                        </div>
                        <p class="mt-2">Загрузка групп...</p>
                    </div>
                </div>
            </div>
        `}async getData(){try{let{data:e,status:t}=await _.get(b.getGroups());t===200&&e&&Array.isArray(e)?(this.allGroups=e,this.renderGroups()):this.showNotification(`Ошибка загрузки групп!`,!0)}catch(e){console.error(`Ошибка:`,e),this.showNotification(`Ошибка соединения с сервером!`,!0)}}getFilteredGroups(){let e=[...this.allGroups];return this.filterText&&this.filterText.trim()!==``&&(e=e.filter(e=>e.groupName.toLowerCase().includes(this.filterText.toLowerCase()))),this.formatFilter&&this.formatFilter!==``&&(e=e.filter(e=>e.format===this.formatFilter)),e}renderGroups(){let e=this.groupsContainer;if(!e)return;e.innerHTML=``;let t=this.getFilteredGroups();if(t.length===0){e.innerHTML=`
                <div class="col-12 text-center">
                    <div class="alert alert-info">Групп не найдено. Добавьте первую группу!</div>
                </div>
            `;return}t.forEach(t=>{new a(e).render(t,this.clickCard.bind(this),this.deleteGroup.bind(this),this.editGroup.bind(this))})}editGroup(e){new w(this.parent,e).render()}async addGroup(){let e=this.allGroups;if(e.length===0){let e={groupName:`Новая группа`,specialty:`Помощь с учебой`,description:`Помощь с лабораторными работами и домашними заданиями`,services:[`Помощь с лабами`,`Консультации`],price:1e3,format:`Онлайн`,rating:4.5,students:0,teacher:`Новый куратор`,contact:`@new_group`,experience:`1 год`,startDate:new Date().toISOString().split(`T`)[0]};try{let{data:t,status:n}=await _.post(b.createGroup(),e);n===201||n===200?(this.showNotification(`✅ Добавлена группа: "${t.groupName}"`),await this.getData()):this.showNotification(`❌ Ошибка при добавлении группы`,!0)}catch(e){console.error(`Ошибка добавления:`,e),this.showNotification(`❌ Ошибка соединения при добавлении группы`,!0)}return}let t=e[0],n={groupName:`${t.groupName}+копия`,specialty:t.specialty,description:t.description,services:t.services,price:t.price,format:t.format,rating:t.rating,students:t.students,teacher:t.teacher,contact:t.contact,experience:t.experience,startDate:new Date().toISOString().split(`T`)[0]};try{let{data:e,status:t}=await _.post(b.createGroup(),n);t===201||t===200?(this.showNotification(`✅ Добавлена группа: "${e.groupName}"`),await this.getData()):this.showNotification(`❌ Ошибка при добавлении группы`,!0)}catch(e){console.error(`Ошибка добавления:`,e),this.showNotification(`❌ Ошибка соединения при добавлении группы`,!0)}}async deleteGroup(e){try{let{status:t}=await _.delete(b.deleteGroup(e));t===200||t===204?(this.showNotification(`🗑️ Группа удалена`),this.getData()):this.showNotification(`❌ Ошибка при удалении группы`,!0)}catch{this.showNotification(`❌ Ошибка соединения`,!0)}}filterGroups(){let e=document.getElementById(`filter-input`),t=document.getElementById(`format-filter`);e&&(this.filterText=e.value),t&&(this.formatFilter=t.value),this.renderGroups()}clickCard(e){new S(this.parent,e).render()}goHome(){this.render()}render(){this.parent.innerHTML=``,this.parent.insertAdjacentHTML(`beforeend`,this.getHTML()),this.getData(),document.getElementById(`add-button`)?.addEventListener(`click`,()=>this.addGroup()),document.getElementById(`filter-input`)?.addEventListener(`input`,()=>this.filterGroups()),document.getElementById(`format-filter`)?.addEventListener(`change`,()=>this.filterGroups()),document.getElementById(`home-button`)?.addEventListener(`click`,()=>this.goHome())}}}));t((()=>{D(),new E(document.getElementById(`root`)).render()}))();