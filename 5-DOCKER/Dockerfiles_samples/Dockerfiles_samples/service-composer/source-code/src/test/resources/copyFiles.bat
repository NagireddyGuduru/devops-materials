rmdir /s /q c:\service-composer\source

mkdir c:\service-composer\source

xcopy C:\Rasik\projects\STP\microservices\*.* c:\service-composer\source /S /EXCLUDE:excluded-files.txt
