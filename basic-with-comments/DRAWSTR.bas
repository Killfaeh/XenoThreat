'ProgramMode:RUN'

'Boucle pour dessiner une chaîne de caractères'
'Une chaîne de caractères est encodées sous la forme d'un nombre.'
'Un caractère est encodé avec 2 chiffres.'
'Un nombre ne pouvant pas dépasser 10 chiffres sur ce modèle on ne peut stocker qu'une chaîne de maximum 5 caractères.'
'La boucle décompose le nombre pour en extraire les caractères et exécuter le programme DRAWCHAR pour les dessiner un par un.'
'W => stocke la chaîne de caractères à dessiner sous forme d'un nombre. On lui supprime progressivement les caractères déjà dessinés.'
'Z => index de la boucle'
'D => longueur de la chaîne de caractères'
'X => position dans le nombre du caractère à dessiner'
'C => numéro du caractère à dessiner'
'O => stocke la position en X du caractère à dessiner, Chaque caractère mesure 6 pixels de large. 0 correspond à un espace.'

For 1->Z To D Step 1
	2Z-2D->X
	Int (W(10)X)->C
	W-Int (C(10)-X)->W

	If C>0
		Then Prog "DRAWCHAR"
	IfEnd

	O+6->O
Next