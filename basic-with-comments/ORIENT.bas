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
Prog "DISPMSG"