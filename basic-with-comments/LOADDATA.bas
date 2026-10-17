'ProgramMode:RUN'
'Chargement des données d'une partie'
'Une sauvegarde est stockée sur 2 nombres dans la liste 6 en position 2*A-1 et 2*A'
'Le premier nombre stocke l'ID de la case  où se troue le joueur, son orientation, le nombre de clés que le joueur possède'
'Le second nombre stocke le nombre de points de vie du joueur, le nombre de munitions que possède le joueur, la section où se trouve le joueur'

If A>0
	Then If A<9
		Then List 6[2A-1->Q 'Récupérer la première partie de la sauvegarde'
			List 6[2A->R 'Récupérer la seconde partie de la sauvegarde'
	IfEnd
IfEnd

If Q>0
	Then Int (.01Q)->List 5[1 'ID de la case où se trouve le joueur'
		Int (.1Q)-10*List 5[1->List 5[2 'Orientation du joueur'
		Q-List 5[1](10)2-10*List 5[2->List 5[3 'Nombre de clé que possède le joueur'
		Int (R(10)-3)->List 5[4 'Nombre de points de vie du joueur'
		Int (.1R)-List 5[4](10)2->List 5[5 'Nombre de munitions que possède le joueur'
		R->List 5[5](10)1-List 5[4](10)3->List 5[12 'Section de la map où se trouve le joueur'
		
		'Initialisation de la section de map où se trouve le joueur'
		List 5[12->W
		Prog "INITMAP"
IfEnd