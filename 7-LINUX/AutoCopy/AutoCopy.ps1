
param( [Parameter(Mandatory=$true)][string]$Src, [Parameter(Mandatory=$true)][string]$trg)

#[Parameter(Mandatory=$true)][string]$username,[Parameter(Mandatory=$true)][string]$password)

$srcPath= Test-Path $Src

if ($srcPath -eq $False)
{
 write-host "Source file path is not correct, please select the proper source path"
 write-verbose "Source file path is not correct, please select the proper source path"
 exit 1
}
$trgPath=Test-Path $trg

if ( $trgPath -eq $False)
{
    write-host "Target File path is not correct, please select the proper target path"
    write-verbose "Target File  path is not correct, please select the proper target path"
    exit 1
}

if ($Src -eq $trg)
{
    write-host "Both the source and destination is same. Please change the selections"
    write-verbose "Both the source and destination is same. Please change the selections"
    exit 1
}
try
{

   $listofFiles= get-childitem -path $Src
   
   if($listofFiles.count -eq 0)
   {
      write-host "Source folder is empty"
      write-verbose "Source folder is empty"
      exit 1
   }
   $Src = $Src + "\*"
    
      write-host "Files are copying..."
      write-verbose "Files are copying..."    
      Copy-Item $Src  -destination $trg -recurse -force
      write-host "Copy is done..."
      write-verbose "Copy is done..."    
  }
catch
{
   Write-Host $Error[0] -ForegroundColor Red
    write-host "Copy process is failed"
      write-verbose "Copy process is failed..."    
     
}