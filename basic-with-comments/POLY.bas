'ProgramMode:RUN'
'Dessin d'un polygone'

List 2+P->List 2

If E=0
	Then List 1+O->List 1
	Else 80-List 1->List 1
IfEnd

For 1->I To Dim List 1-1 Step 1
	F-Line List 1[I,List 2[I,List 1[I+1,List 2[I+1
Next

0->E