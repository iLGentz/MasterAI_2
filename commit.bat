@echo off

SET /P COMMIT_MSG="inserisci il commento: "

git add .
git commit -m "%COMMIT_MSG%"
git push
pause