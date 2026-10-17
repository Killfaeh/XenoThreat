'ProgramMode:RUN'
'Point d'entrée du jeu du jeu'

'Initialisation du jeu'
Lbl 0:Prog "INITGAME"

'Affichage du menu de démarrage du jeu'
Prog "CLEAR"
0->V
Prog "VIEWS"

'Si le joueur a entré 0, on lance une nouvelle partie'
If A=0
	Then 1->V
IfEnd

'Si le joueur a entré 1, on affiche l'écran de chargement'
If A=1
	Then 2->V
IfEnd

'Affichage de l'écran demandé par le joueur'
Prog "CLEAR"
Prog "VIEWS"

'Si le joueur entre la commande 0 à cette étape, on retourne à l'écran de démarrage du jeu'
If A=0
	Then Goto 0
IfEnd

'Initialisation des variables'
1->L
0->A
0->G

'Boucle de jeu'
Do
	0->Q
	0->R
	0->H
	Prog "CLEAR"
	Prog "VIEWS"
LpWhile L=1

'Retour à l'écran de démarrage du jeu'
ClrGraph
Goto 0