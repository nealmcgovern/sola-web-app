To create infra follow these steps once logged into azure through the CLI


First set your env vars
```console
set ENV=dev
set MY_RESOURCE_GROUP_NAME="interlock-%ENV%"
set REGION=centralus
set MY_AKS_CLUSTER_NAME="interlockaks%ENV%"
set MY_ACR_NAME="interlockacr%ENV%"
set MY_DNS_LABEL="interlock-dev.com"
```


az aks get-credentials --resource-group %MY_RESOURCE_GROUP_NAME% --name %MY_AKS_CLUSTER_NAME%
kubectl get nodes

## Create Azure resource
To create a resource group and add ACR and AKS instances, run the following commands
```console
az group create --name %MY_RESOURCE_GROUP_NAME% --location %REGION%
az aks create --resource-group %MY_RESOURCE_GROUP_NAME% --name %MY_AKS_CLUSTER_NAME% --node-count 1 --generate-ssh-keys
az acr create --resource-group %MY_RESOURCE_GROUP_NAME% --name %MY_ACR_NAME% --sku basic
```

Next attach the acr to aks with the following command. You will need to get the acr resource id by running the first command and copying from the "id" field in the json response.

```console
az acr show -n %MY_ACR_NAME%
az aks update -n %MY_AKS_CLUSTER_NAME% -g %MY_RESOURCE_GROUP_NAME% --attach-acr <acr-resource-id>
```

To build and push to the registry we just created, make sure are in the root folder of the entire app and enter these commands:
```console
docker build -t %MY_ACR_NAME%.azurecr.io/frontend ./frontend
docker push %MY_ACR_NAME%.azurecr.io/frontend
docker build -t %MY_ACR_NAME%.azurecr.io/auth-server ./auth-server
docker push %MY_ACR_NAME%.azurecr.io/auth-server
```

Then add the load balancer through helm

```console
helm repo add ingress-nginx https://kubernetes.github.io/ingress-nginx
helm repo update

helm install ingress-nginx ingress-nginx/ingress-nginx --set controller.service.annotations."service\.beta\.kubernetes\.io/azure-load-balancer-health-probe-request-path"=/healthz --set controller.service.externalTrafficPolicy=Local
```