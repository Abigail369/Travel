define(["exports","./GeometryOffsetAttribute-6e5d8e16","./Transforms-251ff661","./Cartesian2-697a9954","./Check-f3fec9b0","./ComponentDatatype-417761a2","./when-54335d57","./EllipseGeometryLibrary-0f7e8266","./GeometryAttribute-7ca1c9e4","./GeometryAttributes-caa08d6c","./GeometryInstance-1bb3fb4a","./GeometryPipeline-1dd54e44","./IndexDatatype-c134ea39","./Math-737a2579","./VertexFormat-acf45ede"],function(t,L,R,j,e,k,z,B,Y,H,m,p,y,c,d){"use strict";var U=new j.Cartesian3,Q=new j.Cartesian3,W=new j.Cartesian3,S=new j.Cartesian3,J=new j.Cartesian2,q=new R.Matrix3,Z=new R.Matrix3,K=new R.Quaternion,X=new j.Cartesian3,$=new j.Cartesian3,tt=new j.Cartesian3,et=new j.Cartographic,rt=new j.Cartesian3,at=new j.Cartesian2,it=new j.Cartesian2;function f(t,e,r){var a=e.vertexFormat,i=e.center,n=e.semiMajorAxis,o=e.semiMinorAxis,s=e.ellipsoid,u=e.stRotation,l=r?t.length/3*2:t.length/3,m=e.shadowVolume,p=a.st?new Float32Array(2*l):void 0,y=a.normal?new Float32Array(3*l):void 0,c=a.tangent?new Float32Array(3*l):void 0,d=a.bitangent?new Float32Array(3*l):void 0,f=m?new Float32Array(3*l):void 0,A=0,h=X,x=$,g=tt,_=new R.GeographicProjection(s),b=_.project(s.cartesianToCartographic(i,et),rt),i=s.scaleToGeodeticSurface(i,U);s.geodeticSurfaceNormal(i,i);var C=q,v=Z;v=0!==u?(S=R.Quaternion.fromAxisAngle(i,u,K),C=R.Matrix3.fromQuaternion(S,C),S=R.Quaternion.fromAxisAngle(i,-u,K),R.Matrix3.fromQuaternion(S,v)):(C=R.Matrix3.clone(R.Matrix3.IDENTITY,C),R.Matrix3.clone(R.Matrix3.IDENTITY,v));for(var w=j.Cartesian2.fromElements(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,at),M=j.Cartesian2.fromElements(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,it),E=t.length,I=r?E:0,T=I/3*2,G=0;G<E;G+=3){var N,P=G+1,F=G+2,V=j.Cartesian3.fromArray(t,G,U);a.st&&(N=R.Matrix3.multiplyByVector(C,V,Q),N=_.project(s.cartesianToCartographic(N,et),W),j.Cartesian3.subtract(N,b,N),J.x=(N.x+n)/(2*n),J.y=(N.y+o)/(2*o),w.x=Math.min(J.x,w.x),w.y=Math.min(J.y,w.y),M.x=Math.max(J.x,M.x),M.y=Math.max(J.y,M.y),r&&(p[A+T]=J.x,p[A+1+T]=J.y),p[A++]=J.x,p[A++]=J.y),(a.normal||a.tangent||a.bitangent||m)&&(h=s.geodeticSurfaceNormal(V,h),m&&(f[G+I]=-h.x,f[P+I]=-h.y,f[F+I]=-h.z),(a.normal||a.tangent||a.bitangent)&&((a.tangent||a.bitangent)&&(x=j.Cartesian3.normalize(j.Cartesian3.cross(j.Cartesian3.UNIT_Z,h,x),x),R.Matrix3.multiplyByVector(v,x,x)),a.normal&&(y[G]=h.x,y[P]=h.y,y[F]=h.z,r&&(y[G+I]=-h.x,y[P+I]=-h.y,y[F+I]=-h.z)),a.tangent&&(c[G]=x.x,c[P]=x.y,c[F]=x.z,r&&(c[G+I]=-x.x,c[P+I]=-x.y,c[F+I]=-x.z)),a.bitangent&&(g=j.Cartesian3.normalize(j.Cartesian3.cross(h,x,g),g),d[G]=g.x,d[P]=g.y,d[F]=g.z,r&&(d[G+I]=g.x,d[P+I]=g.y,d[F+I]=g.z))))}if(a.st)for(var E=p.length,D=0;D<E;D+=2)p[D]=(p[D]-w.x)/(M.x-w.x),p[D+1]=(p[D+1]-w.y)/(M.y-w.y);var O,S=new H.GeometryAttributes;return a.position&&(O=B.EllipseGeometryLibrary.raisePositionsToHeight(t,e,r),S.position=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:O})),a.st&&(S.st=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:p})),a.normal&&(S.normal=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:y})),a.tangent&&(S.tangent=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:c})),a.bitangent&&(S.bitangent=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:d})),m&&(S.extrudeDirection=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:f})),r&&z.defined(e.offsetAttribute)&&(O=new Uint8Array(l),O=e.offsetAttribute===L.GeometryOffsetAttribute.TOP?L.arrayFill(O,1,0,l/2):(e=e.offsetAttribute===L.GeometryOffsetAttribute.NONE?0:1,L.arrayFill(O,e)),S.applyOffset=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:O})),S}function A(t){for(var e,r,a=new Array(t*(t+1)*12-6),i=0,n=0,o=1,s=0;s<3;s++)a[i++]=o++,a[i++]=n,a[i++]=o;for(s=2;s<t+1;++s){for(o=s*(s+1)-1,n=(s-1)*s-1,a[i++]=o++,a[i++]=n,a[i++]=o,e=2*s,r=0;r<e-1;++r)a[i++]=o,a[i++]=n++,a[i++]=n,a[i++]=o++,a[i++]=n,a[i++]=o;a[i++]=o++,a[i++]=n,a[i++]=o}for(e=2*t,++o,++n,s=0;s<e-1;++s)a[i++]=o,a[i++]=n++,a[i++]=n,a[i++]=o++,a[i++]=n,a[i++]=o;for(a[i++]=o,a[i++]=n++,a[i++]=n,a[i++]=o++,a[i++]=n++,a[i++]=n,++n,s=t-1;1<s;--s){for(a[i++]=n++,a[i++]=n,a[i++]=o,e=2*s,r=0;r<e-1;++r)a[i++]=o,a[i++]=n++,a[i++]=n,a[i++]=o++,a[i++]=n,a[i++]=o;a[i++]=n++,a[i++]=n++,a[i++]=o++}for(s=0;s<3;s++)a[i++]=n++,a[i++]=n,a[i++]=o;return a}var n=new j.Cartesian3;var h=new R.BoundingSphere,x=new R.BoundingSphere;function o(t){var e=t.center,r=t.ellipsoid,a=t.semiMajorAxis,i=j.Cartesian3.multiplyByScalar(r.geodeticSurfaceNormal(e,U),t.height,U);h.center=j.Cartesian3.add(e,i,h.center),h.radius=a,i=j.Cartesian3.multiplyByScalar(r.geodeticSurfaceNormal(e,i),t.extrudedHeight,i),x.center=j.Cartesian3.add(e,i,x.center),x.radius=a;var n=B.EllipseGeometryLibrary.computeEllipsePositions(t,!0,!0),r=n.positions,e=n.numPts,i=n.outerPositions,a=R.BoundingSphere.union(h,x),n=f(r,t,!0),o=(l=A(e)).length;l.length=2*o;for(var s=r.length/3,u=0;u<o;u+=3)l[u+o]=l[u+2]+s,l[u+1+o]=l[u+1]+s,l[u+2+o]=l[u]+s;var r=y.IndexDatatype.createTypedArray(2*s/3,l),r=new Y.Geometry({attributes:n,indices:r,primitiveType:Y.PrimitiveType.TRIANGLES}),t=function(t,e){var r=e.vertexFormat,a=e.center,i=e.semiMajorAxis,n=e.semiMinorAxis,o=e.ellipsoid,s=e.height,u=e.extrudedHeight,l=e.stRotation,m=t.length/3*2,p=new Float64Array(3*m),y=r.st?new Float32Array(2*m):void 0,c=r.normal?new Float32Array(3*m):void 0,d=r.tangent?new Float32Array(3*m):void 0,f=r.bitangent?new Float32Array(3*m):void 0,A=e.shadowVolume,h=A?new Float32Array(3*m):void 0,x=0,g=X,_=$,b=tt,C=new R.GeographicProjection(o),v=C.project(o.cartesianToCartographic(a,et),rt),a=o.scaleToGeodeticSurface(a,U);o.geodeticSurfaceNormal(a,a);for(var a=R.Quaternion.fromAxisAngle(a,l,K),w=R.Matrix3.fromQuaternion(a,q),M=j.Cartesian2.fromElements(Number.POSITIVE_INFINITY,Number.POSITIVE_INFINITY,at),E=j.Cartesian2.fromElements(Number.NEGATIVE_INFINITY,Number.NEGATIVE_INFINITY,it),I=(D=t.length)/3*2,T=0;T<D;T+=3){var G=T+1,N=T+2,P=j.Cartesian3.fromArray(t,T,U);r.st&&(V=R.Matrix3.multiplyByVector(w,P,Q),F=C.project(o.cartesianToCartographic(V,et),W),j.Cartesian3.subtract(F,v,F),J.x=(F.x+i)/(2*i),J.y=(F.y+n)/(2*n),M.x=Math.min(J.x,M.x),M.y=Math.min(J.y,M.y),E.x=Math.max(J.x,E.x),E.y=Math.max(J.y,E.y),y[x+I]=J.x,y[x+1+I]=J.y,y[x++]=J.x,y[x++]=J.y),P=o.scaleToGeodeticSurface(P,P),V=j.Cartesian3.clone(P,Q),g=o.geodeticSurfaceNormal(P,g),A&&(h[T+D]=-g.x,h[G+D]=-g.y,h[N+D]=-g.z);var F=j.Cartesian3.multiplyByScalar(g,s,S),P=j.Cartesian3.add(P,F,P),F=j.Cartesian3.multiplyByScalar(g,u,F),V=j.Cartesian3.add(V,F,V);r.position&&(p[T+D]=V.x,p[G+D]=V.y,p[N+D]=V.z,p[T]=P.x,p[G]=P.y,p[N]=P.z),(r.normal||r.tangent||r.bitangent)&&(b=j.Cartesian3.clone(g,b),F=j.Cartesian3.fromArray(t,(T+3)%D,S),j.Cartesian3.subtract(F,P,F),P=j.Cartesian3.subtract(V,P,W),g=j.Cartesian3.normalize(j.Cartesian3.cross(P,F,g),g),r.normal&&(c[T]=g.x,c[G]=g.y,c[N]=g.z,c[T+D]=g.x,c[G+D]=g.y,c[N+D]=g.z),r.tangent&&(_=j.Cartesian3.normalize(j.Cartesian3.cross(b,g,_),_),d[T]=_.x,d[G]=_.y,d[N]=_.z,d[T+D]=_.x,d[T+1+D]=_.y,d[T+2+D]=_.z),r.bitangent&&(f[T]=b.x,f[G]=b.y,f[N]=b.z,f[T+D]=b.x,f[G+D]=b.y,f[N+D]=b.z))}if(r.st)for(var D=y.length,O=0;O<D;O+=2)y[O]=(y[O]-M.x)/(E.x-M.x),y[O+1]=(y[O+1]-M.y)/(E.y-M.y);return l=new H.GeometryAttributes,r.position&&(l.position=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:p})),r.st&&(l.st=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.FLOAT,componentsPerAttribute:2,values:y})),r.normal&&(l.normal=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:c})),r.tangent&&(l.tangent=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:d})),r.bitangent&&(l.bitangent=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:f})),A&&(l.extrudeDirection=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.FLOAT,componentsPerAttribute:3,values:h})),z.defined(e.offsetAttribute)&&(a=new Uint8Array(m),a=e.offsetAttribute===L.GeometryOffsetAttribute.TOP?L.arrayFill(a,1,0,m/2):(e=e.offsetAttribute===L.GeometryOffsetAttribute.NONE?0:1,L.arrayFill(a,e)),l.applyOffset=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:a})),l}(i,t),l=function(t){for(var e=t.length/3,r=y.IndexDatatype.createTypedArray(e,6*e),a=0,i=0;i<e;i++){var n=i,o=i+e,s=(n+1)%e,u=s+e;r[a++]=n,r[a++]=o,r[a++]=s,r[a++]=s,r[a++]=o,r[a++]=u}return r}(i),i=y.IndexDatatype.createTypedArray(2*i.length/3,l),i=new Y.Geometry({attributes:t,indices:i,primitiveType:Y.PrimitiveType.TRIANGLES}),i=p.GeometryPipeline.combineInstances([new m.GeometryInstance({geometry:r}),new m.GeometryInstance({geometry:i})]);return{boundingSphere:a,attributes:i[0].attributes,indices:i[0].indices}}function s(t,e,r,a,i,n,o){for(var s=B.EllipseGeometryLibrary.computeEllipsePositions({center:t,semiMajorAxis:e,semiMinorAxis:r,rotation:a,granularity:i},!1,!0).outerPositions,u=s.length/3,l=new Array(u),m=0;m<u;++m)l[m]=j.Cartesian3.fromArray(s,3*m);o=j.Rectangle.fromCartesianArray(l,n,o);return o.width>c.CesiumMath.PI&&(o.north=0<o.north?c.CesiumMath.PI_OVER_TWO-c.CesiumMath.EPSILON7:o.north,o.south=o.south<0?c.CesiumMath.EPSILON7-c.CesiumMath.PI_OVER_TWO:o.south,o.east=c.CesiumMath.PI,o.west=-c.CesiumMath.PI),o}function g(t){var e=(t=z.defaultValue(t,z.defaultValue.EMPTY_OBJECT)).center,r=z.defaultValue(t.ellipsoid,j.Ellipsoid.WGS84),a=t.semiMajorAxis,i=t.semiMinorAxis,n=z.defaultValue(t.granularity,c.CesiumMath.RADIANS_PER_DEGREE),o=z.defaultValue(t.vertexFormat,d.VertexFormat.DEFAULT),s=z.defaultValue(t.height,0),u=z.defaultValue(t.extrudedHeight,s);this._center=j.Cartesian3.clone(e),this._semiMajorAxis=a,this._semiMinorAxis=i,this._ellipsoid=j.Ellipsoid.clone(r),this._rotation=z.defaultValue(t.rotation,0),this._stRotation=z.defaultValue(t.stRotation,0),this._height=Math.max(u,s),this._granularity=n,this._vertexFormat=d.VertexFormat.clone(o),this._extrudedHeight=Math.min(u,s),this._shadowVolume=z.defaultValue(t.shadowVolume,!1),this._workerName="createEllipseGeometry",this._offsetAttribute=t.offsetAttribute,this._rectangle=void 0,this._textureCoordinateRotationPoints=void 0}g.packedLength=j.Cartesian3.packedLength+j.Ellipsoid.packedLength+d.VertexFormat.packedLength+9,g.pack=function(t,e,r){return r=z.defaultValue(r,0),j.Cartesian3.pack(t._center,e,r),r+=j.Cartesian3.packedLength,j.Ellipsoid.pack(t._ellipsoid,e,r),r+=j.Ellipsoid.packedLength,d.VertexFormat.pack(t._vertexFormat,e,r),r+=d.VertexFormat.packedLength,e[r++]=t._semiMajorAxis,e[r++]=t._semiMinorAxis,e[r++]=t._rotation,e[r++]=t._stRotation,e[r++]=t._height,e[r++]=t._granularity,e[r++]=t._extrudedHeight,e[r++]=t._shadowVolume?1:0,e[r]=z.defaultValue(t._offsetAttribute,-1),e};var _=new j.Cartesian3,b=new j.Ellipsoid,C=new d.VertexFormat,v={center:_,ellipsoid:b,vertexFormat:C,semiMajorAxis:void 0,semiMinorAxis:void 0,rotation:void 0,stRotation:void 0,height:void 0,granularity:void 0,extrudedHeight:void 0,shadowVolume:void 0,offsetAttribute:void 0};g.unpack=function(t,e,r){e=z.defaultValue(e,0);var a=j.Cartesian3.unpack(t,e,_);e+=j.Cartesian3.packedLength;var i=j.Ellipsoid.unpack(t,e,b);e+=j.Ellipsoid.packedLength;var n=d.VertexFormat.unpack(t,e,C);e+=d.VertexFormat.packedLength;var o=t[e++],s=t[e++],u=t[e++],l=t[e++],m=t[e++],p=t[e++],y=t[e++],c=1===t[e++],e=t[e];return z.defined(r)?(r._center=j.Cartesian3.clone(a,r._center),r._ellipsoid=j.Ellipsoid.clone(i,r._ellipsoid),r._vertexFormat=d.VertexFormat.clone(n,r._vertexFormat),r._semiMajorAxis=o,r._semiMinorAxis=s,r._rotation=u,r._stRotation=l,r._height=m,r._granularity=p,r._extrudedHeight=y,r._shadowVolume=c,r._offsetAttribute=-1===e?void 0:e,r):(v.height=m,v.extrudedHeight=y,v.granularity=p,v.stRotation=l,v.rotation=u,v.semiMajorAxis=o,v.semiMinorAxis=s,v.shadowVolume=c,v.offsetAttribute=-1===e?void 0:e,new g(v))},g.computeRectangle=function(t,e){var r=(t=z.defaultValue(t,z.defaultValue.EMPTY_OBJECT)).center,a=z.defaultValue(t.ellipsoid,j.Ellipsoid.WGS84),i=t.semiMajorAxis,n=t.semiMinorAxis,o=z.defaultValue(t.granularity,c.CesiumMath.RADIANS_PER_DEGREE);return s(r,i,n,z.defaultValue(t.rotation,0),o,a,e)},g.createGeometry=function(t){if(!(t._semiMajorAxis<=0||t._semiMinorAxis<=0)){var e=t._height,r=t._extrudedHeight,a=!c.CesiumMath.equalsEpsilon(e,r,0,c.CesiumMath.EPSILON2);t._center=t._ellipsoid.scaleToGeodeticSurface(t._center,t._center);var i,e={center:t._center,semiMajorAxis:t._semiMajorAxis,semiMinorAxis:t._semiMinorAxis,ellipsoid:t._ellipsoid,rotation:t._rotation,height:e,granularity:t._granularity,vertexFormat:t._vertexFormat,stRotation:t._stRotation};return a?(e.extrudedHeight=r,e.shadowVolume=t._shadowVolume,e.offsetAttribute=t._offsetAttribute,i=o(e)):(i=function(t){var e=t.center;n=j.Cartesian3.multiplyByScalar(t.ellipsoid.geodeticSurfaceNormal(e,n),t.height,n),n=j.Cartesian3.add(e,n,n);var r=new R.BoundingSphere(n,t.semiMajorAxis),e=(a=B.EllipseGeometryLibrary.computeEllipsePositions(t,!0,!1)).positions,a=a.numPts,t=f(e,t,!1),a=A(a);return{boundingSphere:r,attributes:t,indices:a=y.IndexDatatype.createTypedArray(e.length/3,a)}}(e),z.defined(t._offsetAttribute)&&(r=i.attributes.position.values.length,e=new Uint8Array(r/3),r=t._offsetAttribute===L.GeometryOffsetAttribute.NONE?0:1,L.arrayFill(e,r),i.attributes.applyOffset=new Y.GeometryAttribute({componentDatatype:k.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:e}))),new Y.Geometry({attributes:i.attributes,indices:i.indices,primitiveType:Y.PrimitiveType.TRIANGLES,boundingSphere:i.boundingSphere,offsetAttribute:t._offsetAttribute})}},g.createShadowVolume=function(t,e,r){var a=t._granularity,i=t._ellipsoid,e=e(a,i),r=r(a,i);return new g({center:t._center,semiMajorAxis:t._semiMajorAxis,semiMinorAxis:t._semiMinorAxis,ellipsoid:i,rotation:t._rotation,stRotation:t._stRotation,granularity:a,extrudedHeight:e,height:r,vertexFormat:d.VertexFormat.POSITION_ONLY,shadowVolume:!0})},Object.defineProperties(g.prototype,{rectangle:{get:function(){return z.defined(this._rectangle)||(this._rectangle=s(this._center,this._semiMajorAxis,this._semiMinorAxis,this._rotation,this._granularity,this._ellipsoid)),this._rectangle}},textureCoordinateRotationPoints:{get:function(){return z.defined(this._textureCoordinateRotationPoints)||(this._textureCoordinateRotationPoints=function(t){var e=-t._stRotation;if(0==e)return[0,0,0,1,1,0];for(var r=B.EllipseGeometryLibrary.computeEllipsePositions({center:t._center,semiMajorAxis:t._semiMajorAxis,semiMinorAxis:t._semiMinorAxis,rotation:t._rotation,granularity:t._granularity},!1,!0).outerPositions,a=r.length/3,i=new Array(a),n=0;n<a;++n)i[n]=j.Cartesian3.fromArray(r,3*n);var o=t._ellipsoid,t=t.rectangle;return Y.Geometry._textureCoordinateRotationPoints(i,e,o,t)}(this)),this._textureCoordinateRotationPoints}}}),t.EllipseGeometry=g});
