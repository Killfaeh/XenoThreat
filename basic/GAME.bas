'ProgramMode:RUN
Lbl 0:Prog "INITGAME"
Prog "CLEAR"
0->V
Prog "VIEWS"
If A=0
Then 1->V
IfEnd
If A=1
Then 2->V
IfEnd
Prog "CLEAR"
Prog "VIEWS"
If A=0
Then Goto 0
IfEnd
1->L
0->A
0->G
Do
0->Q
0->R
0->H
Prog "CLEAR"
Prog "VIEWS"
LpWhile L=1
ClrGraph
Goto 0