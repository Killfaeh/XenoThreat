'ProgramMode:RUN'
'Phase de combat contre l'affreux alien'
'H => points de vie de l'alien'

'Nettoyage de l'écran'
Prog "CLEAR"

'Initialisation de PV de l'alien'
List Q[11]-4->H

'Initialisation des variables d'affichage'
0->O
0->P

'Dessin de l'alien'
{40,40,3743,3743,3743->List 1
{2023,4344,2323,14,11->List 2
Prog "LINE"
PlotOn 40,38
{204,6,402,6,8,10,12,16,1518,1922->List 1
{10,1012,1517,1419,1113,1118,1520,1519,1310,1415->List 2
Prog "SYM"
{1,205,608,1013,1517,1825,2630,3227,2321,2227->List 1
{2022,2427,2729,30,2927,2629,2925,2520,2220,2015->List 2
Prog "SYM"
{234,33,35,37,39,38,3329,3532,3936,2626,2520->List 1
{15,1625,1723,1517,1517,1822,2933,3033,3134,3034,3540->List 2
Prog "SYM"
{2220,1917,1720,2227,2631,3234,3631,3131,3839,13,24->List 1
{3234,3543,4542,4237,4038,3840,4045,4437,3942,1315,3235->List 2
Prog "SYM"
{1,4,5,1,4,5,5,9,9,7,7,8,9,11,14,14,15,15,13,14,15,18,2,9,14,20,24,25,26,28,29->List 1
{11,11,11,17,14,15,13,10,14,13,20,20,19,17,12,16,14,15,21,21,20,13,23,29,29,20,19,19,20,16,17->List 2
Prog "SYMD"
{36,36,35,36,36,38,37,39,36,36,37,34,37,36,35,35,34,39,39,30,31,23,22,25,28,28,27,17,21,25,35,37,39->List 1
{12,13,14,14,16,16,19,19,20,21,22,24,25,6,28,29,29,29,30,33,33,30,31,31,34,35,36,44,42,40,40,39,39->List 2
Prog "SYMD"
Prog "DISPMSG"Disps

'Message d'introduction de la phase de combat'
Prog "CLEAR"
"EVIL ALIEN"
"EMERGES"
"WHAT TO DO?"Disps

1->F

'Boucle du combat'
'Q = variable temporaire multi-tâches'
Do
	'On propose une liste d'actions au joueur'
	ClrText
	"1:HAND ATK"
	List 5[5->Q 'On récupère le nombre de balles restantes du joueur'
	
	'Si le joueur n'a plus de balles, on ne lui propose pas d'utiliser son arme'
	If Q>0
		Then "2:GUN ATK"
	IfEnd

	"3:ESCAPE"
	"WHAT TO DO"?->A

	ClrText
	
	'On tire un nombre au hasard'
	Ran#->Q

	'Attaque à mains nues'
	If A=1
		Then If Q>.25
			Then "YOUR ATTACK"
				"SUCCEDED"
				Int (5Ran#)+5->Q
				H-Q->H
				"HITS"
				Q+0Disps
			Else 8->V
				Prog "VIEWS"
		IfEnd
	IfEnd

	'Attaque au pistolet'
	If A=2
		Then List 5[5]-1->List 5[5
			If Q>.25
				Then "YOUR ATTACK"
					"SUCCEDED"
					Int (10Ran#)+10->Q
					H-Q->H
					"HITS"
					Q+0Disps
				Else 8->V
					Prog "VIEWS"
			IfEnd
	IfEnd

	'Tentative de fuite'
	If A=3
		Then If Q>.5
			Then 10->V
				Prog "EMPTY"
				H+4+List 4[N->List 4[N
				Prog "VIEWS"
				B->List 5[1
				0->F
				Goto 0
			Else 9->V
				Prog "VIEWS"
		IfEnd
	IfEnd

	'Phase d'attaque de l'alien'
	ClrText

	'Si l'alien n'a plus de PV, il disparait de la case et on sort de la boucle de combat'
	If H<=0
		Then 0->F
			7->V
			Prog "VIEWS"
			Prog "EMPTY"
			Goto 0
	IfEnd

	'Tour d'action de l'alien'	

	'On tire un nombre au hasard'
	Ran#->Q
	"ALIEN ATTACK"
	"HITS"
	If Q>.5
		Then Int (10Ran#)+10->Q
			List 5[4]-Q->List 5[4
		Else 0->Q
	IfEnd

	Q+0Disps

	List 5[4->Q

	If Q<0
		Then 0->L
			0->V
			6->V
			Prog "VIEWS"
	IfEnd

	Lbl 0:B+0
LpWhile F=1

3->V