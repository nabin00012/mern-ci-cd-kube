# Kubernetes Deployment Guide

## Prerequisites

### Local Development (Minikube)
```bash
# Install Minikube
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-darwin-amd64
sudo install minikube-darwin-amd64 /usr/local/bin/minikube

# Start Minikube
minikube start --driver=docker

# Enable ingress addon
minikube addons enable ingress
```

### Production Kubernetes Cluster
- Google Kubernetes Engine (GKE)
- Amazon Elastic Kubernetes Service (EKS)
- Azure Kubernetes Service (AKS)
- Digital Ocean Kubernetes

## Quick Deployment

### 1. Update Configuration
```bash
# Replace 'your-dockerhub-username' with your actual username
find k8s/ -name "*.yaml" -exec sed -i 's/your-dockerhub-username/YOUR_USERNAME/g' {} \;
```

### 2. Create Namespace
```bash
kubectl apply -f k8s/app-config.yaml
```

### 3. Deploy MongoDB
```bash
kubectl apply -f k8s/mongo-deployment.yaml
```

### 4. Deploy Backend Server
```bash
kubectl apply -f k8s/server-deployment.yaml
```

### 5. Deploy Frontend Client
```bash
kubectl apply -f k8s/client-deployment.yaml
```

## Access Applications

### Minikube
```bash
# Get client service URL
minikube service client-service --url

# Get server service URL (for API testing)
minikube service server-service --url
```

### Production Cluster
```bash
# Get external IP for LoadBalancer service
kubectl get service client-loadbalancer

# Or use NodePort
kubectl get service client-service
```

## Monitoring and Debugging

### Check Pod Status
```bash
kubectl get pods
kubectl describe pod <pod-name>
kubectl logs <pod-name>
```

### Check Services
```bash
kubectl get services
kubectl describe service <service-name>
```

### Check Deployments
```bash
kubectl get deployments
kubectl describe deployment <deployment-name>
```

### Scale Applications
```bash
# Scale server replicas
kubectl scale deployment server-deployment --replicas=3

# Scale client replicas
kubectl scale deployment client-deployment --replicas=2
```

## Troubleshooting

### Common Issues

1. **ImagePullBackOff**
   ```bash
   # Check if image exists in DockerHub
   docker pull your-username/mern-server:latest
   ```

2. **CrashLoopBackOff**
   ```bash
   # Check application logs
   kubectl logs <pod-name>
   ```

3. **Service Not Accessible**
   ```bash
   # Check service endpoints
   kubectl get endpoints
   ```

### Useful Commands
```bash
# Delete all resources
kubectl delete -f k8s/

# Restart deployment
kubectl rollout restart deployment/server-deployment

# Check resource usage
kubectl top pods
kubectl top nodes

# Port forward for debugging
kubectl port-forward service/server-service 5000:5000
kubectl port-forward service/client-service 8080:80
```

## Configuration Updates

### Environment Variables
Update secrets in `k8s/server-deployment.yaml`:
```bash
# Encode new values
echo -n "new-mongodb-uri" | base64

# Update secret
kubectl patch secret server-secret -p '{"data":{"mongodb-uri":"<base64-encoded-value>"}}'
```

### Image Updates
```bash
# Update deployment with new image
kubectl set image deployment/server-deployment server=your-username/mern-server:v2.0.0
kubectl set image deployment/client-deployment client=your-username/mern-client:v2.0.0
```

## Production Considerations

### Security
- Use private Docker registries
- Implement proper RBAC
- Use network policies
- Scan images for vulnerabilities

### Monitoring
- Install Prometheus and Grafana
- Set up log aggregation (ELK stack)
- Configure alerting

### Backup
- Backup MongoDB data regularly
- Use persistent volumes for data storage
- Implement disaster recovery plan