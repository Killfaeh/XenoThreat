'ProgramMode:RUN'
'Calcul des éléments de décor à afficher'

Prog "GETTILE" 'Récupération des données de la case actuellement occupée par le joueur.'
List 5[11->Q 'On stock dans Q le numéro d'item présent sur la case.'

'Si le numéro d'item est supérieur à 4, c'est qu'on tombe sur un alien.'
'On saute donc directement au sous programme des combats.'
If Q>4
	Then Goto 0
IfEnd

'Affichage du cadre'	
0->U
Prog "COR"

'À partir de l'orientation du joueur on calcule la position des cases relativement au joueur.'
List 5[2->R

'Calcule de l'identifiant de la case située à gauche du joueur'
R+4->I

If I<6
	Then 9->I
IfEnd

List 5[I->Q

If Q=0
	Then 1->U 'On a un mur à gauche'
	Else 4->U 'On a un couloir à gauche'
IfEnd

Prog "COR"

'Calcule de l'identifiant de la case située à droite du joueur'
R+6->I

If I>9
	Then 6->I
IfEnd

List 5[I->Q

If Q=0
	Then 2->U 'On a un mur à droite'
	Else 5->U 'On a un couloir à droite'
IfEnd

Prog "COR"

'Calcule de l'identifiant de la case située en face du joueur'
List 5[5+R->Q

If Q=0
	Then 3->U 'On a un mur en face'
	Else List 5[10->T
		If T=0
			Then 6->U 'Si le passage ne nécessite pas de clé alors on affiche un couloir'
			Else If R=1 'Si le passage nécessite des clés : '
				Then 9->U 'Si le joueur va vers le nord, on affiche une porte fermée.'
				Else 6->U 'Si le joueur va vers le sud, on affiche un couloir ouvert.'
			IfEnd
		IfEnd
IfEnd

Prog "COR"

'M Mémorise si on a déjà ramassé l'item présent sur la case (s'il y en a un).'
'Si M est égal à 0, alors l'item n'a pas encore été ramassé, on peut donc l'afficher.'
If M=0
	Then List 5[11->Q 'On stocke le numéro d'item dans Q'
		'0 signifie qu'il n'y a rien'
		If Q>0
			'S'il s'agit d'une clé ou d'un lot de munitions, cet item est automatiquement ramassé.'
			'La case est donc vidée de son item.'
			Then If Q<3
				Then Prog "EMPTY"
			IfEnd
			
			'1, une clé'
			If Q=1
				Then 10->U
					1+List 5[3->List 5[3
					List 5[3->Z

					If Z>9
						Then 9->List 5[3
					IfEnd
			IfEnd

			'2, un lot de 10 munitions'
			If Q=2
				Then 11->U
					10+List 5[5->List 5[5
					List 5[5->Z

					If Z>99
						Then 99->List 5[5
					IfEnd
			IfEnd
			
			'3 : une trousse de soin qui redonne au maximum 30 points de vie'
			If Q=3
				Then 12->U
					List 5[4->Z

					'Si le joueur est à son maximum de points de vie, la trousse de secours n'est pas aramassée.'
					If Z>=99
						Then 99->List 5[4
						Else Z+30->List 5[4
							Prog "EMPTY"
							List 5[4->Z

							If Z>99
								Then 99->List 5[4
							IfEnd
					IfEnd
			IfEnd
			
			If Q<4
				Then Prog "COR"
			IfEnd
		IfEnd
	Else 0->Q
IfEnd

'Si le numéro d'item est 4 et qu'on regarde vers le nord, on affiche la porte de la capsule de sauvetage.'
If R=1
	Then If Q=4
		Then 8->U
			Prog "COR"
			0->Q
	IfEnd
IfEnd

'Afficher dans quelle direction regarde le joueur (la lettre en bas à gauche)'
Prog "ORIENT"

'Déclenchement du sous programme du mode combat.'
Lbl 0:If Q>4
	Then Prog "FIGHT"
		3->V
		
		'Si le joueur à 0 points de vie ou moins on sort de la boucle de jeu'
		List 5[4->Q
		
		If Q<0
			Then 0->L
		IfEnd
		
		5->Q
		" "
IfEnd