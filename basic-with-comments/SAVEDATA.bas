'ProgramMode:RUN'
'Sauvegarde de la partie'
List 5[1](10)2+List 5[2](10)1+List 5[3->Q '100 * id de la case où se trouve le joueur + 10 * orientation du joueur + nombre de clé du joueur'
List 5[4](10)3+List 5[5](10)1+List 5[12->R '1000 * nombre de points de vie du joueur + 10 * nombre de munitions du joueur + numéro de section où se trouve le joueur'

If A>0
	Then If A<9
		'Sauvegarde du slot A'
		Then Q->List 6[2A-1
			R->List 6[2A
	IfEnd
IfEnd