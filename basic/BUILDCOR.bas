'ProgramMode:RUN
Prog "GETTILE"
List 5[11->Q
If Q>4
Then Goto 0
IfEnd
0->U
Prog "COR"
List 5[2->R
R+4->I
If I<6
Then 9->I
IfEnd
List 5[I->Q
If Q=0
Then 1->U
Else 4->U
IfEnd
Prog "COR"
R+6->I
If I>9
Then 6->I
IfEnd
List 5[I->Q
If Q=0
Then 2->U
Else 5->U
IfEnd
Prog "COR"
List 5[5+R->Q
If Q=0
Then 3->U
Else List 5[10->T
If T=0
Then 6->U
Else If R=1
Then 9->U
Else 6->U
IfEnd
IfEnd
IfEnd
Prog "COR"
If M=0
Then List 5[11->Q
If Q>0
Then If Q<3
Then Prog "EMPTY"
IfEnd
If Q=1
Then 10->U
1+List 5[3->List 5[3
List 5[3->Z
If Z>9
Then 9->List 5[3
IfEnd
IfEnd
If Q=2
Then 11->U
10+List 5[5->List 5[5
List 5[5->Z
If Z>99
Then 99->List 5[5
IfEnd
IfEnd
If Q=3
Then 12->U
List 5[4->Z
If Z>=99
Then 99->List 5[4
Else Z+30->List 5[4
Prog "EMPTY"
List 5[4->Z
If Z>99
Then 99->List 5[4
IfEnd
IfEnd
IfEnd
If Q<4
Then Prog "COR"
IfEnd
IfEnd
Else 0->Q
IfEnd
If R=1
Then If Q=4
Then 8->U
Prog "COR"
0->Q
IfEnd
IfEnd
Prog "ORIENT"
Lbl 0:If Q>4
Then Prog "FIGHT"
5->Q
3->V
IfEnd