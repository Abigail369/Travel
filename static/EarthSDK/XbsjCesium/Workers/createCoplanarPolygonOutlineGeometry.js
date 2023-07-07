define(["./arrayRemoveDuplicates-db90b85c","./Transforms-251ff661","./Cartesian2-697a9954","./Check-f3fec9b0","./ComponentDatatype-417761a2","./CoplanarPolygonGeometryLibrary-6ea2bc18","./when-54335d57","./GeometryAttribute-7ca1c9e4","./GeometryAttributes-caa08d6c","./GeometryInstance-1bb3fb4a","./GeometryPipeline-1dd54e44","./IndexDatatype-c134ea39","./PolygonGeometryLibrary-e3208a07","./Math-737a2579","./RuntimeError-88a32665","./WebGLConstants-4739ce15","./OrientedBoundingBox-d1fd9cf8","./EllipsoidTangentPlane-ae33ec6a","./AxisAlignedBoundingBox-dcfdb7a9","./IntersectionTests-3e34a0aa","./Plane-d4cb7bb3","./AttributeCompression-ab5c33b7","./EncodedCartesian3-0ae9fe5e","./ArcType-2b58731c","./EllipsoidRhumbLine-e5c51fa7","./PolygonPipeline-1048742e"],function(i,y,c,e,l,p,o,s,u,d,m,g,b,t,n,r,a,f,h,P,G,v,L,C,T,E){"use strict";function k(e){e=(e=o.defaultValue(e,o.defaultValue.EMPTY_OBJECT)).polygonHierarchy;this._polygonHierarchy=e,this._workerName="createCoplanarPolygonOutlineGeometry",this.packedLength=b.PolygonGeometryLibrary.computeHierarchyPackedLength(e)+1}k.fromPositions=function(e){return new k({polygonHierarchy:{positions:(e=o.defaultValue(e,o.defaultValue.EMPTY_OBJECT)).positions}})},k.pack=function(e,t,n){return n=o.defaultValue(n,0),t[n=b.PolygonGeometryLibrary.packPolygonHierarchy(e._polygonHierarchy,t,n)]=e.packedLength,t};var A={polygonHierarchy:{}};return k.unpack=function(e,t,n){t=o.defaultValue(t,0);var r=b.PolygonGeometryLibrary.unpackPolygonHierarchy(e,t);t=r.startingIndex,delete r.startingIndex;t=e[t];return(n=!o.defined(n)?new k(A):n)._polygonHierarchy=r,n.packedLength=t,n},k.createGeometry=function(e){var t=e._polygonHierarchy,e=t.positions,e=i.arrayRemoveDuplicates(e,c.Cartesian3.equalsEpsilon,!0);if(!(e.length<3)&&p.CoplanarPolygonGeometryLibrary.validOutline(e)){var n=b.PolygonGeometryLibrary.polygonOutlinesFromHierarchy(t,!1);if(0!==n.length){for(var r=[],o=0;o<n.length;o++){var a=new d.GeometryInstance({geometry:function(e){for(var t=e.length,n=new Float64Array(3*t),r=g.IndexDatatype.createTypedArray(t,2*t),o=0,a=0,i=0;i<t;i++){var y=e[i];n[o++]=y.x,n[o++]=y.y,n[o++]=y.z,r[a++]=i,r[a++]=(i+1)%t}var c=new u.GeometryAttributes({position:new s.GeometryAttribute({componentDatatype:l.ComponentDatatype.DOUBLE,componentsPerAttribute:3,values:n})});return new s.Geometry({attributes:c,indices:r,primitiveType:s.PrimitiveType.LINES})}(n[o])});r.push(a)}e=m.GeometryPipeline.combineInstances(r)[0],t=y.BoundingSphere.fromPoints(t.positions);return new s.Geometry({attributes:e.attributes,indices:e.indices,primitiveType:e.primitiveType,boundingSphere:t})}}},function(e,t){return(e=o.defined(t)?k.unpack(e,t):e)._ellipsoid=c.Ellipsoid.clone(e._ellipsoid),k.createGeometry(e)}});
