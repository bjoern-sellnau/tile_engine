var setBytes=function(a,b){return a<<18|b};function getBytes(a){return[a&262143,a>>18&262143]}var makeMapTilesArray=function(a,b){for(var d=[],e=a.length;e--;)d[e]=setBytes(a[e],b[e]);return d};var CanvasSupport={canvas_compatible:false,check_canvas:function(){try{CanvasSupport.canvas_compatible=!!document.createElement("canvas").getContext("2d")}catch(a){CanvasSupport.canvas_compatible=!!document.createElement("canvas").getContext}return CanvasSupport.canvas_compatible}};var Console={console:0,hidden:true,init:function(){Console.console=$("<div id='console'>Loading...</br></div>").css("width",$("canvas").css("width")).insertAfter("canvas")},hide:function(){$(Console.console).hide("slow");Console.hidden=true},show:function(){$(Console.console).show("slow");Console.hidden=false},log:function(a){Console.console&&$(Console.console).append("> "+a+"<br />")}};function newMouse(){var a={down:false,offsetx:0,offsety:0,timer:0,accelx:0,accely:0,clickposx:0,clickposy:0,dx:0,dy:0,view:0,thrust:10,decay:0.97,maxSpeed:200,init:function(b){$(b).mousedown(a.mouseDown).mouseup(function(){a.down=false}).mouseout(function(){a.down=false}).mousemove(a.move);setInterval(a.update,100)},isDown:function(){return a.down},mouseDown:function(b){a.dx=0;a.dy=0;a.setClickPos(b)},setClickPos:function(b){a.clickposx=b.screenX;a.clickposy=b.screenY;a.down=true},move:function(b){a.isDown()?
(a.timer++,a.offsetx=b.screenX-a.clickposx,a.offsety=b.screenY-a.clickposy,a.setClickPos(b),a.accelx=a.offsetx/a.timer,a.accely=a.offsety/a.timer):a.reset()},reset:function(){a.offsetx=0;a.offsety=0;a.accelx=0;a.accely=0;a.timer=0},update:function(){if(a.isDown()){a.dx-=a.accelx*a.thrust;a.dy+=a.accely*a.thrust;var b=Math.sqrt(a.dx*a.dx+a.dy*a.dy);b>a.maxSpeed&&(a.dx*=a.maxSpeed/b,a.dy*=a.maxSpeed/b)}a.dx*=a.decay;a.dy*=a.decay;a.reset()}};return a};function newKeyboard(){var a={orientation:{},LEFT:37,RIGHT:39,UP:38,DOWN:40,thrust:10,maxSpeed:100,key_down:false,_focus:false,ctx_click:false,doc_click:false,dx:0,dy:0,decay:0.97,init:function(b){$(document).keydown(function(b){a.keydown(b)}).keyup(function(b){a.keyup(b)});$(b).mouseup(function(){a.ctx_click=true});$(document).keydown(a.keydown).keyup(a.keyup).mousedown(function(){a.doc_click=true}).mouseup(function(){a._focus=a.ctx_click&&a.doc_click;a.doc_click=a.ctx_click=false});setInterval(a.update,
1)},keydown:function(b){a.orientation[b.keyCode]=a._focus;a.key_down=a._focus},keyup:function(b){a.orientation[b.keyCode]=false;a.key_down=false},update:function(){a.orientation[a.LEFT]&&(a.dx-=a.thrust);a.orientation[a.RIGHT]&&(a.dx+=a.thrust);a.orientation[a.UP]&&(a.dy+=a.thrust);a.orientation[a.DOWN]&&(a.dy-=a.thrust);var b=Math.sqrt(a.dx*a.dx+a.dy*a.dy);b>a.maxSpeed&&(a.dx*=a.maxSpeed/b,a.dy*=a.maxSpeed/b);a.dx*=a.decay;a.dy*=a.decay}};return a};function newZone(){var a={base_canvas:0,dec_canvas:0,tileEngine:0,base_ctx:0,dec_ctx:0,left:0,top:0,right:0,bottom:0,tileWidth:0,tileHeight:0,width:0,height:0,x:0,y:0,viewoffset:0,tiles:0,init:function(b,d,e,c,g,h,f,i,j){a.tileEngine=b;a.left=a.x=d;a.top=a.y=e;a.right=d+i;a.bottom=e+j;a.tileWidth=h;a.tileHeight=f;a.width=i;a.height=j;a.base_canvas=document.createElement("canvas");a.base_ctx=a.base_canvas.getContext("2d");a.dec_canvas=document.createElement("canvas");a.dec_ctx=a.dec_canvas.getContext("2d");
a.base_canvas.setAttribute("width",i);a.base_canvas.setAttribute("height",j);a.dec_canvas.setAttribute("width",i);a.dec_canvas.setAttribute("height",j);a.tiles=[]},addTile:function(b){a.tiles.push(b)},arrangeTiles:function(b){for(var d=a.width/a.tileWidth,e=a.height/a.tileHeight,c=0,g=0;g<e;g++)for(var h=0;h<d;h++){var f=h*a.tileWidth+a.x,i=g*a.tileHeight+a.y;a.tiles[c].x=f;a.tiles[c].y=i;a.tiles[c].local_x=h*a.tileWidth;a.tiles[c].local_y=g*a.tileHeight;b[f]||(b[f]=[]);b[f][i]=a.tiles[c];c++}},drawTiles:function(b){a.base_ctx.clearRect(0,
0,a.width,a.height);if(a.tiles)for(var d=a.tiles.length;d--;){var e=a.tiles[d];b.isInView(e)&&a.tileEngine.tileSource[e.baseSourceIndex]&&a.base_ctx.drawImage(a.tileEngine.tileSource[e.baseSourceIndex].canvas,e.local_x,e.local_y);if(e.darker!=0)a.base_ctx.fillStyle="rgba(0,0,0,"+e.darker+")",a.base_ctx.fillRect(e.local_x,e.local_y,a.tileWidth,a.tileHeight),e.darker=0}},forDecoration:function(b){var d=$.extend({},a);d.viewoffset=b;return d},drawDecorations:function(b){a.dec_ctx.clearRect(0,0,a.width,
a.height);if(a.tiles)for(var d=a.tiles.length;d--;){var e=a.tiles[d];e.decorationIndex!=0&&b.isInView(e)&&a.tileEngine.tileSource[e.decorationIndex]&&a.dec_ctx.drawImage(a.tileEngine.tileSource[e.decorationIndex].canvas,e.local_x,e.local_y)}}};return a};function newTile(){var a={x:0,y:0,local_x:0,local_y:0,width:0,height:0,baseSourceIndex:0,decorationIndex:0,physicsID:0,darker:0,init:function(b,d,e,c,g,h){a.x=b;a.y=d;a.width=e;a.height=c;b=getBytes(g);a.baseSourceIndex=b[1];a.decorationIndex=b[0];a.physicsID=h||0}};return a};function newSprite(a,b,d,e){var c={sourceHash:0,current_index:0,current_direction:0,director:null,init:function(a,b,d,e,j,k){c.director=k;c.sourceHash=j;c.current_direction=c.sourceHash.up;setInterval(c.update_index,100)},update:function(){d&&(c.x%=a,c.y%=b);if(c.dx>1)c.current_direction=c.sourceHash.right;if(c.dx<-1)c.current_direction=c.sourceHash.left;if(c.dy>1)c.current_direction=c.sourceHash.up;if(c.dy<-1)c.current_direction=c.sourceHash.down},current_frame:function(){return c.current_direction[c.current_index]},
update_index:function(){if(c.dx>1||c.dx<-1||c.dy>1||c.dy<-1)if(c.current_index++,c.current_index>=c.current_direction.length)c.current_index=0},draw:function(a,b){if(b)for(var d=b.length;d--;){var i=b[d];c.spriteSource&&i.isInView(c)&&e.drawImage(c.spriteSource[c.current_frame()].canvas,c.x+i.xoffset-a.x,c.y+i.yoffset-a.y)}else c.spriteSource&&a.isInView(c)&&e.drawImage(c.spriteSource[c.current_frame()].canvas,c.x-a.x,c.y-a.y)}};return c};function newTileSource(){var a={canvas:0,ctx:0,sourceImage:0,init:function(b,d,e,c,g){a.sourceImage=g;a.canvas=document.createElement("canvas");a.ctx=a.canvas.getContext("2d");a.canvas.setAttribute("width",b);a.canvas.setAttribute("height",d);a.ctx.drawImage(a.sourceImage.image,e,c,b,d,0,0,b,d)}};return a};function newSourceImage(){var a={imageFilename:0,image:0,init:function(b){a.imageFilename=b;a.image=new Image;a.image.src=b}};return a};function newView(a,b,d,e,c,g,h){var f={x:a||0,y:b||0,viewWidth:0,viewHeight:0,director:null,xoffset:0,yoffset:0,isControllingSprite:0,main_sprite:0,init:function(a,b,c){f.director=a;f.main_sprite=b;f.isControllingSprite=c;f.decay=0.97;f.update()},update:function(){if(f.isControllingSprite()){if(f.x+=(f.main_sprite.x-(f.x+d/2))*0.05,f.y+=(f.main_sprite.y-(f.y+e/2))*0.05,h){if(f.x+d>=c+c-1)f.x=0,f.main_sprite.setXY(f.main_sprite.x-c,f.main_sprite.y);else if(f.x<=-c)f.x=0,f.main_sprite.setXY(f.main_sprite.x+
c,f.main_sprite.y);if(f.y+e>g+g)f.y=0,f.main_sprite.setXY(f.main_sprite.x,f.main_sprite.y-g);else if(f.y<-g)f.y=0,f.main_sprite.setXY(f.main_sprite.x,f.main_sprite.y+g)}}else h&&(f.x>c?(f.x-=c,f.px-=c):f.x<-c&&(f.x+=c,f.px+=c),f.y>g?(f.y-=g,f.py-=g):f.y<-g&&(f.y+=g,f.py+=g));if(!h){if(f.x+d>c)f.x=c-d;else if(f.x<0)f.x=0;if(f.y+e>g)f.y=g-e;else if(f.y<0)f.y=0}f.viewWidth=f.x+d;f.viewHeight=f.y+e},isInView:function(a){return a.x+a.width>this.x&&a.x<=this.viewWidth&&a.y+a.height>this.y&&a.y<=this.viewHeight},
up:function(){var a=$.extend({},this);if(a.y<0)a.y+=g,a.viewHeight=g,a.yoffset=-g;return a},down:function(){var a=$.extend({},this);if(a.viewHeight>g)a.y=0,a.viewHeight-=g,a.yoffset=g;return a},left:function(){var a=$.extend({},this);if(a.x<0)a.x+=c,a.viewWidth=c,a.xoffset=-c;return a},right:function(){var a=$.extend({},this);if(a.viewWidth>c)a.x=0,a.viewWidth-=c,a.xoffset=c;return a}};return f};function Body(a,b,d,e){return{x:a,y:b,px:a,py:b,dx:0,dy:0,width:d,height:e,decay:0.97,setXY:function(a,b){this.px=a;this.py=b;this.x=a;this.y=b},accelerate:function(a){if(this.director)this.dx=this.director.dx,this.dy=this.director.dy;this.x+=this.dx*a*a;this.y-=this.dy*a*a},inertia:function(){var a=this.x-this.px,b=this.y-this.py;this.px=this.x;this.py=this.y;this.x+=a*this.decay;this.y+=b*this.decay}}};function newPhysicsEngine(){var a={tiles:0,tile_width:0,tile_height:0,bodies:[],collidable_bodies:[],render_circ:false,ingnore_collide:false,init:function(b,d,e,c,g,h){a.tiles=b;a.tile_width=d;a.tile_height=e;a.map_width=c;a.map_height=g;a.render_circ=h},inside_map:function(a,d){return(a+d)%d},to_unit:function(b,d,e){return a.inside_map(Math.floor(b/d)*d,e)},collide:function(){for(var b=0,d=a.collidable_bodies_length;b<d;b++){var e=a.collidable_bodies[b];if(!e.ingnore_collide)for(var c=b+1;c<d;c++){var g=
a.collidable_bodies[c];if(!g.ingnore_collide){var h=e.x-g.x,f=e.y-g.y,i=Math.sqrt(h*h+f*f),j=e.width+g.width;i<j&&(i=(i-j)/i,e.x-=h*i*0.5,e.y-=f*i*0.5,g.x+=h*i*0.5,g.y+=f*i*0.5)}}}},barrier_collide:function(b){for(var d=a.collidable_bodies_length;d--;){var e=a.collidable_bodies[d],c=a.tile_width,g=a.tile_height,h=a.map_width,f=a.map_height,i=a.to_unit(e.x,c,h),j=a.to_unit(e.y,g,f);if(Math.round(e.dx*2)/2!=0){var g=j,c=e.dx>0?a.to_unit(i+e.width,c,h):i,k=a.inside_map(e.y+e.height,f);if(g>k){do if(a.tiles[c][a.inside_map(g,
f)].darker=0.4,a.tiles[c][a.inside_map(g,f)].physicsID!=0){e.x-=e.dx*b*b;return}while((g+=a.tile_height)<f);k=0}do if(a.tiles[c][a.inside_map(g,f)].darker=0.4,a.tiles[c][a.inside_map(g,f)].physicsID!=0){e.x-=e.dx*b*b;return}while((g+=a.tile_height)<k)}if(Math.round(e.dy*2)/2!=0){c=i;g=e.dy<0?a.to_unit(j+e.height+1,a.tile_height,f):j;f=a.inside_map(e.x+e.width,h);if(c>f){do if(a.tiles[a.inside_map(c,h)][g].darker=0.4,a.tiles[a.inside_map(c,h)][g].physicsID!=0){e.y+=e.dy*b*b;return}while((c+=a.tile_width)<
h);c=0}do if(a.tiles[a.inside_map(c,h)][g].darker=0.4,a.tiles[a.inside_map(c,h)][g].physicsID!=0){e.y+=e.dy*b*b;return}while((c+=a.tile_width)<f)}}},border_collide:function(){for(var b=a.collidable_bodies_length;b--;){var d=a.collidable_bodies[b],e=d.width,c=d.height,g=d.x,h=d.y;if(g<0)d.x=0;else if(g+e>a.map_width)d.x=a.map_width-e;if(h<0)d.y=0;else if(h+c>a.map_height)d.y=a.map_height-c}},gravity:function(){for(var b=a.bodies_length;b--;)a.bodies[b].dx*=a.bodies[b].decay,a.bodies[b].dy*=a.bodies[b].decay},
accelerate:function(b){for(var d=a.bodies_length;d--;)a.bodies[d].accelerate(b)},inertia:function(b){for(var d=a.bodies_length;d--;)a.bodies[d].inertia(b)},update:function(){for(var b=a.bodies_length;b--;)a.bodies[b].update&&a.bodies[b].update()},integrate:function(b){a.gravity();a.accelerate(b);a.collide();a.barrier_collide(b);a.render_circ||a.border_collide();a.inertia(b);a.update()},add_actor:function(b,d,e,c,g,h){d=Body(d,e,c,g);$.extend(b,d);a.bodies.push(b);h||a.collidable_bodies.push(b);a.bodies_length=
a.bodies.length;a.collidable_bodies_length=a.collidable_bodies.length}};return a};function newTileEngine(){var a={canvas:0,ctx:0,tiles:0,zones:0,tileSource:0,width:0,height:0,zoneTilesWide:0,zoneTilesHigh:0,tilesHigh:0,tilesWide:0,tileWidth:0,tileHeight:0,mapWidth:0,mapHeight:0,sprites:[],main_sprite:0,mouse:newMouse(),keyboard:newKeyboard(),physics_engine:newPhysicsEngine(),renderCircular:false,timeofDay:0.2,view:0,active_controller:0,t:0,dt:0.01,currentTime:(new Date).getTime(),accumulator:0,gameTimer:0,fps:250,fps_count:0,fps_timer:0,initialized:false,init:function(){a.view||
alert("please set map attributes before initializing tile engine");a.mouse.init(a.canvas);a.keyboard.init(a.canvas);a.physics_engine.init(a.tiles,a.tileWidth,a.tileHeight,a.mapWidth,a.mapHeight,a.renderCircular);a.view.init(a.mouse,a.main_sprite,a.isKeyBoardActive);$(a.canvas).mouseup(function(){a.ctx_click=true});$(document).keydown(function(){if(a._focus)a.active_controller=a.keyboard}).mousedown(function(){a.active_controller=a.mouse;a.doc_click=true}).mouseup(function(){a._focus=a.ctx_click&&
a.doc_click;a.doc_click=a.ctx_click=false});a.initialized=true;Console.log("Tile Map Initialized")},isKeyBoardActive:function(){return a.active_controller==a.keyboard},isMouseActive:function(){return a.active_controller==a.mouse},setMapAttributes:function(b){a.canvas=b.canvas;a.ctx=b.ctx;a.width=a.canvas.width;a.height=a.canvas.height;a.tileWidth=b.tileWidth;a.tileHeight=b.tileHeight;a.zoneTilesWide=b.zoneTilesWide;a.zoneTilesHigh=b.zoneTilesHigh;a.tilesWide=b.tilesWide;a.tilesHigh=b.tilesHigh;a.renderCircular|=
b.renderCircular;a.mapWidth=a.tilesWide*a.tileWidth;a.mapHeight=a.tilesHigh*a.tileHeight;a.view=newView(b.init_x,b.init_y,a.width,a.height,a.mapWidth,a.mapHeight,a.renderCircular);a.physics_engine.add_actor(a.view,b.init_x,b.init_y,a.width,a.height,true);Console.log(b.sourceTileCounts+" Source Tiles to Load");Console.log(b.tilesArray.length+" Map Tiles to Load");var d=newSourceImage();d.init(b.sourceFile);d.image.onload=function(){a.tileSource=a.createTileSource(b.tileWidth,b.tileHeight,b.sourceTileCounts,
b.sourceTileAccross,b.tile_offset_x||0,b.tile_offset_y||0,d)};a.createTiles(b.tilesArray,b.physicsArray)},setMainSpriteAttributes:function(b){a.main_sprite=a.addSprite(b,a.keyboard)},addSprite:function(b,d){var e=newSprite(a.mapWidth,a.mapHeight,a.renderCircular,a.ctx);e.init(b.init_x,b.init_y,b.width,b.height,b.movement_hash,d);a.physics_engine.add_actor(e,b.init_x,b.init_y,b.width,b.height);var c=newSourceImage();c.init(b.sourceFile);c.image.onload=function(){e.spriteSource=a.createTileSource(b.width,
b.height,b.sourceTileCounts,b.sourceTileAccross,b.tile_offset_x||0,b.tile_offset_y||0,c)};a.sprites.push(e);return e},integrator:function(){var b=(new Date).getTime(),d=(b-a.currentTime)/100;d>0.25&&(d=0.25);a.currentTime=b;for(a.accumulator+=d;a.accumulator>=a.dt;)a.accumulator-=a.dt,a.physics_engine.integrate(a.dt),a.t+=a.dt;a.active_controller?a.active_controller.update():a.view.update()},start:function(){console.log("FPS limit set to: "+a.fps);a.gameTimer=setInterval(a.drawFrame,1E3/a.fps);a.fps_timer=
setInterval(a.updateFPS,2E3)},updateFPS:function(){a.fps=a.fps_count/2;a.fps_count=0},drawFrame:function(){if(a.initialized)a.integrator(),a.ctx.clearRect(0,0,a.width,a.height),a.zones&&(a.renderCircular?a.renderCirc(a.view):a.renderNorm(a.view)),a.ctx.fillStyle="rgba(0,0,0,"+a.timeofDay+")",a.ctx.fillRect(0,0,a.width,a.height),a.fps_count++},renderCirc:function(b){for(var d=a.zones.length,e=[],c=a.getCurrentViews(b);d--;)for(var g=a.zones[d],h=c.length;h--;){var f=c[h];f.isInView(g)&&(e.push(g.forDecoration(f)),
g.drawTiles(f),a.ctx.drawImage(g.base_canvas,Math.round(g.x+f.xoffset-b.x),Math.round(g.y+f.yoffset-b.y)))}for(d=a.sprites.length;d--;)a.sprites[d].draw(b,c);for(d=e.length;d--;)g=e[d],f=g.viewoffset,g.drawDecorations(f),a.ctx.drawImage(g.dec_canvas,g.x+f.xoffset-b.x,g.y+f.yoffset-b.y)},renderNorm:function(b){for(var d=a.zones.length,e=[];d--;){var c=a.zones[d];b.isInView(c)&&(e.push(c.forDecoration(b)),c.drawTiles(b),a.ctx.drawImage(c.base_canvas,Math.round(c.x-b.x),Math.round(c.y-b.y)))}for(d=a.sprites.length;d--;)a.sprites[d].draw(b);
for(d=e.length;d--;)c=e[d],c.drawDecorations(b),a.ctx.drawImage(c.dec_canvas,c.x-b.x,c.y-b.y)},getCurrentViews:function(b){var d=[b],e=b.y<0,c=b.viewHeight>a.mapHeight;if(b.x<0){var g=b.left();d.push(g);e&&d.push(g.up());c&&d.push(g.down())}b.viewWidth>a.mapWidth&&(g=b.right(),d.push(g),e&&d.push(g.up()),c&&d.push(g.down()));e&&d.push(b.up());c&&d.push(b.down());return d},createTileSource:function(a,d,e,c,g,h,f){for(var i=[],j=0,k=0,l=0,m=0,n=0,o=0;o<e;o++){var p=newTileSource();p.init(a,d,k+g*m,
l+h*n,f);i.push(p);j++;k+=a;m++;j>=c&&(j=0,l+=d,n++,m=k=0)}return i},createZones:function(){a.zones=[];for(var b=Math.ceil(a.tilesWide/a.zoneTilesWide),d=Math.ceil(a.tilesHigh/a.zoneTilesHigh),e=a.tilesWide%a.zoneTilesWide,c=a.tilesHigh%a.zoneTilesHigh,g=0;g<d;g++)for(var h=0;h<b;h++){var f=newZone(),i=h*a.zoneTilesWide*a.tileWidth,j=g*a.zoneTilesHigh*a.tileHeight,k=a.zoneTilesWide*a.tileWidth,l=a.zoneTilesWide;h==b-1&&e>0&&(l=e,k=l*a.tileWidth);var m=a.zoneTilesHigh*a.tileHeight,n=a.zoneTilesHigh;
g==d-1&&c>0&&(n=c,m=n*a.tileHeight);f.init(a,i,j,l,a.zoneTilesHigh,a.tileWidth,a.tileHeight,k,m);a.zones.push(f)}},createTiles:function(b,d){a.createZones();for(var e=0,c=0,g=0,g=0,h=Math.ceil(a.tilesWide/a.zoneTilesWide),f=0,i=a.tilesHigh;f<i;f++)for(var c=Math.floor(f/a.zoneTilesHigh),j=0,k=a.tilesWide;j<k;j++){var g=Math.floor(j/a.zoneTilesWide),l=newTile();l.init(0,0,a.tileWidth,a.tileHeight,b[e],d[e]);g=c*h+g;a.zones[g].addTile(l);e++}a.tiles=[];e=0;for(c=a.zones.length;e<c;e++)a.zones[e].arrangeTiles(a.tiles);
Console.log("Tiles Ready")}};Console.init();return CanvasSupport.check_canvas()?a:false};
