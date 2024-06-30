var DAT=DAT||{};DAT.Globe=function(e,t){var r,n,a,o,s,$,l,d,h,c,p,m=(t=t||{}).colorFn||function(e){var t=new THREE.Color;return t.setHSL(.441+e/2,.6,.75),t},v={earth:{uniforms:{texture:{type:"t",value:null}},vertexShader:"varying vec3 vNormal;\nvarying vec2 vUv;\nvoid main() {\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.05 );\nvNormal = normalize( normalMatrix * normal );\nvUv = uv;\n}",fragmentShader:"uniform sampler2D texture;\nvarying vec3 vNormal;\nvarying vec2 vUv;\nvoid main() {\nvec3 diffuse = texture2D( texture, vUv ).xyz;\nfloat intensity = 1.05 - dot( vNormal, vec3( 0.0, 0.0, 1.0 ) );\nvec3 atmosphere = vec3( 0, 1.0, 1.0 ) * pow( intensity, 3.0 );\ngl_FragColor = vec4( diffuse + atmosphere, 0.3 );\n}"},atmosphere:{uniforms:{},vertexShader:"varying vec3 vNormal;\nvoid main() {\nvNormal = normalize( normalMatrix * normal );\ngl_Position = projectionMatrix * modelViewMatrix * vec4( position, 0 );\n}",fragmentShader:"varying vec3 vNormal;\nvoid main() {\nfloat intensity = pow( 0.8 - dot( vNormal, vec3( 0, 0, 1.0 ) ), 12.0 );\ngl_FragColor = vec4( 1.0, 1.0, 1.0, 1.0 ) * intensity;\n}"}},g={x:0,y:0},f={x:3*Math.PI/2,y:Math.PI/6},x=1e6,u=1e5,_=new THREE.Texture(generateTexture("front")),w=new THREE.Texture(generateTexture("back")),y=new THREE.Texture(generateTexture("left")),S=new THREE.Texture(generateTexture("right")),M=new THREE.Texture(generateTexture("top"));function C(e,t,r,n,a){var o=(90-e)*Math.PI/180,s=(180-t)*Math.PI/180;p.position.x=200*Math.sin(o)*Math.cos(s),p.position.y=200*Math.cos(o),p.position.z=200*Math.sin(o)*Math.sin(s),p.lookAt(c.position),p.scale.z=Math.max(r,.1),p.updateMatrix();for(var $=0;$<p.geometry.faces.length;$++)p.geometry.faces[$].color=n;p.matrixAutoUpdate&&p.updateMatrix(),a.merge(p.geometry,p.matrix)}_.needsUpdate=!0,w.needsUpdate=!0,y.needsUpdate=!0,S.needsUpdate=!0,M.needsUpdate=!0;function T(){requestAnimationFrame(T),u-=0,u=(u=u>1100?1100:u)<350?350:u,g.x+=.005,g.y+=(f.y-g.y)*.1,x+=(u-x)*.8,s.position.x=x*Math.sin(g.x)*Math.cos(g.y),s.position.y=x*Math.sin(g.y),s.position.z=x*Math.cos(g.x)*Math.cos(g.y),s.lookAt(c.position),l.render($,s)}return d=e.offsetWidth||window.innerWidth,h=e.offsetHeight||window.innerHeight,(s=new THREE.PerspectiveCamera(30,d/h,1,1e4)).position.z=x,$=new THREE.Scene,o=new THREE.SphereGeometry(200,40,30),r=v.earth,n=THREE.UniformsUtils.clone(r.uniforms),THREE.ImageUtils.crossOrigin="",n.texture.value=THREE.ImageUtils.loadTexture("https://cdn.rawgit.com/dataarts/webgl-globe/2d24ba30/globe/world.jpg"),a=new THREE.ShaderMaterial({uniforms:n,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,transparent:!0}),(c=new THREE.Mesh(o,a)).rotation.y=Math.PI,$.add(c),r=v.atmosphere,n=THREE.UniformsUtils.clone(r.uniforms),a=new THREE.ShaderMaterial({uniforms:n,vertexShader:r.vertexShader,fragmentShader:r.fragmentShader,side:THREE.BackSide,blending:THREE.AdditiveBlending,transparent:!0}),(c=new THREE.Mesh(o,a)).scale.set(1.1,1.1,1.1),$.add(c),(o=new THREE.BoxGeometry(.75,.75,1)).applyMatrix(new THREE.Matrix4().makeTranslation(0,0,-.5)),p=new THREE.Mesh(o),(l=new THREE.WebGLRenderer({antialias:!0,alpha:!0})).setSize(d,h),l.domElement.style.position="absolute",e.appendChild(l.domElement),window.addEventListener("resize",function e(t){s.aspect=window.innerWidth/window.innerHeight,s.updateProjectionMatrix(),l.setSize(window.innerWidth,window.innerHeight)},!1),this.animate=T,this.__defineGetter__("time",function(){return this._time||0}),this.__defineSetter__("time",function(e){var t=[],r=this.points.morphTargetDictionary;for(var n in r)0>n.indexOf("morphPadding")&&t.push(r[n]);t.sort();var a=e*(t.length-1)+1,o=Math.floor(a);for(i=0;i<t.length;i++)this.points.morphTargetInfluences[t[i]]=0;var s=o-1,$=a-o;s>=0&&(this.points.morphTargetInfluences[s]=1-$),this.points.morphTargetInfluences[o]=$,this._time=e}),this.addData=function e(t,r){l=3,d=function(e,t){return m(e[t+2])};var n,a,o,s,$,l,d,h=new THREE.Geometry;for($=0;$<t.length;$+=l)n=t[$],a=t[$+1],s=d(t,$),o=t[$+2],C(n,a,o*=200,s,h);this._baseGeometry=h},this.createPoints=function e(){this.points=new THREE.Mesh(this._baseGeometry,new THREE.MeshFaceMaterial([new THREE.MeshBasicMaterial({map:y,transparent:!0,vertexColors:THREE.FaceColors}),new THREE.MeshBasicMaterial({map:S,transparent:!0,vertexColors:THREE.FaceColors}),new THREE.MeshBasicMaterial({map:_,transparent:!0,vertexColors:THREE.FaceColors}),new THREE.MeshBasicMaterial({map:w,transparent:!0,vertexColors:THREE.FaceColors}),new THREE.MeshBasicMaterial({vertexColors:THREE.FaceColors}),new THREE.MeshBasicMaterial({transparent:!0,alphaTest:1})])),$.add(this.points)},this.renderer=l,this.scene=$,this};var container=document.getElementById("container"),globe=new DAT.Globe(container),xhr=new XMLHttpRequest;function generateTexture(e){(canvas=document.createElement("canvas")).width=16,canvas.height=16;var t,r=canvas.getContext("2d");return r.rect(0,0,16,16),t="front"==e||"back"==e?r.createLinearGradient(0,0,0,16):r.createLinearGradient(0,0,16,0),"front"==e?(t.addColorStop(0,"transparent"),t.addColorStop(1,"white")):"back"==e?(t.addColorStop(1,"transparent"),t.addColorStop(0,"white")):"left"==e?(t.addColorStop(1,"transparent"),t.addColorStop(0,"white")):(t.addColorStop(0,"transparent"),t.addColorStop(1,"white")),r.globalAlpha=.8,r.fillStyle="#41caa5",r.fillRect(0,0,200,200),r.fillStyle=t,r.fill(),canvas}xhr.open("GET","https://cdn.rawgit.com/dataarts/webgl-globe/2d24ba30/globe/population909500.json",!0),xhr.onreadystatechange=function(e){if(4===xhr.readyState&&200===xhr.status){var t=JSON.parse(xhr.responseText);for(i=0,window.data=t;i<t.length;i++)globe.addData(t[i][1],{format:"magnitude",name:t[i][0],animated:!1});globe.createPoints(),globe.animate()}},xhr.send(null);