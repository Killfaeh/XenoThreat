'ProgramMode:RUN'
'Extraction des informations de la case occupée par le joueur'

List 5[1->Q 'Sauvegarde temporaire de l'ID de la case en cours'

If Q>Dim List 3
	Then "INDEX ERROR"
		Q+0Disps
IfEnd

'Les informations d'une case sont réparties sur 2 nombres : '
'Le premier stocké dans la liste 3, stocke la position en X et en Y, l'id de la case se situant à l'ouest et l'id de la case se situant à l'est'
'Le second stocké dans la liste 4, stocke l'id de la case se situant au sud, l'id de la case se situant en nord, le nombre de clés nécessaire pour passer au niveau suivant, le numéro de section et le numéro d'item présent sur la case'

Int (List 3[Q](10)-3)-Int (List 3[Q](10)-6)(10)3->List 5[9 'ID de la case située à l'ouest'
List 3[Q]-Int (List 3[Q](10)-3)(10)3->List 5[7 'ID de la case située à l'est'
Int (List 4[Q](10)-7)->List 5[8 'ID de la case située au sud'
Int (List 4[Q](10)-4)-List 5[8](10)3->List 5[6 'ID de la case située au nord'
Int (List 4[Q](10)-3)-List 5[6](10)1-List 5[8](10)4->List 5[10 'Nombre de clés nécessaire pour passer à la section suivante'
Int (List 4[Q](10)-2)-List 5[8](10)5-List 5[6](10)2-List 5[10](10)1->List 5[13 'Numéro de section de la case en cours'
List 4[Q]-List 5[13](10)2-List 5[10](10)3-List 5[6](10)4-List 5[8](10)7->List 5[11 'Numéro de l'item présent sur la case'
List 5[9->Q

'Petit correctif parce que j'ai merdé sur le calcul des id des cases voisines lors de l'écriture de la map et que j'avais la flemme de tout retaper à la main.'

If Q>0
	Then List 5[9]-1->List 5[9
IfEnd

List 5[7->Q

If Q>0
	Then List 5[7]-1->List 5[7
IfEnd

List 5[8->Q

If Q>0
	Then List 5[8]-1->List 5[8
IfEnd

List 5[6->Q

If Q>0
	Then List 5[6]-1->List 5[6
IfEnd