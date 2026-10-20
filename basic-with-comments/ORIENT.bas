'ProgramMode:RUN'
'Affichage de l'orientation du joueur sous forme d'un caractère en bas à gauche'

'Initialisation du curseur d'affichage du caractère'
1->O
1->P

'Nord'
If R=1
	Then 23->C
IfEnd

'Est'
If R=2
	Then 14->C
IfEnd

'Sud'
If R=3
	Then 28->C
IfEnd

'Ouest'
If R=4
	Then 32->C
IfEnd

'Affichage du caractère'
Prog "DRAWCHAR"

'Afficher une petite flèche d'orientation pour compléter la lettre'

'Nord'
If R=1
	Then F-Line 9,3,15,3
		F-Line 10,4,14,4
		F-Line 11,5,13,5
		PlotOn 12,6
IfEnd

'Est'
If R=2
	Then F-Line 9,2,9,8
		F-Line 10,3,10,7
		F-Line 11,4,11,6
		PlotOn 12,5
IfEnd

'Sud'
If R=3
	Then F-Line 9,6,15,6
		F-Line 10,5,14,5
		F-Line 11,4,13,4
		PlotOn 12,3
IfEnd

'Ouest'
If R=4
	Then F-Line 12,2,12,8
		F-Line 11,3,11,7
		F-Line 10,4,10,6
		PlotOn 9,5
IfEnd

'Afficher EXE >'
Prog "DISPMSG"