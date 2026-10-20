'ProgramMode:RUN
1->O
1->P
If R=1
Then 23->C
IfEnd
If R=2
Then 14->C
IfEnd
If R=3
Then 28->C
IfEnd
If R=4
Then 32->C
IfEnd
Prog "DRAWCHAR"
If R=1
Then F-Line 9,3,15,3
F-Line 10,4,14,4
F-Line 11,5,13,5
PlotOn 12,6
IfEnd
If R=2
Then F-Line 9,2,9,8
F-Line 10,3,10,7
F-Line 11,4,11,6
PlotOn 12,5
IfEnd
If R=3
Then F-Line 9,6,15,6
F-Line 10,5,14,5
F-Line 11,4,13,4
PlotOn 12,3
IfEnd
If R=4
Then F-Line 12,2,12,8
F-Line 11,3,11,7
F-Line 10,4,10,6
PlotOn 9,5
IfEnd
Prog "DISPMSG"