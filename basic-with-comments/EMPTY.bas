'ProgramMode:RUN'
'On vide la case en cours des items qui s'y trouvent'

List 5[1->N 'Sauvegarde temporaire de l'ID de la case en cours'
List 5[8->O 'Sauvegarde temporaire de l'ID de la case en bas'
List 5[6->P 'Sauvegarde temporaire de l'ID de la case en haut'

If O>0
	Then O+1->O
IfEnd

If P>0
	Then P+1->P
IfEnd

'Recalcul du numéro d'information de la case'
OExp7+PExp4+List 5[13]Exp2->List 4[N