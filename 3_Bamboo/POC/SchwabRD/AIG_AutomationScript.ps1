#parameters defined , should be passed from the command prompt or Ms arguments
#param( [Parameter(Mandatory=$true)][string]$ProjName,[Parameter(Mandatory=$true)][Int32]$ChangeSetNo,[Parameter(Mandatory=$true)][string]$DropLoc)



$teamProjectName= 'AIGTravelGuardTravelFMC' #$ProjName  #team project Name
$changesetId =  7433 #$ChangeSetNo #number -for the current release
$targetserloc= 'D:\AIGTest\' #$DropLoc      #$TargetLoc #target location

Write-Host "Parameters details :" $teamProjectName + " " + $changesetId + " " $targetserloc


# Add TFS 2013 dlls so we can download some files
# The version needs to be  modified based on the dlls deployed on the build server
#Load Reference Assemblies
[void][System.Reflection.Assembly]::LoadWithPartialName("Microsoft.TeamFoundation.Client")  
[void][System.Reflection.Assembly]::LoadWithPartialName("Microsoft.TeamFoundation.Build.Client")  
[void][System.Reflection.Assembly]::LoadWithPartialName("Microsoft.TeamFoundation.Build.Common") 
[void][System.Reflection.Assembly]::LoadWithPartialName("Microsoft.TeamFoundation.WorkItemTracking.Client")
[void][System.Reflection.Assembly]::LoadWithPartialName("Microsoft.TeamFoundation.VersionControl.Client")

#Add-Type -AssemblyName 'Microsoft.TeamFoundation.Client, Version=11.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a'
#Add-Type -AssemblyName 'Microsoft.TeamFoundation.VersionControl.Client, Version=11.0.0.0, Culture=neutral, PublicKeyToken=b03f5f7f11d50a3a'

$uri = "https://tfs.corp.mphasis.com/tfs"

$collectionName="MphasisCollection"
$CollectionUrl="https://tfs.corp.mphasis.com/tfs/MphasisCollection"

$tfsConfigurationServer = [Microsoft.TeamFoundation.Client.TfsConfigurationServerFactory]::GetConfigurationServer($uri)
$tpcService = $tfsConfigurationServer.GetService("Microsoft.TeamFoundation.Framework.Client.ITeamProjectCollectionService")


$tfsCollection = [Microsoft.TeamFoundation.Client.TfsTeamProjectCollectionFactory]::GetTeamProjectCollection($CollectionUrl)

$workItemstore = $TfsCollection.GetService([Microsoft.TeamFoundation.WorkItemTracking.Client.WorkItemStore])
$cssService = $TfsCollection.GetService("Microsoft.TeamFoundation.Server.ICommonStructureService3")   
$versionControlServer = $TfsCollection.GetService("Microsoft.TeamFoundation.VersionControl.Client.VersionControlServer")

$numberOfProjects = 0

$proj = $workItemstore.Projects[$teamprojectName] 

#$sortedProjects = $cssService.ListProjects() | Sort-Object -Property Name

Write-Host "Team project name :" $proj.Name


$changeSet = $versionControlServer.GetChangeset($changesetId);
$changeslist =$changeSet.Changes
if ($changeslist.count -eq 0)
{
    Write-Host "Please Re-enter the ChangeSetID"
    return
}
Write-Host "Files count:" $changeslist.Count
#traversing each Item in the change set and only downloading if it is file

foreach($change in $changeslist)
{
        $Item =$change.Item
        if ($Item.ItemType -eq "File" )
        {
            $Item.DownloadFile($targetserloc+$item.ServerItem.Tostring().Substring(2))
        }
}
#Need to copy the code for traversing all the folder(s) and copy the SQL files to seperate file and create batch file

$SQLFolder ='SQLScripts'

$sqlFolderExist=$targetserloc + $SQLFolder  #targetserloc  #team project Name
Write-Host "Folder Path :" $sqlFolderExist



#check sqlfiles folder exist or not if exist, delete and re create the folder
If (Test-Path $sqlFolderExist){
    Write-Host $sqlFolderExist "Exist already"
    Remove-Item $sqlFolderExist -Recurse
    new-item -Name $SQLFolder -ItemType directory
   }else
   {
     new-item -Name $SQLFolder -ItemType directory 
   }

# Get the all files from folderpath(i.e all .extension files)
$files=Get-ChildItem -Path $targetserloc + '\'+ $teamProjectName –Recurse
if ($files.count -eq 0)
{
 
    Write-Host "There are no files and folders"
    return   
}

$createBatchFile = $sqlFolderExist + '\sqlbatchfile.cmd'
#Write-Host "One batch file created with name of " $createBatchFile.FullName
Write-Host "`r`n" 
Write-Host "Get all sql files"

ForEach ($file in $files)
 { 
     # Here get .sql files one by one and append into the sqlbatchfile.
     $IsSqlFilesExists=0
     if ($file.extension -eq ".sql")
     {
         Write-Host $file          
        
         $sfile = 'Osql '+ '"'+ $file.Name +'"' + "`r`n" +"Go"
         $sfile | Out-File $createBatchFile -Append 
      
         #copy the all files into SqlFiles folder
         copy-Item $file.FullName -destination $sqlFolderExist
         $IsSqlFilesExists=1    
      }
 }
 if ( $IsSqlFilesExists -eq 1)
 {
     Write-Host "All the SQL file(s) are appending to batch file(s)"
 }
 else
 {
    Write-Host "There are not SQL files(s) in the selected folder"
 }
 
