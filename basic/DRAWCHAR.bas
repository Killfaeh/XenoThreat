'ProgramMode:RUN
If C=1
Then F-Line O+3,P+1,O+3,P+7
{2,2,4->List 1
{6,1,1->List 2
Prog "CHAR"
IfEnd
If C=2
Then {105,205,204->List 1
{1,205,7->List 2
Prog "LINE"
{1,5->List 1
{6,6->List 2
Prog "CHAR"
IfEnd
If C=3
Then {105,305,204->List 1
{7,503,1->List 2
Prog "LINE"
{1,5,4->List 1
{2,2,6->List 2
Prog "CHAR"
IfEnd
If C=4
Then {4,301,105->List 1
{701,604,3->List 2
Prog "LINE"
IfEnd
If C=5
Then {105,104,5,20->List 1
{7,5,402,1->List 2
Prog "LINE"
{1,1->List 1
{2,6->List 2
Prog "CHAR"
IfEnd
If C=6
Then {204,204,1,103->List 1
{4,1,204,507->List 2
Prog "LINE"
{4,5,5->List 1
{7,2,3->List 2
Prog "CHAR"
IfEnd
If C=7
Then {105,3,504->List 1
{7,104,605->List 2
Prog "LINE"
IfEnd
If C=8
Then {204,204,204->List 1
{1,4,7->List 2
Prog "LINE"
{1,1,1,1,5,5,5,5->List 1
{2,3,5,6,2,3,5,6->List 2
Prog "CHAR"
IfEnd
If C=13
Then {1,1,1,1,1,1,1,2,2,3,3,4,4,5,5,5->List 1
{1,2,3,4,5,6,7,1,7,1,7,2,6,3,4,5->List 2
Prog "CHAR"
IfEnd
If C=14
Then {1,1,1,1,1,1,1,2,3,4,5,2,3,4,5,2,3,4->List 1
{1,2,3,4,5,6,7,1,1,1,1,7,7,7,7,4,4,4->List 2
Prog "CHAR"
IfEnd
If C=23
Then {101,505,204->List 1
{107,107,503->List 2
Prog "LINE"
IfEnd
If C=28
Then {204,204,204->List 1
{1,4,7->List 2
Prog "LINE"
{1,1,1,5,5,5->List 1
{2,5,6,2,3,6->List 2
Prog "CHAR"
IfEnd
If C=32
Then {1,5,3->List 1
{207,207,204->List 2
Prog "LINE"
{2,4->List 1
{1,1->List 2
Prog "CHAR"
IfEnd
If C=33
Then {1,5,1,5,2,4,3,2,4,1,5,1,5->List 1
{1,1,2,2,3,3,4,5,5,6,6,7,7->List 2
Prog "CHAR"
IfEnd
If C=36
Then {2,2,2,2,2,2,2,3,4,3,4->List 1
{1,2,3,4,5,6,7,1,1,7,7->List 2
Prog "CHAR"
IfEnd
If C=37
Then {4,4,4,4,4,4,4,2,3,2,3->List 1
{1,2,3,4,5,6,7,1,1,7,7->List 2
Prog "CHAR"
IfEnd
If C=38
Then {3,3,4,4,3,3,4,4->List 1
{2,3,2,3,5,6,5,6->List 2
Prog "CHAR"
IfEnd