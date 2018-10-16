 param(
         [Parameter(Mandatory=$true)][string]$configfile,
         [Parameter(Mandatory=$true)][string]$username,
         [Parameter(Mandatory=$true)][string]$password
       )

try
{
    
   $Error.Clear()
   
   Write-Host  $configfile
   #Loading Configuration file
   
  $config = (Get-Content $configfile | ConvertFrom-Json) # read file
   
    #Loading values from config 
  $geninfo =$config.general
  $azureresource =$config.azureresource
  $azurecluster =$config.azurecluster   
   
    
   #importing modules
   Import-Module $geninfo.k8s_utility_module
   $res= Import-LocalizedData -BaseDirectory $geninfo.k8s_resource_module_folder -FileName $geninfo.k8s_resource_module_file

  try
  { 
       #formating log file with date

      $logilfile= generateLogFilewithDate  $geninfo.nextstep_log_file  
     #To login to azure with proper login credentials
      WritetoLog $res.10002  -LogPath $logilfile        
      az login -u $username.trim() -p $password 
     
    }
    catch
    {
      WritetoLog $res.10004 -LogPath $logilfile     
      WritetoLog $_.Exception.Message -LogPath $logilfile
      exit 1
    }    
    
    #To create a service principle - This should be passed to seperate file and read contents of it as an array    
    WritetoLog $res.10007 -LogPath $logilfile
    $Srv_prin_filename=$azurecluster.service_principal
    az ad sp create-for-rbac --skip-assignment >  $Srv_prin_filename 
    #reading data from service principal file
   
    WritetoLog $res.10008 -LogPath $logilfile
    $sp_config =  $sp_json = (Get-Content $Srv_prin_filename | ConvertFrom-Json)    

        
    #Read appID and password from the from json file and verify their status and pass them as a parameters
    if( ($sp_config.appId.Tostring().Trim() -eq ''  ) -or ( $sp_config.password.Tostring().Trim() -eq '' ) )
    {
        WritetoLog $res.10010 -LogPath $logilfile 
        exit 1
    }           
  
    WritetoLog $res.10013 -LogPath $logilfile
   
    $clstr_RG=$azurecluster.cluster_group_name.Tostring().Trim()
    $clstr_Name=$azurecluster.cluster_name.Tostring().Trim()
    $clstr_loc=$azurecluster.cluster_loc.Tostring().Trim()
    $clstr_sp_appid=$sp_config.appId.Tostring().Trim()
    $clstr_sp_secret=$sp_config.password.Tostring().Trim()
    $clstr_version=$azurecluster.kuben8_version.Tostring().Trim()
    $clstr_nc=$azurecluster.node_count.Tostring().Trim()
    $clstr_ds_size=$azurecluster.node_disk_size.Tostring().Trim()
    $clstr_vm_size=$azurecluster.node_vm_size.Tostring().Trim()
    #
    $msglog ='cluster-info='+ $clstr_RG + " "+ $clstr_Name +" "+ $clstr_loc +" "+ $clstr_sp_appid +" "+ $clstr_sp_secret+" "+ $clstr_nc + " "+ $clstr_ds + "" + $clstr_vm
    WritetoLog $msglog -LogPath $logilfile
    WritetoLog $res.10011 -LogPath $logilfile
    if (($clstr_RG -eq "")  -or ($clstr_Name -eq "") -or ($clstr_loc -eq "") -or ($clstr_sp_appid -eq "") -or ($clstr_sp_secret -eq "") )
    {
        WritetoLog $res.10014 -LogPath $logilfile
        exit 1
    }

    #Creating a new cluster.....
    WritetoLog $res.10015 -LogPath $logilfile
    try
    {
        az aks create --resource-group $clstr_RG --name $clstr_Name --node-count $clstr_nc --kubernetes-version $clstr_version --location $clstr_loc  --service-principal $clstr_sp_appid --client-secret $clstr_sp_secret --node-osdisk-size $clstr_ds_size --node-vm-size $clstr_vm_size
    }
    catch
    {
      WritetoLog $res.10016 -LogPath $logilfile
      WritetoLog $Error[0] -LogPath $logilfile
      $Error.Clear();
      exit 1
    }
    
    #>

  
    #To verify whether cluster is created and connect to cluster using kubectl with to verify cluster nodes. 
    $clstr_RG=$azurecluster.cluster_group_name.Tostring().Trim()
    $clstr_Name=$azurecluster.cluster_name.Tostring().Trim()   

    if (($clstr_RG -eq "")  -or ($clstr_Name -eq "")  )
    {
        WritetoLog $res.10014 -LogPath $logilfile
        exit 1
    }

    try
    {
        WritetoLog $res.10017 -LogPath $logilfile
        az aks get-credentials --resource-group $clstr_RG --name $clstr_Name
        WritetoLog $res.10018 -LogPath $logilfile
        start-process powershell.exe -argument "-noexit -nologo -noprofile -command kubectl proxy" 
        Start-Sleep -s 60 
        WritetoLog $res.10019 -LogPath $logilfile
    }
    catch
    {
        WritetoLog $res.10021 -LogPath $logilfile
        exit 1
    }
    WritetoLog $res.10020 -LogPath $logilfile

    kubectl get nodes 

    Start-Sleep -s 60
    #To deploy components

  }
catch
{
    Write-Host $Error[0]
    $Error.Clear()    
    exit 1
}