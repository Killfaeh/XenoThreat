'ProgramMode:RUN'
'En cours d'exécution, le jeu occupe quasiment toute la mémoire de la G25.'
'Je propose donc ce programme pour vider la mémoire temporaire de la calculette.'
'Si vous avez des parties sauvegardées, elles seront supprimées.'
0->A~Z
ClrText
ClrGraph
ClrList
Seq(0,X,1,16,1->List 6
"RESET GAME"
