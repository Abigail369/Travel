define(["./when-54335d57","./Cartesian2-697a9954","./ArcType-2b58731c","./GeometryOffsetAttribute-6e5d8e16","./BoundingRectangle-f46bca91","./Transforms-251ff661","./Check-f3fec9b0","./ComponentDatatype-417761a2","./EllipsoidGeodesic-efd225af","./EllipsoidTangentPlane-ae33ec6a","./GeometryAttribute-7ca1c9e4","./GeometryInstance-1bb3fb4a","./GeometryPipeline-1dd54e44","./IndexDatatype-c134ea39","./Math-737a2579","./PolygonGeometryLibrary-e3208a07","./PolygonPipeline-1048742e","./VertexFormat-acf45ede","./RuntimeError-88a32665","./WebGLConstants-4739ce15","./AxisAlignedBoundingBox-dcfdb7a9","./IntersectionTests-3e34a0aa","./Plane-d4cb7bb3","./AttributeCompression-ab5c33b7","./EncodedCartesian3-0ae9fe5e","./arrayRemoveDuplicates-db90b85c","./EllipsoidRhumbLine-e5c51fa7","./GeometryAttributes-caa08d6c"],function(z,W,p,Y,e,U,t,j,y,A,Q,E,G,O,q,V,F,f,a,r,o,i,n,s,l,u,c,m){"use strict";var K=new W.Cartographic,Z=new W.Cartographic;var D=new e.BoundingRectangle,J=new W.Cartesian3,X=new W.Cartesian3,$=new W.Cartesian3,ee=new W.Cartesian3,te=new W.Cartesian3,ae=new W.Cartesian3,re=new W.Cartesian3,oe=new W.Cartesian3,ie=new W.Cartesian3,ne=new W.Cartesian2,se=new W.Cartesian2,le=new W.Cartesian3,ue=new U.Quaternion,ce=new U.Matrix3,pe=new U.Matrix3;function L(e){var t,a=e.vertexFormat,r=e.geometry,o=e.shadowVolume,i=r.attributes.position.values,n=i.length,s=e.wall,l=e.top||s,u=e.bottom||s;if(a.st||a.normal||a.tangent||a.bitangent||o){var c=e.boundingRectangle,p=e.tangentPlane,y=e.ellipsoid,m=e.stRotation,g=e.perPositionHeight,d=ne;d.x=c.x,d.y=c.y;var h,f=a.st?new Float32Array(n/3*2):void 0;a.normal&&(h=g&&l&&!s?r.attributes.normal.values:new Float32Array(n));var b,_=a.tangent?new Float32Array(n):void 0,v=a.bitangent?new Float32Array(n):void 0,P=o?new Float32Array(n):void 0,C=0,x=0,w=X,T=$,I=ee,A=!0,E=ce,G=pe;G=0!==m?(b=U.Quaternion.fromAxisAngle(p._plane.normal,m,ue),E=U.Matrix3.fromQuaternion(b,E),b=U.Quaternion.fromAxisAngle(p._plane.normal,-m,ue),U.Matrix3.fromQuaternion(b,G)):(E=U.Matrix3.clone(U.Matrix3.IDENTITY,E),U.Matrix3.clone(U.Matrix3.IDENTITY,G));var O=0,V=0;l&&u&&(O=n/2,V=n/3,n/=2);for(var F=0;F<n;F+=3){var D,L,N,H,R,M,S,B,k=W.Cartesian3.fromArray(i,F,le);a.st&&(D=U.Matrix3.multiplyByVector(E,k,J),D=y.scaleToGeodeticSurface(D,D),L=p.projectPointOntoPlane(D,se),W.Cartesian2.subtract(L,d,L),N=q.CesiumMath.clamp(L.x/c.width,0,1),H=q.CesiumMath.clamp(L.y/c.height,0,1),u&&(f[C+V]=N,f[C+1+V]=H),l&&(f[C]=N,f[C+1]=H),C+=2),(a.normal||a.tangent||a.bitangent||o)&&(R=x+1,M=x+2,s?(F+3<n&&(S=W.Cartesian3.fromArray(i,F+3,te),A&&(B=W.Cartesian3.fromArray(i,F+n,ae),g&&(t=k,D=S,L=B,N=void 0,N=(H=y).cartesianToCartographic(t,K).height,(t=H.cartesianToCartographic(D,Z)).height=N,H.cartographicToCartesian(t,D),(D=H.cartesianToCartographic(L,Z)).height=N-100,H.cartographicToCartesian(D,L)),W.Cartesian3.subtract(S,k,S),W.Cartesian3.subtract(B,k,B),w=W.Cartesian3.normalize(W.Cartesian3.cross(B,S,w),w),A=!1),W.Cartesian3.equalsEpsilon(S,k,q.CesiumMath.EPSILON10)&&(A=!0)),(a.tangent||a.bitangent)&&(I=y.geodeticSurfaceNormal(k,I),a.tangent&&(T=W.Cartesian3.normalize(W.Cartesian3.cross(I,w,T),T)))):(w=y.geodeticSurfaceNormal(k,w),(a.tangent||a.bitangent)&&(g&&(re=W.Cartesian3.fromArray(h,x,re),oe=W.Cartesian3.cross(W.Cartesian3.UNIT_Z,re,oe),oe=W.Cartesian3.normalize(U.Matrix3.multiplyByVector(G,oe,oe),oe),a.bitangent&&(ie=W.Cartesian3.normalize(W.Cartesian3.cross(re,oe,ie),ie))),T=W.Cartesian3.cross(W.Cartesian3.UNIT_Z,w,T),T=W.Cartesian3.normalize(U.Matrix3.multiplyByVector(G,T,T),T),a.bitangent&&(I=W.Cartesian3.normalize(W.Cartesian3.cross(w,T,I),I)))),a.normal&&(e.wall?(h[x+O]=w.x,h[R+O]=w.y,h[M+O]=w.z):u&&(h[x+O]=-w.x,h[R+O]=-w.y,h[M+O]=-w.z),(l&&!g||s)&&(h[x]=w.x,h[R]=w.y,h[M]=w.z)),o&&(s&&(w=y.geodeticSurfaceNormal(k,w)),P[x+O]=-w.x,P[R+O]=-w.y,P[M+O]=-w.z),a.tangent&&(e.wall?(_[x+O]=T.x,_[R+O]=T.y,_[M+O]=T.z):u&&(_[x+O]=-T.x,_[R+O]=-T.y,_[M+O]=-T.z),l&&(g?(_[x]=oe.x,_[R]=oe.y,_[M]=oe.z):(_[x]=T.x,_[R]=T.y,_[M]=T.z))),a.bitangent&&(u&&(v[x+O]=I.x,v[R+O]=I.y,v[M+O]=I.z),l&&(g?(v[x]=ie.x,v[R]=ie.y,v[M]=ie.z):(v[x]=I.x,v[R]=I.y,v[M]=I.z))),x+=3)}a.st&&(r.attributes.st=new Q.GeometryAttribute({componentDatatype:j.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:f})),a.normal&&(r.attributes.normal=new Q.GeometryAttribute({componentDatatype:j.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:h})),a.tangent&&(r.attributes.tangent=new Q.GeometryAttribute({componentDatatype:j.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:_})),a.bitangent&&(r.attributes.bitangent=new Q.GeometryAttribute({componentDatatype:j.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:v})),o&&(r.attributes.extrudeDirection=new Q.GeometryAttribute({componentDatatype:j.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:P}))}return e.extrude&&z.defined(e.offsetAttribute)&&(m=i.length/3,b=new Uint8Array(m),e.offsetAttribute===Y.GeometryOffsetAttribute.TOP?l&&u||s?b=Y.arrayFill(b,1,0,m/2):l&&(b=Y.arrayFill(b,1)):(m=e.offsetAttribute===Y.GeometryOffsetAttribute.NONE?0:1,b=Y.arrayFill(b,m)),r.attributes.applyOffset=new Q.GeometryAttribute({componentDatatype:j.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:b})),r}var g=new W.Cartographic,d=new W.Cartographic,h={westOverIDL:0,eastOverIDL:0},b=new y.EllipsoidGeodesic;function _(e,t,a,r,o){if(o=z.defaultValue(o,new W.Rectangle),!z.defined(e)||e.length<3)return o.west=0,o.north=0,o.south=0,o.east=0,o;if(a===p.ArcType.RHUMB)return W.Rectangle.fromCartesianArray(e,t,o);b.ellipsoid.equals(t)||(b=new y.EllipsoidGeodesic(void 0,void 0,t)),o.west=Number.POSITIVE_INFINITY,o.east=Number.NEGATIVE_INFINITY,o.south=Number.POSITIVE_INFINITY,o.north=Number.NEGATIVE_INFINITY,h.westOverIDL=Number.POSITIVE_INFINITY,h.eastOverIDL=Number.NEGATIVE_INFINITY;for(var i,n=1/q.CesiumMath.chordLength(r,t.maximumRadius),s=e.length,l=t.cartesianToCartographic(e[0],d),u=g,c=1;c<s;c++)i=u,u=l,l=t.cartesianToCartographic(e[c],i),b.setEndPoints(u,l),P(b,n,o,h);return i=u,u=l,l=t.cartesianToCartographic(e[0],i),b.setEndPoints(u,l),P(b,n,o,h),o.east-o.west>h.eastOverIDL-h.westOverIDL&&(o.west=h.westOverIDL,o.east=h.eastOverIDL,o.east>q.CesiumMath.PI&&(o.east=o.east-q.CesiumMath.TWO_PI),o.west>q.CesiumMath.PI&&(o.west=o.west-q.CesiumMath.TWO_PI)),o}var v=new W.Cartographic;function P(e,t,a,r){for(var o=e.surfaceDistance,i=Math.ceil(o*t),n=0<i?o/(i-1):Number.POSITIVE_INFINITY,s=0,l=0;l<i;l++){var u=e.interpolateUsingSurfaceDistance(s,v);s+=n;var c=u.longitude,u=u.latitude;a.west=Math.min(a.west,c),a.east=Math.max(a.east,c),a.south=Math.min(a.south,u),a.north=Math.max(a.north,u);c=0<=c?c:c+q.CesiumMath.TWO_PI;r.westOverIDL=Math.min(r.westOverIDL,c),r.eastOverIDL=Math.max(r.eastOverIDL,c)}}var N=[];function C(e){var t,a=e.polygonHierarchy,r=z.defaultValue(e.vertexFormat,f.VertexFormat.DEFAULT),o=z.defaultValue(e.ellipsoid,W.Ellipsoid.WGS84),i=z.defaultValue(e.granularity,q.CesiumMath.RADIANS_PER_DEGREE),n=z.defaultValue(e.stRotation,0),s=z.defaultValue(e.perPositionHeight,!1),l=s&&z.defined(e.extrudedHeight),u=z.defaultValue(e.height,0),c=z.defaultValue(e.extrudedHeight,u);l||(t=Math.max(u,c),c=Math.min(u,c),u=t),this._vertexFormat=f.VertexFormat.clone(r),this._ellipsoid=W.Ellipsoid.clone(o),this._granularity=i,this._stRotation=n,this._height=u,this._extrudedHeight=c,this._closeTop=z.defaultValue(e.closeTop,!0),this._closeBottom=z.defaultValue(e.closeBottom,!0),this._polygonHierarchy=a,this._perPositionHeight=s,this._perPositionHeightExtrude=l,this._shadowVolume=z.defaultValue(e.shadowVolume,!1),this._workerName="createPolygonGeometry",this._offsetAttribute=e.offsetAttribute,this._arcType=z.defaultValue(e.arcType,p.ArcType.GEODESIC),this._rectangle=void 0,this._textureCoordinateRotationPoints=void 0,this.packedLength=V.PolygonGeometryLibrary.computeHierarchyPackedLength(a)+W.Ellipsoid.packedLength+f.VertexFormat.packedLength+12}C.fromPositions=function(e){return new C({polygonHierarchy:{positions:(e=z.defaultValue(e,z.defaultValue.EMPTY_OBJECT)).positions},height:e.height,extrudedHeight:e.extrudedHeight,vertexFormat:e.vertexFormat,stRotation:e.stRotation,ellipsoid:e.ellipsoid,granularity:e.granularity,perPositionHeight:e.perPositionHeight,closeTop:e.closeTop,closeBottom:e.closeBottom,offsetAttribute:e.offsetAttribute,arcType:e.arcType})},C.pack=function(e,t,a){return a=z.defaultValue(a,0),a=V.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,a),W.Ellipsoid.pack(e._ellipsoid,t,a),a+=W.Ellipsoid.packedLength,f.VertexFormat.pack(e._vertexFormat,t,a),a+=f.VertexFormat.packedLength,t[a++]=e._height,t[a++]=e._extrudedHeight,t[a++]=e._granularity,t[a++]=e._stRotation,t[a++]=e._perPositionHeightExtrude?1:0,t[a++]=e._perPositionHeight?1:0,t[a++]=e._closeTop?1:0,t[a++]=e._closeBottom?1:0,t[a++]=e._shadowVolume?1:0,t[a++]=z.defaultValue(e._offsetAttribute,-1),t[a++]=e._arcType,t[a]=e.packedLength,t};var x=W.Ellipsoid.clone(W.Ellipsoid.UNIT_SPHERE),w=new f.VertexFormat,T={polygonHierarchy:{}};return C.unpack=function(e,t,a){t=z.defaultValue(t,0);var r=V.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=r.startingIndex,delete r.startingIndex;var o=W.Ellipsoid.unpack(e,t,x);t+=W.Ellipsoid.packedLength;var i=f.VertexFormat.unpack(e,t,w);t+=f.VertexFormat.packedLength;var n=e[t++],s=e[t++],l=e[t++],u=e[t++],c=1===e[t++],p=1===e[t++],y=1===e[t++],m=1===e[t++],g=1===e[t++],d=e[t++],h=e[t++],t=e[t];return(a=!z.defined(a)?new C(T):a)._polygonHierarchy=r,a._ellipsoid=W.Ellipsoid.clone(o,a._ellipsoid),a._vertexFormat=f.VertexFormat.clone(i,a._vertexFormat),a._height=n,a._extrudedHeight=s,a._granularity=l,a._stRotation=u,a._perPositionHeightExtrude=c,a._perPositionHeight=p,a._closeTop=y,a._closeBottom=m,a._shadowVolume=g,a._offsetAttribute=-1===d?void 0:d,a._arcType=h,a.packedLength=t,a},C.computeRectangle=function(e,t){var a=z.defaultValue(e.granularity,q.CesiumMath.RADIANS_PER_DEGREE),r=z.defaultValue(e.arcType,p.ArcType.GEODESIC),o=e.polygonHierarchy,e=z.defaultValue(e.ellipsoid,W.Ellipsoid.WGS84);return _(o.positions,e,r,a,t)},C.createGeometry=function(e){var t=e._vertexFormat,a=e._ellipsoid,r=e._granularity,o=e._stRotation,i=e._polygonHierarchy,n=e._perPositionHeight,s=e._closeTop,l=e._closeBottom,u=e._arcType;if(!((g=i.positions).length<3)){var c=A.EllipsoidTangentPlane.fromPoints(g,a),i=V.PolygonGeometryLibrary.polygonsFromHierarchy(i,c.projectPointsOntoPlane.bind(c),!n,a),p=i.hierarchy,y=i.polygons;if(0!==p.length){var m,g=p[0].outerRing,g=V.PolygonGeometryLibrary.computeBoundingRectangle(c.plane.normal,c.projectPointOntoPlane.bind(c),g,o,D),d=[],h=e._height,f=e._extrudedHeight,b={perPositionHeight:n,vertexFormat:t,geometry:void 0,tangentPlane:c,boundingRectangle:g,ellipsoid:a,stRotation:o,bottom:!1,top:!0,wall:!1,extrude:!1,arcType:u};if(e._perPositionHeightExtrude||!q.CesiumMath.equalsEpsilon(h,f,0,q.CesiumMath.EPSILON2))for(b.extrude=!0,b.top=s,b.bottom=l,b.shadowVolume=e._shadowVolume,b.offsetAttribute=e._offsetAttribute,m=0;m<y.length;m++){var _,v=function(e,t,a,r,o,i,n,s,l){var u={walls:[]};if(i||n){var c=V.PolygonGeometryLibrary.createGeometryFromPositions(e,t,a,o,s,l),t=c.attributes.position.values,p=c.indices;if(i&&n){var y,i=t.concat(t),m=i.length/3;(y=O.IndexDatatype.createTypedArray(m,2*p.length)).set(p);for(var g=p.length,d=m/2,h=0;h<g;h+=3){var f=y[h]+d,b=y[h+1]+d,_=y[h+2]+d;y[h+g]=_,y[h+1+g]=b,y[h+2+g]=f}c.attributes.position.values=i,o&&s.normal&&(s=c.attributes.normal.values,c.attributes.normal.values=new Float32Array(i.length),c.attributes.normal.values.set(s)),c.indices=y}else if(n){for(m=t.length/3,y=O.IndexDatatype.createTypedArray(m,p.length),h=0;h<p.length;h+=3)y[h]=p[h+2],y[h+1]=p[h+1],y[h+2]=p[h];c.indices=y}u.topAndBottom=new E.GeometryInstance({geometry:c})}var c=r.outerRing,v=A.EllipsoidTangentPlane.fromPoints(c,e).projectPointsOntoPlane(c,N);F.PolygonPipeline.computeWindingOrder2D(v)===F.WindingOrder.CLOCKWISE&&(c=c.slice().reverse());var P=V.PolygonGeometryLibrary.computeWallGeometry(c,e,a,o,l);u.walls.push(new E.GeometryInstance({geometry:P}));var C=r.holes;for(h=0;h<C.length;h++){var x=C[h],v=A.EllipsoidTangentPlane.fromPoints(x,e).projectPointsOntoPlane(x,N);F.PolygonPipeline.computeWindingOrder2D(v)===F.WindingOrder.COUNTER_CLOCKWISE&&(x=x.slice().reverse()),P=V.PolygonGeometryLibrary.computeWallGeometry(x,e,a,o,l),u.walls.push(new E.GeometryInstance({geometry:P}))}return u}(a,y[m],r,p[m],n,s,l,t,u);s&&l?(_=v.topAndBottom,b.geometry=V.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(_.geometry,h,f,a,n)):s?((_=v.topAndBottom).geometry.attributes.position.values=F.PolygonPipeline.scaleToGeodeticHeight(_.geometry.attributes.position.values,h,a,!n),b.geometry=_.geometry):l&&((_=v.topAndBottom).geometry.attributes.position.values=F.PolygonPipeline.scaleToGeodeticHeight(_.geometry.attributes.position.values,f,a,!0),b.geometry=_.geometry),(s||l)&&(b.wall=!1,_.geometry=L(b),d.push(_));var P=v.walls;b.wall=!0;for(var C=0;C<P.length;C++){var x=P[C];b.geometry=V.PolygonGeometryLibrary.scaleToGeodeticHeightExtruded(x.geometry,h,f,a,n),x.geometry=L(b),d.push(x)}}else for(m=0;m<y.length;m++){var w,T,I=new E.GeometryInstance({geometry:V.PolygonGeometryLibrary.createGeometryFromPositions(a,y[m],r,n,t,u)});I.geometry.attributes.position.values=F.PolygonPipeline.scaleToGeodeticHeight(I.geometry.attributes.position.values,h,a,!n),b.geometry=I.geometry,I.geometry=L(b),z.defined(e._offsetAttribute)&&(T=I.geometry.attributes.position.values.length,w=new Uint8Array(T/3),T=e._offsetAttribute===Y.GeometryOffsetAttribute.NONE?0:1,Y.arrayFill(w,T),I.geometry.attributes.applyOffset=new Q.GeometryAttribute({componentDatatype:j.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:w})),d.push(I)}c=G.GeometryPipeline.combineInstances(d)[0];c.attributes.position.values=new Float64Array(c.attributes.position.values),c.indices=O.IndexDatatype.createTypedArray(c.attributes.position.values.length/3,c.indices);g=c.attributes,o=U.BoundingSphere.fromVertices(g.position.values);return t.position||delete g.position,new Q.Geometry({attributes:g,indices:c.indices,primitiveType:c.primitiveType,boundingSphere:o,offsetAttribute:e._offsetAttribute})}}},C.createShadowVolume=function(e,t,a){var r=e._granularity,o=e._ellipsoid,t=t(r,o),a=a(r,o);return new C({polygonHierarchy:e._polygonHierarchy,ellipsoid:o,stRotation:e._stRotation,granularity:r,perPositionHeight:!1,extrudedHeight:t,height:a,vertexFormat:f.VertexFormat.POSITION_ONLY,shadowVolume:!0,arcType:e._arcType})},Object.defineProperties(C.prototype,{rectangle:{get:function(){var e;return z.defined(this._rectangle)||(e=this._polygonHierarchy.positions,this._rectangle=_(e,this._ellipsoid,this._arcType,this._granularity)),this._rectangle}},textureCoordinateRotationPoints:{get:function(){return z.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(e){var t=-e._stRotation;if(0==t)return[0,0,0,1,1,0];var a=e._ellipsoid,r=e._polygonHierarchy.positions,e=e.rectangle;return Q.Geometry._textureCoordinateRotationPoints(r,t,a,e)}(this)),this._textureCoordinateRotationPoints}}}),function(e,t){return(e=z.defined(t)?C.unpack(e,t):e)._ellipsoid=W.Ellipsoid.clone(e._ellipsoid),C.createGeometry(e)}});
