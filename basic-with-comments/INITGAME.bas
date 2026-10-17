'ProgramMode:RUN'
'Initialisation des données de jeu'

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

'La variable S permet de savoir si des sauvegardes existent ou non'
'Si S est à 0 on libère complètement la mémoire'
If S=0
	Then 1->S
	Seq(0,X,1,16,1->List 6
IfEnd

6->W
Prog "INITMAP"

'Initialisation des données du joueur avec des valeurs par défaut'
Dim List 3->List 5[1
1->List 5[2
0->List 5[3
99->List 5[4
30->List 5[5
6->List 5[12

'Initialisation des réglages de l'écran'
S-WindMan
S-Gph1 DrawOn,Scatter,List 1,List 2,1,Dot
S-Gph2 DrawOff
S-Gph3 DrawOff