'ProgramMode:RUN
List 5[2->R
If A=7
Then R-1->R
IfEnd
If A=9
Then R+1->R
IfEnd
If R<=0
Then 4->R
IfEnd
If R>4
Then 1->R
IfEnd
R->List 5[2
List 5[11->K
If A=8
Then List 5[1->B
If K=4
Then If R=1
Then 0->L
11->V
Prog "VIEWS"
Goto 0
IfEnd
IfEnd
List 5[5+R->X
If X>0
Then List 5[3->Y
If R=1
Then List 5[10->T
Else 0->T
IfEnd
If Y>=T
Then If R=1
Then Y-T->List 5[3
Prog "EMPTY"
If X>B
Then List 5[13->W
W-1->W
Prog "INITMAP"
W->List 5[12
IfEnd
IfEnd
If R=3
Then If X<B
Then List 5[13->W
W+1->W
Prog "INITMAP"
W->List 5[12
IfEnd
IfEnd
X->List 5[1
IfEnd
IfEnd
IfEnd
If A=5
Then 4->V
IfEnd
If A=2
Then 12->V
IfEnd
If A=3
Then 5->V
IfEnd
If A=1
Then 2->V
IfEnd
If A=6
Then 13->V
IfEnd
Lbl 0:0+0