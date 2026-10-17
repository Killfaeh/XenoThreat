'ProgramMode:RUN
Prog "CLEAR"
ClrText
If V=0
Then Prog "TITLE"DispsProg "CLEAR"
"MAIN MENU"
"0:NEW GAME"
"1:LOAD GAME"
"WHAT TO DO"?->A
IfEnd
If V=1
Then Prog "DISPCTRL"
ClrText
"..."DispsClrText
"RED ALERT"
"RED ALERT"DispsClrText
"HOSTILE"
"ALIENS HAVE"
"INVADED"
"THE DEDALUS"DispsClrText
"YOU MUST"
"EVACUATE"
"THE SHIP"DispsClrText
"REPEAT"DispsClrText
"YOU MUST"
"EVACUATE"
"THE SHIP"DispsClrText
3->V
IfEnd
If V=2
Then Prog "LOADSCRN"
"TO LOAD"?->A
Prog "LOADDATA"
3->V
IfEnd
0->M
Lbl 1:If V=3
Then Prog "BUILDCOR"DispsProg "CLEAR"
If Q>0
Then If Q<>4
Then 1->M
Goto 1
IfEnd
Else "WHAT TO DO"?->A
Prog "EXECMOVE"
IfEnd
IfEnd
If V=4
Then Prog "MAPSCRN"Disps3->V
IfEnd
If V=5
Then Prog "CLEAR"
Prog "LOADSCRN"
"TO SAVE"?->A
Prog "SAVEDATA"
3->V
IfEnd
If V=6
Then " "
" "
"  GAME OVER"Disps" "
IfEnd
If V=7
Then " "
" "
" ALIEN DEAD"Disps" "
IfEnd
If V=8
Then "YOUR ATTACK"
"FAILED"Disps" "
IfEnd
If V=9
Then "YOUR ESCAPE"
"FAILED"Disps" "
IfEnd
If V=10
Then "YOUR ESCAPE"
"SUCCEDED"Disps" "
IfEnd
If V=11
Then "YOU ESCAPED"
"FROM THE"
"DEDALUS"DispsClrText
"YOU LAUNCH"
"INTO THE"
"STARS"DispsClrText
"LEAVING"
"THE HORROR"
"BEHIND"DispsProg "CLEAR"
Prog "CAPS"
IfEnd
If V=12
Then Prog "CLEAR"
"STATS"
"HEALTH"
0+List 5[4Disps
Prog "CLEAR"
"BULLETS"
0+List 5[5DispsProg "CLEAR"
"KEYS"
0+List 5[3Disps" "
3->V
IfEnd
If V=13
Then Prog "DISPCTRL"
IfEnd