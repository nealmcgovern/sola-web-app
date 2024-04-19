Sola Web App

I started this by following this [guide](https://clerk.com/blog/building-a-react-login-page-template) for a basic react app with a log in page until I decided I did not need to follow it anymore. I then decided somewhat late Sunday night to convert it to Typescript to enforce strong typing for easier to read code and avoid runtime errors. And because I wanted to learn it. In any case, it is a relatively short leap from that tutorial to what is in these folders.

I am also using Material UI as a component framework. I am not super familiar with it as I am not usually working front end, so more to come as I learn how to make it at least a little nicer looking. I also have not commented any code nor added any tests. I hope to, but we shall see. 

To run this app, you need to run both the auth-server and the front end projects. To run the auth server, cd into the auth-server directory and run 
```console
foo@bar:~$ npm i express cors bcrypt jsonwebtoken lowdb 
foo@bar:~$ node app.js
```

Then open a new terminal window and cd into the frontend directory.

```console
foo@bar:~$ npm install -D typescript
foo@bar:~$ npm i react-router-dom @mui/material @emotion/react @emotion/styled @mui/icons-material
foo@bar:~$ npm start
```

This should automatically open up localhost:3000 and show the initial login page.

I have not tested the npm installs from a fresh computer, so those may be missing something or will require some googling to resolve.

# Azure setup
I am using the following three tutorials for our Azure setup:
https://learn.microsoft.com/en-us/azure/aks/tutorial-kubernetes-prepare-acr?tabs=azure-cli
https://learn.microsoft.com/en-us/azure/aks/tutorial-kubernetes-deploy-cluster?tabs=azure-cli
https://learn.microsoft.com/en-us/azure/aks/tutorial-kubernetes-deploy-application?tabs=azure-cli

You will need to install the Azure CLI in order to follow these tutorials or basic steps i have laid out.

## Creating Azure resource group
The Azure resource group will house all the resources required for our solution to be hosted on the internet. We will have two main resources, an Azure Container Registry to house our docker images and an Azure Kubernetes Service to deploy said images as running containers.  To create a resource group (using dev as the example), run the following command
```console
az group create --name SensolockDev --location eastus
```


## Azure Container Registry
To create an ACR instance, run the following command
```console
az acr create --resource-group SensolockDev --name sensolockacrdev --sku basic
```

To build and push to the registry we just created, we have a couple options. Make sure are in the root folder of the entire app and enter these commands:
```console
docker build -t sensolockacrdev.azurecr.io/frontend ./frontend
docker push sensolockacrdev.azurecr.io/frontend
docker build -t sensolockacrdev.azurecr.io/auth-server ./auth-server
docker push sensolockacrdev.azurecr.io/auth-server
```
Or:
```console
az acr build --registry sensolockacrdev --image sola-web-app-frontend:latest ./frontend/
az acr build --registry sensolockacrdev --image sola-web-app-auth-server:latest ./auth-server/
```

## Creating AKS instance on Azure
To create an AKS instance and attach the ACR we just created and pushed images to, run the following command
```console
az aks create --resource-group SensolockDev --name sensolockaksdev --node-count 2 --generate-ssh-keys --attach-acr sensolockacrdev
```

## Creating Public IP on Azure
```console
az network public-ip create --resource-group SensolockDev --name sensolockpipev --sku Standard --allocation-method static --dns-name sensolock
```
