'ProgramMode:RUN'
'Affichage de l'écran de jeu'
'V => numéro de la vue à afficher'

Prog "CLEAR"
ClrText

'Affichage du menu de démarrage du jeu'
If V=0
	Then Prog "TITLE"Disps
		Prog "CLEAR"
		"MAIN MENU"
		"0:NEW GAME"
		"1:LOAD GAME"
		"WHAT TO DO"?->A
IfEnd

'Séquence d'introduction d'une nouvelle partie'
If V=1
	Then Prog "DISPCTRL"
		
		ClrText
		"..."Disps
		
		ClrText
		"RED ALERT"
		"RED ALERT"Disps
		
		ClrText
		"HOSTILE"
		"ALIENS HAVE"
		"INVADED"
		"THE DEDALUS"Disps
		
		ClrText
		"YOU MUST"
		"EVACUATE"
		"THE SHIP"Disps
		
		ClrText
		"REPEAT"Disps
		
		ClrText
		"YOU MUST"
		"EVACUATE"
		"THE SHIP"Disps
		
		ClrText
		3->V
		1->L
IfEnd

'Ecran de chargement d'une partie enregistrée'
If V=2
	Then Prog "LOADSCRN"
		"TO LOAD"?->A
		Prog "LOADDATA"
		3->V
		1->L
IfEnd

0->M

'Affichage du décor de la case où se trouve le joueur'
Lbl 1:If V=3
	Then Prog "BUILDCOR"Disps
		Prog "CLEAR"
	
		If L<>1
			Then Goto 0
		IfEnd

		If Q>0
			Then If Q<>4
				Then 1->M
					Goto 1
				Else "WHAT TO DO"?->A
					Prog "EXECMOVE"
			IfEnd
			Else "WHAT TO DO"?->A
				Prog "EXECMOVE"
		IfEnd
IfEnd

'Affichage de la map et de la position du joueur'
If V=4
	Then Prog "MAPSCRN"Disps3->V
IfEnd

'Ecran de sauvegarde de la partie'
If V=5
	Then Prog "CLEAR"
		Prog "LOADSCRN"
		"TO SAVE"?->A
		Prog "SAVEDATA"
		3->V
IfEnd

'Ecran game over'
If V=6
	Then " "
		" "
		"  GAME OVER"Disps" "
IfEnd

'Ecran annonçant la fin du combat contre l'alien'
If V=7
	Then " "
		" "
		" ALIEN DEAD"
IfEnd

'Ecran annonçant l'échec de l'attaque contre l'alien'
If V=8
	Then "YOUR ATTACK"
		"FAILED"Disps

		" "
IfEnd

'Ecran annonçant l'échec de la fuite'
If V=9
	Then "YOUR ESCAPE"
		"FAILED"Disps

		" "
IfEnd

'Ecran annonçant le succès de la fuite'
If V=10
	Then "YOUR ESCAPE"
		"SUCCEDED"
IfEnd

'Séquence de fin de partie'
If V=11
	Then "YOU ESCAPED"
		"FROM THE"
		"DEDALUS"Disps
		
		ClrText
		"YOU LAUNCH"
		"INTO THE"
		"STARS"Disps
		
		ClrText
		"LEAVING"
		"THE HORROR"
		"BEHIND"Disps
		
		Prog "CLEAR"
		Prog "CAPS"
IfEnd

'Affichage des stats du joueur'
If V=12
	Then Prog "CLEAR"
		"STATS"
		"HEALTH"
		0+List 5[4Disps

		Prog "CLEAR"
		"BULLETS"
		0+List 5[5Disps

		Prog "CLEAR"
		"KEYS"
		0+List 5[3Disps

		" "
		3->V
IfEnd

'Affichage du rappel des commandes'
If V=13
	Then Prog "DISPCTRL"
IfEnd

Lbl 0:B+0