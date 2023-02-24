// [
//   {
//     x: 1,
//     y: 2
//   },
//   {
//     x: 1,
//     y: 1
//   },
//   {
//     x: 2,
//     y: 2
//   },
//   {
//     x: 2,
//     y: 1
//   },
// ]

export function cross(points1) {
	var A,B,C;
	var pointxx,pointyy

	function VEK(ax,ay,bx,by)//векторное произведение
	{
		return ax*by-bx*ay;
	}
	 
	function CrossingCheck(p1,p2,p3,p4) //проверка пересечения
	{
		var v1,v2,v3,v4;
	 
		v1=VEK(p4.x - p3.x, p4.y - p3.y, p1.x - p3.x, p1.y - p3.y);
		v2=VEK(p4.x - p3.x, p4.y - p3.y, p2.x - p3.x, p2.y - p3.y);
		v3=VEK(p2.x - p1.x, p2.y - p1.y, p3.x - p1.x, p3.y - p1.y);
		v4=VEK(p2.x - p1.x, p2.y - p1.y, p4.x - p1.x, p4.y - p1.y);
		if(v1*v2<0 && v3*v4<0) return true;
		else return false;
	}
	 
	 function EquationOfTheLine(p1,p2) //построение уравнения прямой Ax+By+C
	 {
		// var A,B,C;
		  A=p2.y-p1.y;                                            
		  B=p1.x-p2.x;
		  C=-p1.x*(p2.y-p1.y)+p1.y*(p2.x-p1.x);
	 
	 }
	 
	 function IntersectionX(a1,b1,c1,a2,b2,c2)// поиск точки пересечения по Х
	 {
		 var d,dx,pointx;
		 d=a1*b2-b1*a2;
		 dx=-c1*b2+b1*c2;
		 pointx=dx/d;
		 return pointx;
	 }
	 
	 function IntersectionY(a1,b1,c1,a2,b2,c2) //поиск точки пересечения по Y
	 {
		 var d,dy,pointy;
		 d=a1*b2-b1*a2;
		 dy=-a1*c2+c1*a2;
		 pointy=dy/d;
		 return pointy;
	 }
	// проверка отрезков на пересечение
	 function TempCheck() {
		if(CrossingCheck(points1[0],points1[1],points1[2],points1[3])) {
			var a1,b1,c1,a2,b2,c2;
			EquationOfTheLine(points1[0],points1[1]);
			a1=A;b1=B;c1=C;
			EquationOfTheLine(points1[2],points1[3]);
			a2=A;b2=B;c2=C;
			pointxx=IntersectionX(a1,b1,c1,a2,b2,c2);
			pointyy=IntersectionY(a1,b1,c1,a2,b2,c2);
			return {x: pointxx, y: pointyy}
		} 
		return false
	}

	return TempCheck()
}

// {x: num, y num}, {x: num, y num}
export function distancePoints(point1, point2) {
	return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2))
}