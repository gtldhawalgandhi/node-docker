# Login
az login

# format the tf files
terraform fmt

# initialize terraform Azure modules
terraform init

# validate the template
terraform validate

terraform plan -out tfplan && terraform show -json tfplan | jq '.' > tfplan.json && terraform apply tfplan

ssh -i $(terraform output -raw private_ssh_key) $(terraform output -raw vm_user)@$(terraform output -raw vm_ip)

terraform taint null_resource.remoteExecProvisioning

# delete the infra
terraform destroy

# cleanup files
rm -rf terraform.tfstate* tfplan*