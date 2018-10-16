param([Parameter(Mandatory=$true)][string]$configfile)
try
{ 

 write-host 'path=' $configfile

 $Error.Clear()
  #Loading Configuration file  
 
  $filecontent = Get-Content $configfile 
  $json = $filecontent|ConvertFrom-Json
  
  #getting general values
  $general=$json.general
  $azurecluster =$json.azurecluster



function ReadandExectuteComponetsfromJsontoK8sCluster
{
     [CmdletBinding()]
        Param
        (
           [ValidateNotNullOrEmpty()]
            $component,

            [ValidateNotNullOrEmpty()]
            [Alias("folderpath")]
            [string]$folder,

            [ValidateNotNullOrEmpty()]
            [Alias("compname")]
            [string]$name

        )
        
        $array = @{}
        foreach ($property in $component.PSObject.Properties) 
        {
            $array.Add($property.Name,$property.Value)       
        }

        #traverssing to each and excueting each component to k8s cluster
        $msg =" "
        $msg =$msg +$res.10027 + " " + $name
        WritetoLog $msg   $logilfile 
         
         $folder = $folder.Replace('\\','\') + '\'
         write-host 'foler=' $folder
		 
        foreach($keyobj in $array.Values)
        {
            $k8comp=' '

            $k8comp=  $k8comp + $folder + $keyobj
             
            $resstr = $res.10026 + "" + $res.10024  + ""+ $res.10034 + "" + $k8comp

             WritetoLog $resstr -LogPath  $logilfile
           
             WritetoLog "executing kubectl command..." -LogPath $logilfile   
			
			 $k8comp = $k8comp.Replace('\\','\')
			 
             kubectl $res.10035  -f   $folder + $keyobj

             WritetoLog "Kubectl command executed" -LogPath $logilfile    
                     
        }

        $array.Clear();
}
 
  
  #Loading utiltiy module
  Import-Module $general.k8s_utility_module.ToString();
  #Loading resource module  
  $res= Import-LocalizedData -BaseDirectory $general.k8s_resource_module_folder -FileName $general.k8s_resource_module_file
  
   #reading attributes from Json and converthing to arrays  
    $logilfile= generateLogFilewithDate  $general.components_log_file           

   #reading kubectl nodes
   #To verify whether cluster is created and connect to cluster using kubectl with to verify cluster nodes. 
    $clstr_RG=$azurecluster.cluster_group_name.Tostring().Trim()
    $clstr_Name=$azurecluster.cluster_name.Tostring().Trim()   

	WritetoLog $clstr_Name -LogPath $logilfile
	WritetoLog $clstr_RG -LogPath $logilfile
    if (($clstr_RG -eq "")  -or ($clstr_Name -eq "")  )
    {
        WritetoLog $res.10014 -LogPath $logilfile
        exit 1
    }

        WritetoLog $res.10017 -LogPath $logilfile
        az aks get-credentials --resource-group $clstr_RG --name $clstr_Name
        WritetoLog $res.10018 -LogPath $logilfile
        WritetoLog $res.10020 -LogPath $logilfile	

    kubectl get nodes 

    #end of verifying


  
   #deploying nextstep_Initialcomponents - dependency components like configmaps, volumes, persitent volume claims
   $nextstepInitialcomponents=$json.nextstep_Initialcomponents 
   ReadandExectuteComponetsfromJsontoK8sCluster $nextstepInitialcomponents  -folderpath $general.k8s_setupcomponents_folder -compname $res.10032
   
   #deploying  nextstep_components  -> all next step components
   $nextstepcomponents=$json.nextstep_components 
   ReadandExectuteComponetsfromJsontoK8sCluster $nextstepcomponents  -folderpath $general.k8s_components_folder -compname $res.10028

   
}
catch
{
   Write-host $Error[0]
    $Error.Clear()    
    exit 1
}