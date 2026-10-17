'ProgramMode:RUN
For 1->Z To D Step 1
2Z-2D->X
Int (W(10)X)->C
W-Int (C(10)-X)->W
If C>0
Then Prog "DRAWCHAR"
IfEnd
O+6->O
Next