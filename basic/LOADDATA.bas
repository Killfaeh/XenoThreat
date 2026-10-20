'ProgramMode:RUN
If A>0
Then If A<9
Then List 6[2A-1->Q
List 6[2A->R
IfEnd
IfEnd
If Q>0
Then Int (.01Q)->List 5[1
Int (.1Q)-10*List 5[1->List 5[2
Q-List 5[1](10)2-10*List 5[2->List 5[3
Int (R(10)-3)->List 5[4
Int (.1R)-List 5[4](10)2->List 5[5
R-List 5[5](10)1-List 5[4](10)3->List 5[12
List 5[12->W
Prog "INITMAP"
IfEnd