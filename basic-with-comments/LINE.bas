'ProgramMode:RUN'
'Afficher une liste de lignes'

'Initialisation du curseur d'affichage'
If E=1
	Then 0->O
		0->P
IfEnd

'Boucle sur la liste 1'
'List 1 : position en X des points de départ et d'arrivée'
'List 2 : position en Y des points de départ et d'arrivée'

For 1->I To Dim List 1 Step 1

	'Les positions en X des points de départ et d'arrivé sont fusionnés en un seul nombre dans la List 1'
	'Les positions en Y des points de départ et d'arrivé sont fusionnés en un seul nombre dans la List 2'
	'Les unités et les dizaines indiquent la position de départ'
	'Les centaines et les milliers indiquent la position d'arrivée'
	'Si les 2 positions sont identiques (lignes verticales et lignes horizontales), le nombre est réduit à 2 chiffres'

	Int (List 1[I]Exp-2)->J 'Position en X du point d'arrivée'
	Int (List 2[I]Exp-2)->K 'Position en Y du point d'arrivée'

	'Si J vaut 0 la position en X du point d'arrivée est la même que la position en X du point de départ (ligne verticale)'
	If J=0
		Then List 1[I->J
		J+JExp2->List 1[I
	IfEnd

	'Si K vaut 0 la position en Y du point d'arrivée est la même que la position en Y du point de départ (ligne horizontale)'
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