define(["./when-54335d57","./Cartesian2-697a9954","./GeometryOffsetAttribute-6e5d8e16","./Transforms-251ff661","./ComponentDatatype-417761a2","./Check-f3fec9b0","./GeometryAttribute-7ca1c9e4","./GeometryAttributes-caa08d6c","./IndexDatatype-c134ea39","./Math-737a2579","./PolygonPipeline-1048742e","./RectangleGeometryLibrary-d5132530","./RuntimeError-88a32665","./WebGLConstants-4739ce15","./EllipsoidRhumbLine-e5c51fa7"],function(p,s,c,d,b,e,_,v,E,g,f,A,t,i,a){"use strict";var h=new d.BoundingSphere,y=new d.BoundingSphere,G=new s.Cartesian3,m=new s.Rectangle;function R(e,t){var i=e._ellipsoid,a=t.height,r=t.width,n=t.northCap,o=t.southCap,l=a,u=2,s=0,e=4;n&&(--u,--l,s+=1,e-=2),o&&(--u,--l,s+=1,e-=2),s+=u*r+2*l-e;var p,c=new Float64Array(3*s),d=0,g=0,f=G;if(n)A.RectangleGeometryLibrary.computePosition(t,i,!1,g,0,f),c[d++]=f.x,c[d++]=f.y,c[d++]=f.z;else for(p=0;p<r;p++)A.RectangleGeometryLibrary.computePosition(t,i,!1,g,p,f),c[d++]=f.x,c[d++]=f.y,c[d++]=f.z;for(p=r-1,g=1;g<a;g++)A.RectangleGeometryLibrary.computePosition(t,i,!1,g,p,f),c[d++]=f.x,c[d++]=f.y,c[d++]=f.z;if(g=a-1,!o)for(p=r-2;0<=p;p--)A.RectangleGeometryLibrary.computePosition(t,i,!1,g,p,f),c[d++]=f.x,c[d++]=f.y,c[d++]=f.z;for(p=0,g=a-2;0<g;g--)A.RectangleGeometryLibrary.computePosition(t,i,!1,g,p,f),c[d++]=f.x,c[d++]=f.y,c[d++]=f.z;for(var o=c.length/3*2,h=E.IndexDatatype.createTypedArray(c.length/3,o),y=0,m=0;m<c.length/3-1;m++)h[y++]=m,h[y++]=m+1;h[y++]=c.length/3-1,h[y++]=0;o=new _.Geometry({attributes:new v.GeometryAttributes,primitiveType:_.PrimitiveType.LINES});return o.attributes.position=new _.GeometryAttribute({componentDatatype:b.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:c}),o.indices=h,o}function P(e){var t=(e=p.defaultValue(e,p.defaultValue.EMPTY_OBJECT)).rectangle,i=p.defaultValue(e.granularity,g.CesiumMath.RADIANS_PER_DEGREE),a=p.defaultValue(e.ellipsoid,s.Ellipsoid.WGS84),r=p.defaultValue(e.rotation,0),n=p.defaultValue(e.height,0),o=p.defaultValue(e.extrudedHeight,n);this._rectangle=s.Rectangle.clone(t),this._granularity=i,this._ellipsoid=a,this._surfaceHeight=Math.max(n,o),this._rotation=r,this._extrudedHeight=Math.min(n,o),this._offsetAttribute=e.offsetAttribute,this._workerName="createRectangleOutlineGeometry"}P.packedLength=s.Rectangle.packedLength+s.Ellipsoid.packedLength+5,P.pack=function(e,t,i){return i=p.defaultValue(i,0),s.Rectangle.pack(e._rectangle,t,i),i+=s.Rectangle.packedLength,s.Ellipsoid.pack(e._ellipsoid,t,i),i+=s.Ellipsoid.packedLength,t[i++]=e._granularity,t[i++]=e._surfaceHeight,t[i++]=e._rotation,t[i++]=e._extrudedHeight,t[i]=p.defaultValue(e._offsetAttribute,-1),t};var w=new s.Rectangle,L=s.Ellipsoid.clone(s.Ellipsoid.UNIT_SPHERE),C={rectangle:w,ellipsoid:L,granularity:void 0,height:void 0,rotation:void 0,extrudedHeight:void 0,offsetAttribute:void 0};P.unpack=function(e,t,i){t=p.defaultValue(t,0);var a=s.Rectangle.unpack(e,t,w);t+=s.Rectangle.packedLength;var r=s.Ellipsoid.unpack(e,t,L);t+=s.Ellipsoid.packedLength;var n=e[t++],o=e[t++],l=e[t++],u=e[t++],t=e[t];return p.defined(i)?(i._rectangle=s.Rectangle.clone(a,i._rectangle),i._ellipsoid=s.Ellipsoid.clone(r,i._ellipsoid),i._surfaceHeight=o,i._rotation=l,i._extrudedHeight=u,i._offsetAttribute=-1===t?void 0:t,i):(C.granularity=n,C.height=o,C.rotation=l,C.extrudedHeight=u,C.offsetAttribute=-1===t?void 0:t,new P(C))};var D=new s.Cartographic;return P.createGeometry=function(e){var t=e._rectangle,i=e._ellipsoid,a=A.RectangleGeometryLibrary.computeOptions(t,e._granularity,e._rotation,0,m,D);if(!g.CesiumMath.equalsEpsilon(t.north,t.south,g.CesiumMath.EPSILON10)&&!g.CesiumMath.equalsEpsilon(t.east,t.west,g.CesiumMath.EPSILON10)){var r,n,o,l,u=e._surfaceHeight,s=e._extrudedHeight;return u=!g.CesiumMath.equalsEpsilon(u,s,0,g.CesiumMath.EPSILON2)?(n=function(e,t){var i=e._surfaceHeight,a=e._extrudedHeight,r=e._ellipsoid,n=a,o=i,l=R(e,t),a=t.height,i=t.width,u=(e=f.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,o,r,!1)).length;(o=new Float64Array(2*u)).set(e),n=f.PolygonPipeline.scaleToGeodeticHeight(l.attributes.position.values,n,r),o.set(n,u),l.attributes.position.values=o,r=t.northCap,n=t.southCap,t=4,r&&--t,n&&--t;for(var t=2*(o.length/3+t),s=E.IndexDatatype.createTypedArray(o.length/3,t),u=o.length/6,p=0,c=0;c<u-1;c++)s[p++]=c,s[p++]=c+1,s[p++]=c+u,s[p++]=c+u+1;return s[p++]=u-1,s[p++]=0,s[p++]=u+u-1,s[p++]=u,s[p++]=0,s[p++]=u,a=r?a-1:(s[p++]=r=i-1,s[p++]=r+u,i+a-2),s[p++]=a,s[p++]=a+u,n||(s[p++]=a=i+a-1,s[p]=a+u),l.indices=s,l}(e,a),p.defined(e._offsetAttribute)&&(r=n.attributes.position.values.length/3,o=new Uint8Array(r),o=e._offsetAttribute===c.GeometryOffsetAttribute.TOP?c.arrayFill(o,1,0,r/2):(l=e._offsetAttribute===c.GeometryOffsetAttribute.NONE?0:1,c.arrayFill(o,l)),n.attributes.applyOffset=new _.GeometryAttribute({componentDatatype:b.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:o})),o=d.BoundingSphere.fromRectangle3D(t,i,u,y),s=d.BoundingSphere.fromRectangle3D(t,i,s,h),d.BoundingSphere.union(o,s)):((n=R(e,a)).attributes.position.values=f.PolygonPipeline.scaleToGeodeticHeight(n.attributes.position.values,u,i,!1),p.defined(e._offsetAttribute)&&(a=n.attributes.position.values.length,a=new Uint8Array(a/3),l=e._offsetAttribute===c.GeometryOffsetAttribute.NONE?0:1,c.arrayFill(a,l),n.attributes.applyOffset=new _.GeometryAttribute({componentDatatype:b.ComponentDatatype.UNSIGNED_BYTE,componentsPerAttribute:1,values:a})),d.BoundingSphere.fromRectangle3D(t,i,u)),new _.Geometry({attributes:n.attributes,indices:n.indices,primitiveType:_.PrimitiveType.LINES,boundingSphere:u,offsetAttribute:e._offsetAttribute})}},function(e,t){return(e=p.defined(t)?P.unpack(e,t):e)._ellipsoid=s.Ellipsoid.clone(e._ellipsoid),e._rectangle=s.Rectangle.clone(e._rectangle),P.createGeometry(e)}});
