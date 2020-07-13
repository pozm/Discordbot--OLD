echo off
CLS
echo Would you like to run test?
set /p test=
IF /i %test% == no node index  & timeout /t -1
IF /i %test% == yes node index true & timeout /t -1