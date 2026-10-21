'ProgramMode:RUN'
'Exécution de l'action du joueur'
'A => Action sélectionnée par le joueur'
'R => Direction dans laquelle regarde le joueur'
'K => Contenu de la case occupée par le joueur (à vérifier)'
'V => Vue à afficher'

List 5[2->R

'Tourner à gauche'
If A=7
	Then R-1->R
IfEnd

'Tourner à droite'
If A=9
	Then R+1->R
IfEnd

'R ne peut être ni inférieur à 1 ni supérieur à 4. C'est une valeur tournante comme un angle.'
If R<=0
	Then 4->R
IfEnd

If R>4
	Then 1->R
IfEnd

R->List 5[2 'Sauvegarde de l'orientation du joueur'
List 5[11->K 'On récupère le contenu de la case occupée par le joueur'

'Avancer pour se déplacer dans la map'
If A=8
	Then List 5[1->B 'On stocke l'id de la case actuelle dans B'
	
		'On s'échappe du vaisseau. Fin du jeu.'
		If K=4
			Then If R=1
				Then 0->L
					11->V
					Prog "VIEWS"
					Goto 0
			IfEnd
		IfEnd

		'On récupère l'id de la case suivante.'
		List 5[5+R->X

		'Si la case existe : '
		If X>0
			Then List 5[3->Y 'On stocke le nombre de clées que possède le joueur dans Y'
			
				'Si on va vers le nord, on récupère le nombre de clées nécessaires pour passer dans T.'
				'Sinon on n'a pas besoin de clé.'
				If R=1
					Then List 5[10->T
					Else 0->T
				IfEnd

				'Si le nombre de clées en possession du joueur est supérieur ou égal au nombre de clées nécessaires alors le joueur change de case.'
				If Y>=T
					'Si on va vers le nord : '
					Then If R=1
						Then Y-T->List 5[3 'On retire les clées "dépensées" de l'inventaire du joueur.'
						Prog "EMPTY"
						
						'Si le nouvel id est supérieur à l'ancien, ça implique qu'on passe dans la section suivante.'
						If X>B
							Then List 5[13->W
								W-1->W
								Prog "INITMAP"
								W->List 5[12
						IfEnd
					IfEnd

					'Si on va vers le sud : '
					If R=3
						'Si le nouvel id est inférieur à l'ancien, ça implique qu'on passe dans la section précédente.'
						Then If X<B
							Then List 5[13->W
								W+1->W
								Prog "INITMAP"
								W->List 5[12
						IfEnd
					IfEnd

					'On déplace le joueur sur la nouvelle case.'
					X->List 5[1
					
					'Si le joueur n'a pas assez de clés on affiche un message'
					Else If R=1
						Then ClrText
							"KEYS NEEDED"
							"FOR THIS DOOR"
							T+0Disps
							ClrText
							"YOU HAVE"
							Y+0Disps
						IfEnd
					
				IfEnd
		IfEnd
IfEnd

'Afficher la map'
If A=5
	Then 4->V
IfEnd

'Afficher les stat du joueur'
If A=2
	Then 12->V
IfEnd

'Afficher l'écran de sauvegarde de la partie'
If A=3
	Then 5->V
IfEnd

'Afficher l'écran de chargement d'une partie'
If A=1
	Then 2->V
IfEnd

'Affichage du rappel des commandes'
If A=6
	Then 13->V
IfEnd

Lbl 0:0+0