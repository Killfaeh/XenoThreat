'ProgramMode:RUN'
'Afficher une liste de lignes'

'Initialisation du curseur d'affichage'
If E=1
	Then 0->O
		0->P
IfEnd

'Boucle sur la liste 1'
'Le point de départ de chaque ligne se trouve dans la liste 1'
'Le point d'arrivée de chaque ligne se trouve dans la liste 2'

For 1->I To Dim List 1 Step 1

	'Les coordonnées d'un point sont fusionnées en un seul nombre : '
	'Les unités et les dizaines indiquent la position en X'
	'Les centaines et les milliers indiquent la position en Y'
	'Si les 2 coordonnées sont identiques (la diagonales Y=X), le nombre est réduit à 2 chiffres'

	Int (List 1[I]Exp-2)->J 'Position en Y du point de départ'
	Int (List 2[I]Exp-2)->K 'Position en Y du point d'arrivée'

	'Si J vaut 0 la position en Y du point de départ est la même que la position en X. Il est sur la diagonale.'
	If J=0
		Then List 1[I->J
		J+JExp2->List 1[I
	IfEnd

	'Si J vaut 0 la position en Y du point d'arrivée est la même que la position en X. Il est sur la diagonale.'
	If K=0
		Then List 2[I->K
			K+KExp2->List 2[I
	IfEnd

	If E=1
		Then F-Line 80-J,K+P,80-List 1[I]+JExp2,List 2[I]-KExp2+P 'Affichage du symétrique des données'
		Else F-Line J+O,K+P,List 1[I]-JExp2+O,List 2[I]-KExp2+P 'Affichage des données'
	IfEnd
Next

0->E