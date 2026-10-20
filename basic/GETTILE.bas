'ProgramMode:RUN
List 5[1->Q
If Q>Dim List 3
Then "INDEX ERROR"
Q+0DispsIfEnd
Int (List 3[Q](10)-3)-Int (List 3[Q](10)-6)(10)3->List 5[9
List 3[Q]-Int (List 3[Q](10)-3)(10)3->List 5[7
Int (List 4[Q](10)-7)->List 5[8
Int (List 4[Q](10)-4)-List 5[8](10)3->List 5[6
Int (List 4[Q](10)-3)-List 5[6](10)1-List 5[8](10)4->List 5[10
Int (List 4[Q](10)-2)-List 5[8](10)5-List 5[6](10)2-List 5[10](10)1->List 5[13
List 4[Q]-List 5[13](10)2-List 5[10](10)3-List 5[6](10)4-List 5[8](10)7->List 5[11
List 5[9->Q
If Q>0
Then List 5[9]-1->List 5[9
IfEnd
List 5[7->Q
If Q>0
Then List 5[7]-1->List 5[7
IfEnd
List 5[8->Q
If Q>0
Then List 5[8]-1->List 5[8
IfEnd
List 5[6->Q
If Q>0
Then List 5[6]-1->List 5[6
IfEnd