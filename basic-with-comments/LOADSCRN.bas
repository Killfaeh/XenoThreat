'ProgramMode:RUN'
'Affichage des slots de sauvegarde'

'Initialisation du curseur d'affichage des caractères'
1->O
39->P
5->D

For 1->N To 8 Step 1
	38360037->W 'Chaîne de caractères du slot'
	W+N(10)8->W
	List 6[2N-1->Q 'On stocke dans Q les données de sauvegarde du slot'

	'Si Q est supérieur à zéro, il y a une sauvegarde, donc on coche le slot avec un X'
	If Q>0
		Then W+33(10)2->W
	IfEnd

	'Affichage de la chaîne de caractères'
	Prog "DRAWSTR"
	N Rmdr 2->Q

	'Repositionnement du curseur d'affichage des caractères'
	If Q=0
		Then 1->O
			P-8->P
		Else O+6->O
	IfEnd
Next

'Affichage du message EXE >'
Prog "DISPMSG"Disps

'Demander au joueur de sélectionner un slot'
ClrText
"CHOOSE SLOT"