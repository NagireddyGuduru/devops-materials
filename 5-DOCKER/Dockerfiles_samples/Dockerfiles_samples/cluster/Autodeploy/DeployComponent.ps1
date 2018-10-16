#param(
 #        [Parameter(Mandatory=$true)][string]$Componentfile,  
  #       [Parameter(Mandatory=$true)][string]$Imagetag,
   #      [Parameter(Mandatory=$false)][string]$Portno
    #   )
try
{
  

  #deploy
  $Componentfile='D:\ProdTFSWS\Service Transformation Platform\NextstepCluster\Components\nextstepcogtwin_ui_srv.json'
  $Imagetag="stpregistry.azurecr.io/stp-cogtwin:5.0"
  $Portno="1111"
  $TargetPortno="1111"
  #service
  # $Componentfile='D:\K8sDeployment\nextstepcogtwin_dep.json'  
   #$Portno="1111"
  # $Error.Clear()

   Write-Host  $Componentfile  
   #Loading Configuration file   
  $json = (Get-Content $Componentfile|Out-String | ConvertFrom-Json ) # read file  .

  if ($json.kind -eq 'Service')
  {
     if ($json.spec.ports.Count.Equals(1))
     {
          if ( ($Portno -ne ""))
          {
             $json.spec.ports[0].port=$Portno
             $json.spec.ports[0].port=$TargetPortno

          }
          elseif ( $TargetPortno -ne "")
          {
       
            $json.spec.ports[0].port=$TargetPortno
          }

     }
  }
  elseif ($json.kind -eq 'Deployment' )
  {
     if ($json.spec.template.spec.containers.Count.Equals(1))
     {
     
          $json.spec.template.spec.containers[0].image= "$Imagetag"
          if (($Portno -ne ""))
          {

              if ( $json.spec.template.spec.containers[0].ports.Count.Equals(1))
              {
                 $json.spec.template.spec.containers[0].ports[0].containerPort=$portno
              }
          }
    }
 
  }  
   $json | ConvertTo-Json -Depth 50  |set-content  $componentfile  
  
}
catch
{
     Write-Host $Error[0]
    $Error.Clear()    
    exit 1
}