'ProgramMode:RUN
" "
"  INIT GAME"
ClrText
ClrGraph
0->A~R
0->T~Z
{0->List 1
{0->List 2
{0->List 3
{0->List 4
{0->List 5
Seq(0,X,1,13,1->List 5
If S=0
Then 1->S
Seq(0,X,1,16,1->List 6
IfEnd
6->W
Prog "INITMAP"
Dim List 3->List 5[1
1->List 5[2
0->List 5[3
99->List 5[4
30->List 5[5
6->List 5[12
S-WindMan
S-Gph1 DrawOn,Scatter,List 1,List 2,1,Dot
S-Gph2 DrawOff
S-Gph3 DrawOff