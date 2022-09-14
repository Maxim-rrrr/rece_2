function VEK(ax,ay,bx,by)//векторное произведение
{
	return ax*by-bx*ay;
}

export function cross(p1,p2,p3,p4) //проверка пересечения
{
	var v1,v2,v3,v4;
 
	v1=VEK(p4[0] - p3[0], p4[1] - p3[1], p1[0] - p3[0], p1[1] - p3[1]);
	v2=VEK(p4[0] - p3[0], p4[1] - p3[1], p2[0] - p3[0], p2[1] - p3[1]);
	v3=VEK(p2[0] - p1[0], p2[1] - p1[1], p3[0] - p1[0], p3[1] - p1[1]);
	v4=VEK(p2[0] - p1[0], p2[1] - p1[1], p4[0] - p1[0], p4[1] - p1[1]);
	if(v1*v2<0 && v3*v4<0) return true;
	else return false;
}

