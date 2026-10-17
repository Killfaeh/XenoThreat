'ProgramMode:RUN
If E=1
Then 0->O
0->P
IfEnd
For 1->I To Dim List 1 Step 1
Int (List 1[I](10)-2)->J
Int (List 2[I](10)-2)->K
If J=0
Then List 1[I->J
J+J(10)2->List 1[I
IfEnd
If K=0
Then List 2[I->K
K+K(10)2->List 2[I
IfEnd
If E=1
Then F-Line 80-J,K+P,80-List 1[I]+J(10)2,List 2[I]-K(10)2+P
Else F-Line J+O,K+P,List 1[I]-J(10)2+O,List 2[I]-K(10)2+P
IfEnd
Next
0->E